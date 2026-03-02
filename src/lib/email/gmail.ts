import nodemailer from 'nodemailer'

let transporterInstance: ReturnType<typeof nodemailer.createTransport> | null = null

export function getGmailTransporter() {
  if (!transporterInstance) {
    const gmailUser = process.env.GMAIL_USER
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

    if (!gmailUser || !gmailAppPassword) {
      throw new Error('GMAIL_USER and GMAIL_APP_PASSWORD must be defined')
    }

    transporterInstance = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    })
  }

  return transporterInstance
}
