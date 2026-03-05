import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contact'
import { addContactSubmission } from '@/lib/supabase'
import { sendAdminNotification, sendClientConfirmation } from '@/lib/email'
import { checkRateLimit, getRateLimitInfo } from '@/lib/rate-limit'
import type { ApiResponse } from '@/types/contact'

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  try {
    // Extract IP address for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown'

    // Check rate limit
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
    const validation = contactFormSchema.safeParse(body)

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

    // Execute all operations in parallel
    const results = await Promise.allSettled([
      addContactSubmission(data),
      sendAdminNotification(data),
      sendClientConfirmation(data)
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
          error: 'Failed to process your submission. Please try again or contact us directly at radixs2402@gmail.com'
        },
        { status: 500 }
      )
    }

    // Success response (even if client confirmation failed)
    if (!clientEmailSuccess) {
      console.warn('Client confirmation email failed, but submission was successful')
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us! We'll be in touch soon.",
        data: {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Unexpected error in contact form API:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again or contact us at radixs2402@gmail.com'
      },
      { status: 500 }
    )
  }
}
