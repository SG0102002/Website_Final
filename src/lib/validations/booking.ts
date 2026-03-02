import { z } from 'zod'

export const bookingFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  phone: z.string()
    .min(8, 'Phone number must be at least 8 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .trim(),
  booking_date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  booking_time: z.string()
    .regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  topic: z.string()
    .min(10, 'Topic must be at least 10 characters')
    .max(500, 'Topic must be less than 500 characters')
    .trim()
})

export type BookingFormData = z.infer<typeof bookingFormSchema>
