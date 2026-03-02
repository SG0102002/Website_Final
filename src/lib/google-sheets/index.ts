import { sheets } from './client'
import type { ContactFormData } from '@/types/contact'

export async function addContactSubmission(data: ContactFormData): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID not configured')
  }

  const row = [
    new Date().toISOString(),
    data.name,
    data.email,
    data.message,
    'New'
  ]

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E',
      valueInputOption: 'RAW',
      requestBody: {
        values: [row]
      }
    })
  } catch (error) {
    console.error('Failed to add contact submission to Google Sheets:', error)
    throw error
  }
}
