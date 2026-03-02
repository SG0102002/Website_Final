export interface BookingFormData {
  name: string
  email: string
  phone: string
  booking_date: string // YYYY-MM-DD format
  booking_time: string // e.g., "17:00" (5pm)
  topic: string
}

export interface BookingApiResponse {
  success: boolean
  message?: string
  error?: string
  data?: {
    id: string
    booking_date: string
    booking_time: string
  }
}

export interface AvailabilityResponse {
  available: boolean
  reason?: string
}
