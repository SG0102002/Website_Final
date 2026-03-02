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

interface ClientConfirmationEmailProps {
  name: string
}

export default function ClientConfirmationEmail({ name }: ClientConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting us, {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank You for Contacting Us</Heading>

          <Text style={greeting}>Hi {name},</Text>

          <Text style={text}>
            Thank you for reaching out! We&apos;ve received your message and will get back to you as soon as possible.
          </Text>

          <Text style={text}>
            Our team typically responds within 24-48 hours during business days. We appreciate your patience.
          </Text>

          <Hr style={hr} />

          <Section style={infoSection}>
            <Text style={infoHeading}>What&apos;s Next?</Text>
            <Text style={infoText}>
              • Our team is reviewing your message<br />
              • We&apos;ll reach out to you via email<br />
              • If urgent, you can also call us directly
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Best regards,<br />
            <strong style={companyName}>SU Consultancy Team</strong>
          </Text>

          <Text style={footerNote}>
            This is an automated confirmation email. Please do not reply to this email.
          </Text>
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
