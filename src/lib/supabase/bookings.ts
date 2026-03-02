import { getSupabase } from './client'
import type { BookingFormData } from '@/types/booking'

export async function createBooking(data: BookingFormData): Promise<void> {
  const supabase = getSupabase()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await supabase
    .from('consultation_booking')
    .insert([{
      name: data.name,
      email: data.email,
      phone: data.phone,
      booking_date: data.booking_date,
      booking_time: data.booking_time,
      topic: data.topic,
      status: 'confirmed'
    }] as any) // eslint-disable-line @typescript-eslint/no-explicit-any

  if (error) {
    console.error('Failed to create booking in Supabase:', error)
    throw error
  }
}

export async function getBookingsForDate(date: string): Promise<string[]> {
  const supabase = getSupabase()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await supabase
    .from('consultation_booking')
    .select('booking_time')
    .eq('booking_date', date)
    .eq('status', 'confirmed')

  if (error) {
    console.error('Failed to get bookings:', error)
    throw error
  }

  return data?.map((booking: { booking_time: string }) => booking.booking_time) || []
}

export async function getBookingCountForDate(date: string): Promise<number> {
  const supabase = getSupabase()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count, error } = await supabase
    .from('consultation_booking')
    .select('*', { count: 'exact', head: true })
    .eq('booking_date', date)
    .eq('status', 'confirmed')

  if (error) {
    console.error('Failed to get booking count:', error)
    throw error
  }

  return count || 0
}
