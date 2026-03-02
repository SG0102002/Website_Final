import { NextResponse } from 'next/server'
import { bookingFormSchema } from '@/lib/validations/booking'
import { createBooking, getBookingsForDate, getBookingCountForDate } from '@/lib/supabase/bookings'
import { sendBookingConfirmationToAdmin, sendBookingConfirmationToClient } from '@/lib/email'
import { checkRateLimit, getRateLimitInfo } from '@/lib/rate-limit'
import {
  isValidBookingTime,
  isAtLeast48HoursAway,
  getMaxBookingsForDate
} from '@/lib/booking-utils'
import type { BookingApiResponse } from '@/types/booking'

export async function POST(request: Request): Promise<NextResponse<BookingApiResponse>> {
  try {
    // Get IP and check rate limit
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown'

    if (!checkRateLimit(ip)) {
      const rateLimitInfo = getRateLimitInfo(ip)
      const resetTime = rateLimitInfo.resetTime
        ? new Date(rateLimitInfo.resetTime).toLocaleTimeString()
        : 'soon'

      return NextResponse.json(
        {
          success: false,
          error: `Too many requests. Please try again after ${resetTime}.`
        },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validation = bookingFormSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          message: validation.error.issues.map((issue) => issue.message).join(', ')
        },
        { status: 400 }
      )
    }

    const data = validation.data
    const bookingDate = new Date(data.booking_date)

    // Server-side validation
    // 1. Check 48-hour minimum
    if (!isAtLeast48HoursAway(bookingDate)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bookings must be made at least 48 hours in advance'
        },
        { status: 400 }
      )
    }

    // 2. Check valid time slot
    if (!isValidBookingTime(bookingDate, data.booking_time)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid time slot for the selected date'
        },
        { status: 400 }
      )
    }

    // 3. Check max bookings for day
    const bookingCount = await getBookingCountForDate(data.booking_date)
    const maxBookings = getMaxBookingsForDate(bookingDate)

    if (bookingCount >= maxBookings) {
      return NextResponse.json(
        {
          success: false,
          error: 'This day is fully booked. Please choose another date.'
        },
        { status: 400 }
      )
    }

    // 4. Check if time slot is already taken (prevent race condition)
    const bookedTimes = await getBookingsForDate(data.booking_date)

    if (bookedTimes.includes(data.booking_time)) {
      return NextResponse.json(
        {
          success: false,
          error: 'This time slot was just booked. Please select another time.'
        },
        { status: 409 }
      )
    }

    // Execute all operations in parallel
    const results = await Promise.allSettled([
      createBooking(data),
      sendBookingConfirmationToAdmin(data),
      sendBookingConfirmationToClient(data)
    ])

    // Check results
    const databaseSuccess = results[0].status === 'fulfilled'
    const adminEmailSuccess = results[1].status === 'fulfilled'
    const clientEmailSuccess = results[2].status === 'fulfilled'

    // Log any failures
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const operation = ['Supabase Database', 'Admin Email', 'Client Email'][index]
        console.error(`${operation} failed:`, result.reason)
      }
    })

    // If both critical operations failed, return error
    if (!databaseSuccess && !adminEmailSuccess) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to process your booking. Please try again or contact us directly at samiragele010@gmail.com'
        },
        { status: 500 }
      )
    }

    // Success response (even if client email failed)
    if (!clientEmailSuccess) {
      console.warn('Client booking confirmation email failed, but booking was successful')
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your consultation has been booked successfully! Check your email for confirmation.',
        data: {
          id: crypto.randomUUID(),
          booking_date: data.booking_date,
          booking_time: data.booking_time
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Unexpected error in booking API:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again or contact us at samiragele010@gmail.com'
      },
      { status: 500 }
    )
  }
}
