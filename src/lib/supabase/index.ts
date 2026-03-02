import { getSupabase } from './client'
import type { ContactFormData } from '@/types/contact'

export async function addContactSubmission(data: ContactFormData): Promise<void> {
  const supabase = getSupabase()

  const { error } = await supabase
    .from('contact_submissions')
    .insert([{
      name: data.name,
      email: data.email,
      message: data.message,
    }] as any) // eslint-disable-line @typescript-eslint/no-explicit-any

  if (error) {
    console.error('Failed to add contact submission to Supabase:', error)
    throw error
  }
}
