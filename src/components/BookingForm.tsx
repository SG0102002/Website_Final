'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { bookingFormSchema, type BookingFormData } from '@/lib/validations/booking'
import { getAvailableTimeSlots, formatTimeForDisplay } from '@/lib/booking-utils'

export function BookingForm() {
  const [selectedDate, setSelectedDate] = useState('')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [checkingAvailability, setCheckingAvailability] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      booking_date: '',
      booking_time: '',
      topic: ''
    }
  })

  const watchedDate = watch('booking_date')
  const watchedTime = watch('booking_time')

  // Update available time slots when date changes
  useEffect(() => {
    if (watchedDate) {
      const date = new Date(watchedDate)
      const slots = getAvailableTimeSlots(date)
      setAvailableSlots(slots)
      setSelectedDate(watchedDate)

      // Reset time selection when date changes
      setValue('booking_time', '')
    }
  }, [watchedDate, setValue])

  // Check availability when both date and time are selected
  useEffect(() => {
    if (watchedDate && watchedTime) {
      checkAvailability(watchedDate, watchedTime)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedDate, watchedTime])

  const checkAvailability = async (date: string, time: string) => {
    setCheckingAvailability(true)
    try {
      const response = await fetch('/api/bookings/check-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ booking_date: date, booking_time: time }),
      })

      const result = await response.json()

      if (!result.available) {
        toast.error(result.reason || 'This slot is not available')
        setValue('booking_time', '')
      }
    } catch (error) {
      console.error('Error checking availability:', error)
    } finally {
      setCheckingAvailability(false)
    }
  }

  const onSubmit = async (data: BookingFormData) => {
    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to book consultation')
      }

      toast.success(result.message || 'Consultation booked successfully!')
      reset()
      setSelectedDate('')
      setAvailableSlots([])
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Failed to book consultation. Please try again or contact us at radixs2402@gmail.com'

      toast.error(errorMessage)
    }
  }

  // Calculate minimum date (48 hours from now)
  const getMinDate = () => {
    const date = new Date()
    date.setHours(date.getHours() + 48)
    return date.toISOString().split('T')[0]
  }

  // Calculate maximum date (3 months from now)
  const getMaxDate = () => {
    const date = new Date()
    date.setMonth(date.getMonth() + 3)
    return date.toISOString().split('T')[0]
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name & Email Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="booking-name" className="text-vibrant-slate font-medium">
            Name
          </Label>
          <Input
            type="text"
            id="booking-name"
            {...register('name')}
            className="px-5 py-6 bg-white border-vibrant-slate/20 text-vibrant-slate placeholder-vibrant-slate/40 rounded-xl focus:ring-2 focus:ring-vibrant-purple focus:border-vibrant-purple transition-all"
            placeholder="Your name"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="booking-email" className="text-vibrant-slate font-medium">
            Email
          </Label>
          <Input
            type="email"
            id="booking-email"
            {...register('email')}
            className="px-5 py-6 bg-white border-vibrant-slate/20 text-vibrant-slate placeholder-vibrant-slate/40 rounded-xl focus:ring-2 focus:ring-vibrant-purple focus:border-vibrant-purple transition-all"
            placeholder="your@email.com"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-3">
        <Label htmlFor="booking-phone" className="text-vibrant-slate font-medium">
          Phone Number
        </Label>
        <Input
          type="tel"
          id="booking-phone"
          {...register('phone')}
          className="px-5 py-6 bg-white border-vibrant-slate/20 text-vibrant-slate placeholder-vibrant-slate/40 rounded-xl focus:ring-2 focus:ring-vibrant-purple focus:border-vibrant-purple transition-all"
          placeholder="+60 12-345 6789"
          aria-invalid={errors.phone ? 'true' : 'false'}
        />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Date & Time Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="booking-date" className="text-vibrant-slate font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-vibrant-terracotta" />
            Consultation Date
          </Label>
          <Input
            type="date"
            id="booking-date"
            {...register('booking_date')}
            min={getMinDate()}
            max={getMaxDate()}
            className="px-5 py-6 bg-white border-vibrant-slate/20 text-vibrant-slate placeholder-vibrant-slate/40 rounded-xl focus:ring-2 focus:ring-vibrant-purple focus:border-vibrant-purple transition-all"
            aria-invalid={errors.booking_date ? 'true' : 'false'}
          />
          {errors.booking_date && (
            <p className="text-sm text-red-500 mt-1">{errors.booking_date.message}</p>
          )}
          <p className="text-xs text-vibrant-slate/60">
            Minimum 48 hours advance booking
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="booking-time" className="text-vibrant-slate font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-vibrant-terracotta" />
            Time Slot
          </Label>
          <select
            id="booking-time"
            {...register('booking_time')}
            disabled={!selectedDate || checkingAvailability}
            className="w-full px-5 py-6 bg-white border border-vibrant-slate/20 text-vibrant-slate rounded-xl focus:ring-2 focus:ring-vibrant-purple focus:border-vibrant-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-invalid={errors.booking_time ? 'true' : 'false'}
          >
            <option value="">
              {!selectedDate ? 'Select date first' : checkingAvailability ? 'Checking...' : 'Select time'}
            </option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {formatTimeForDisplay(slot)}
              </option>
            ))}
          </select>
          {errors.booking_time && (
            <p className="text-sm text-red-500 mt-1">{errors.booking_time.message}</p>
          )}
          {selectedDate && (
            <p className="text-xs text-vibrant-slate/60">
              30-minute consultation
            </p>
          )}
        </div>
      </div>

      {/* Topic */}
      <div className="space-y-3">
        <Label htmlFor="booking-topic" className="text-vibrant-slate font-medium">
          What would you like to discuss?
        </Label>
        <Textarea
          id="booking-topic"
          {...register('topic')}
          rows={4}
          className="px-5 py-4 bg-white border-vibrant-slate/20 text-vibrant-slate placeholder-vibrant-slate/40 rounded-xl focus:ring-2 focus:ring-vibrant-purple focus:border-vibrant-purple resize-none transition-all"
          placeholder="Brief description of your consultation needs..."
          aria-invalid={errors.topic ? 'true' : 'false'}
        />
        {errors.topic && (
          <p className="text-sm text-red-500 mt-1">{errors.topic.message}</p>
        )}
      </div>

      {/* Availability Info */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <p className="text-sm text-vibrant-terracotta font-medium mb-2">📅 Availability:</p>
        <ul className="text-sm text-vibrant-slate/70 space-y-1">
          <li>• <strong>Weekdays:</strong> 5:00 PM - 10:00 PM (Max 2 bookings/day)</li>
          <li>• <strong>Weekends:</strong> 9:00 AM - 5:00 PM (Max 6 bookings/day)</li>
        </ul>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <motion.button
          type="submit"
          disabled={isSubmitting || checkingAvailability}
          whileHover={!isSubmitting && !checkingAvailability ? { scale: 1.05, y: -2 } : {}}
          whileTap={!isSubmitting && !checkingAvailability ? { scale: 0.98 } : {}}
          className="w-full sm:w-auto px-10 py-4 bg-vibrant-purple text-white font-semibold rounded-full hover:bg-vibrant-purple-light hover:shadow-xl hover:shadow-vibrant-purple-light/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Booking...' : checkingAvailability ? 'Checking...' : 'Book Consultation'}
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </form>
  )
}
