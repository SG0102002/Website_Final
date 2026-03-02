import { render } from '@react-email/render'
import { getGmailTransporter } from './gmail'
import AdminNotificationEmail from './templates/admin-notification'
import ClientConfirmationEmail from './templates/client-confirmation'
import BookingConfirmationEmail from './templates/booking-confirmation'
import type { ContactFormData } from '@/types/contact'
import type { BookingFormData } from '@/types/booking'
import { formatDateForDisplay, formatTimeForDisplay } from '@/lib/booking-utils'

export async function sendAdminNotification(data: ContactFormData): Promise<void> {
  const gmailUser = process.env.GMAIL_USER
  const adminEmail = process.env.ADMIN_EMAIL

  if (!gmailUser || !adminEmail) {
    throw new Error('Email configuration missing: GMAIL_USER or ADMIN_EMAIL not set')
  }

  try {
    const transporter = getGmailTransporter()
    const emailHtml = await render(AdminNotificationEmail(data))

    await transporter.sendMail({
      from: `"SU Consultancy" <${gmailUser}>`,
      to: adminEmail,
      subject: `New Contact Form Submission from ${data.name}`,
      html: emailHtml,
    })
  } catch (error) {
    console.error('Failed to send admin notification:', error)
    throw error
  }
}

export async function sendClientConfirmation(data: ContactFormData): Promise<void> {
  const gmailUser = process.env.GMAIL_USER

  if (!gmailUser) {
    throw new Error('Email configuration missing: GMAIL_USER not set')
  }

  try {
    console.log('🔵 Attempting to send client confirmation to:', data.email)
    const transporter = getGmailTransporter()
    const emailHtml = await render(ClientConfirmationEmail({ name: data.name }))

    const result = await transporter.sendMail({
      from: `"SU Consultancy" <${gmailUser}>`,
      to: data.email,
      subject: 'Thank you for contacting us',
      html: emailHtml,
    })

    console.log('✅ Client confirmation sent successfully:', result.messageId)
  } catch (error) {
    console.error('❌ Failed to send client confirmation:', error)
    throw error
  }
}

export async function sendBookingConfirmationToAdmin(data: BookingFormData): Promise<void> {
  const gmailUser = process.env.GMAIL_USER
  const adminEmail = process.env.ADMIN_EMAIL

  if (!gmailUser || !adminEmail) {
    throw new Error('Email configuration missing: GMAIL_USER or ADMIN_EMAIL not set')
  }

  try {
    const transporter = getGmailTransporter()
    const emailHtml = await render(BookingConfirmationEmail({
      name: data.name,
      bookingDate: formatDateForDisplay(data.booking_date),
      bookingTime: formatTimeForDisplay(data.booking_time),
      topic: data.topic,
      isAdmin: true
    }))

    await transporter.sendMail({
      from: `"SU Consultancy" <${gmailUser}>`,
      to: adminEmail,
      subject: `New Consultation Booking - ${data.name} on ${formatDateForDisplay(data.booking_date)}`,
      html: emailHtml,
    })
  } catch (error) {
    console.error('Failed to send admin booking notification:', error)
    throw error
  }
}

export async function sendBookingConfirmationToClient(data: BookingFormData): Promise<void> {
  const gmailUser = process.env.GMAIL_USER

  if (!gmailUser) {
    throw new Error('Email configuration missing: GMAIL_USER not set')
  }

  try {
    console.log('🔵 Attempting to send booking confirmation to:', data.email)
    const transporter = getGmailTransporter()
    const emailHtml = await render(BookingConfirmationEmail({
      name: data.name,
      bookingDate: formatDateForDisplay(data.booking_date),
      bookingTime: formatTimeForDisplay(data.booking_time),
      topic: data.topic,
      isAdmin: false
    }))

    const result = await transporter.sendMail({
      from: `"SU Consultancy" <${gmailUser}>`,
      to: data.email,
      subject: 'Consultation Booking Confirmed',
      html: emailHtml,
    })

    console.log('✅ Booking confirmation sent successfully:', result.messageId)
  } catch (error) {
    console.error('❌ Failed to send booking confirmation:', error)
    throw error
  }
}
