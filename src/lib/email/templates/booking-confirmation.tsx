import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Hr,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface BookingConfirmationEmailProps {
  name: string
  bookingDate: string
  bookingTime: string
  topic: string
  isAdmin?: boolean
}

export default function BookingConfirmationEmail({
  name,
  bookingDate,
  bookingTime,
  topic,
  isAdmin = false
}: BookingConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{isAdmin ? `New consultation booking from ${name}` : `Your consultation is confirmed for ${bookingDate}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {isAdmin ? 'New Consultation Booking' : 'Consultation Confirmed'}
          </Heading>

          {!isAdmin && (
            <Text style={greeting}>Hi {name},</Text>
          )}

          <Text style={text}>
            {isAdmin
              ? 'You have received a new consultation booking.'
              : 'Your consultation has been successfully booked! We look forward to speaking with you.'}
          </Text>

          <Hr style={hr} />

          <Section style={detailsSection}>
            <Text style={detailsHeading}>Booking Details</Text>

            {isAdmin && (
              <Section style={detailRow}>
                <Text style={label}>Client Name:</Text>
                <Text style={value}>{name}</Text>
              </Section>
            )}

            <Section style={detailRow}>
              <Text style={label}>Date:</Text>
              <Text style={value}>{bookingDate}</Text>
            </Section>

            <Section style={detailRow}>
              <Text style={label}>Time:</Text>
              <Text style={value}>{bookingTime}</Text>
            </Section>

            <Section style={detailRow}>
              <Text style={label}>Duration:</Text>
              <Text style={value}>30 minutes</Text>
            </Section>

            <Section style={detailRow}>
              <Text style={label}>Topic:</Text>
              <Text style={messageText}>{topic}</Text>
            </Section>
          </Section>

          <Hr style={hr} />

          {!isAdmin && (
            <>
              <Section style={infoSection}>
                <Text style={infoHeading}>What&apos;s Next?</Text>
                <Text style={infoText}>
                  • We&apos;ll send you a reminder 24 hours before<br />
                  • Please be available at the scheduled time<br />
                  • We&apos;ll contact you via the provided phone number<br />
                  • If you need to reschedule, please contact us ASAP
                </Text>
              </Section>

              <Hr style={hr} />
            </>
          )}

          <Text style={footer}>
            {isAdmin ? (
              <>
                <strong style={companyName}>Consultation Management</strong>
              </>
            ) : (
              <>
                Best regards,<br />
                <strong style={companyName}>SU Consultancy Team</strong>
              </>
            )}
          </Text>

          {!isAdmin && (
            <Text style={footerNote}>
              Need to make changes? Contact us at samiragele010@gmail.com
            </Text>
          )}
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 40px 48px 40px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const h1 = {
  color: '#7c3aed',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 24px 0',
  padding: '0',
}

const greeting = {
  color: '#333',
  fontSize: '18px',
  fontWeight: '500',
  margin: '0 0 16px 0',
  padding: '0',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0',
  marginBottom: '16px',
}

const detailsSection = {
  backgroundColor: '#f9fafb',
  padding: '24px',
  margin: '20px 0',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
}

const detailsHeading = {
  color: '#7c3aed',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 16px',
}

const detailRow = {
  marginBottom: '12px',
}

const label = {
  color: '#7c3aed',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 4px',
}

const value = {
  color: '#333',
  fontSize: '16px',
  margin: '0 0 8px',
}

const messageText = {
  color: '#333',
  fontSize: '15px',
  lineHeight: '22px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
}

const infoSection = {
  backgroundColor: '#f9fafb',
  padding: '24px',
  margin: '20px 0',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
}

const infoHeading = {
  color: '#7c3aed',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 12px',
}

const infoText = {
  color: '#555',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0',
  marginTop: '32px',
}

const companyName = {
  color: '#7c3aed',
}

const footerNote = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0',
  marginTop: '16px',
}
