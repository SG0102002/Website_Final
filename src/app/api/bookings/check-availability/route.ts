import { NextResponse } from 'next/server'
import { getBookingsForDate, getBookingCountForDate } from '@/lib/supabase/bookings'
import {
  isValidBookingTime,
  isAtLeast48HoursAway,
  getMaxBookingsForDate
} from '@/lib/booking-utils'
import type { AvailabilityResponse } from '@/types/booking'

export async function POST(request: Request): Promise<NextResponse<AvailabilityResponse>> {
  try {
    console.log('🔵 Checking availability...')
    const { booking_date, booking_time } = await request.json()
    console.log('📅 Date:', booking_date, 'Time:', booking_time)

    if (!booking_date || !booking_time) {
      console.log('❌ Missing date or time')
      return NextResponse.json(
        { available: false, reason: 'Date and time are required' },
        { status: 400 }
      )
    }

    const bookingDate = new Date(booking_date)
    console.log('📆 Parsed date:', bookingDate)

    // Check if booking is at least 48 hours away
    if (!isAtLeast48HoursAway(bookingDate)) {
      return NextResponse.json({
        available: false,
        reason: 'Bookings must be made at least 48 hours in advance'
      })
    }

    // Check if time slot is valid for the day
    if (!isValidBookingTime(bookingDate, booking_time)) {
      return NextResponse.json({
        available: false,
        reason: 'This time slot is not available for the selected date'
      })
    }

    // Check if max bookings for the day is reached
    const bookingCount = await getBookingCountForDate(booking_date)
    const maxBookings = getMaxBookingsForDate(bookingDate)

    if (bookingCount >= maxBookings) {
      return NextResponse.json({
        available: false,
        reason: 'This day is fully booked. Please choose another date.'
      })
    }

    // Check if specific time slot is already taken
    const bookedTimes = await getBookingsForDate(booking_date)

    if (bookedTimes.includes(booking_time)) {
      return NextResponse.json({
        available: false,
        reason: 'This time slot is already booked'
      })
    }

    // All checks passed - slot is available
    return NextResponse.json({ available: true })

  } catch (error) {
    console.error('❌ Error checking availability:', error)
    console.error('Full error:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { available: false, reason: 'Failed to check availability' },
      { status: 500 }
    )
  }
}
