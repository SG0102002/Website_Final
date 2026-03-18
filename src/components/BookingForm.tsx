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

const COUNTRIES = [
  { code: '+1', flag: '🇺🇸', name: 'USA', format: '(XXX) XXX-XXXX' },
  { code: '+1', flag: '🇨🇦', name: 'Canada', format: '(XXX) XXX-XXXX' },
  { code: '+44', flag: '🇬🇧', name: 'UK', format: 'XXXX XXX XXX' },
  { code: '+61', flag: '🇦🇺', name: 'Australia', format: 'XXX XXX XXX' },
  { code: '+91', flag: '🇮🇳', name: 'India', format: 'XXXXX XXXXX' },
  { code: '+86', flag: '🇨🇳', name: 'China', format: 'XXX XXXX XXXX' },
  { code: '+81', flag: '🇯🇵', name: 'Japan', format: 'XX-XXXX-XXXX' },
  { code: '+82', flag: '🇰🇷', name: 'South Korea', format: 'XX-XXXX-XXXX' },
  { code: '+49', flag: '🇩🇪', name: 'Germany', format: 'XXX XXXXXXX' },
  { code: '+33', flag: '🇫🇷', name: 'France', format: 'X XX XX XX XX' },
  { code: '+39', flag: '🇮🇹', name: 'Italy', format: 'XXX XXX XXXX' },
  { code: '+34', flag: '🇪🇸', name: 'Spain', format: 'XXX XX XX XX' },
  { code: '+31', flag: '🇳🇱', name: 'Netherlands', format: 'X XX XX XX XX' },
  { code: '+46', flag: '🇸🇪', name: 'Sweden', format: 'XX-XXX XX XX' },
  { code: '+47', flag: '🇳🇴', name: 'Norway', format: 'XXX XX XXX' },
  { code: '+45', flag: '🇩🇰', name: 'Denmark', format: 'XX XX XX XX' },
  { code: '+41', flag: '🇨🇭', name: 'Switzerland', format: 'XX XXX XX XX' },
  { code: '+43', flag: '🇦🇹', name: 'Austria', format: 'XXX XXXXXXX' },
  { code: '+32', flag: '🇧🇪', name: 'Belgium', format: 'XXX XX XX XX' },
  { code: '+48', flag: '🇵🇱', name: 'Poland', format: 'XXX XXX XXX' },
  { code: '+7', flag: '🇷🇺', name: 'Russia', format: '(XXX) XXX-XX-XX' },
  { code: '+52', flag: '🇲🇽', name: 'Mexico', format: 'XX XXXX XXXX' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil', format: '(XX) XXXXX-XXXX' },
  { code: '+54', flag: '🇦🇷', name: 'Argentina', format: 'XX XXXX-XXXX' },
  { code: '+56', flag: '🇨🇱', name: 'Chile', format: 'X XXXX XXXX' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa', format: 'XX XXX XXXX' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria', format: 'XXX XXX XXXX' },
  { code: '+20', flag: '🇪🇬', name: 'Egypt', format: 'XXX XXX XXXX' },
  { code: '+971', flag: '🇦🇪', name: 'UAE', format: 'XX XXX XXXX' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia', format: 'XX XXX XXXX' },
  { code: '+90', flag: '🇹🇷', name: 'Turkey', format: 'XXX XXX XX XX' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia', format: 'XX-XXX XXXX' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore', format: 'XXXX XXXX' },
  { code: '+66', flag: '🇹🇭', name: 'Thailand', format: 'XX XXX XXXX' },
  { code: '+62', flag: '🇮🇩', name: 'Indonesia', format: 'XXX-XXX-XXXX' },
  { code: '+63', flag: '🇵🇭', name: 'Philippines', format: 'XXX XXX XXXX' },
  { code: '+84', flag: '🇻🇳', name: 'Vietnam', format: 'XX XXXX XXXX' },
  { code: '+64', flag: '🇳🇿', name: 'New Zealand', format: 'XX XXX XXXX' },
  { code: '+852', flag: '🇭🇰', name: 'Hong Kong', format: 'XXXX XXXX' },
  { code: '+886', flag: '🇹🇼', name: 'Taiwan', format: 'XXXX XXXX' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal', format: 'XXX XXX XXX' },
  { code: '+30', flag: '🇬🇷', name: 'Greece', format: 'XXX XXX XXXX' },
  { code: '+353', flag: '🇮🇪', name: 'Ireland', format: 'XX XXX XXXX' },
  { code: '+420', flag: '🇨🇿', name: 'Czech Republic', format: 'XXX XXX XXX' },
  { code: '+36', flag: '🇭🇺', name: 'Hungary', format: 'XX XXX XXXX' },
  { code: '+40', flag: '🇷🇴', name: 'Romania', format: 'XXX XXX XXX' },
  { code: '+972', flag: '🇮🇱', name: 'Israel', format: 'XX-XXX-XXXX' },
]

export function BookingForm() {
  const [selectedDate, setSelectedDate] = useState('')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [checkingAvailability, setCheckingAvailability] = useState(false)
  const [countryCode, setCountryCode] = useState('+60')
  const [phoneNumber, setPhoneNumber] = useState('')

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

  // Format phone number based on country
  const formatPhoneNumber = (value: string, code: string) => {
    const country = COUNTRIES.find(c => c.code === code)
    if (!country) return value

    const cleaned = value.replace(/\D/g, '')
    const format = country.format

    let formatted = ''
    let digitIndex = 0

    for (let i = 0; i < format.length && digitIndex < cleaned.length; i++) {
      if (format[i] === 'X') {
        formatted += cleaned[digitIndex]
        digitIndex++
      } else {
        formatted += format[i]
      }
    }

    return formatted
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = formatPhoneNumber(value, countryCode)
    setPhoneNumber(formatted)
    setValue('phone', countryCode + formatted)
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
      setPhoneNumber('')
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
          <Label htmlFor="booking-name" className="text-[#1A1A1A] font-medium">
            Name
          </Label>
          <Input
            type="text"
            id="booking-name"
            {...register('name')}
            className="px-4 py-3 bg-white border-[#1A1A1A]/20 text-[#1A1A1A] placeholder-[#1A1A1A]/40 rounded-md focus:ring-2 focus:ring-[#2C5F4E] focus:border-[#2C5F4E] transition-all"
            placeholder="Your name"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="booking-email" className="text-[#1A1A1A] font-medium">
            Email
          </Label>
          <Input
            type="email"
            id="booking-email"
            {...register('email')}
            className="px-4 py-3 bg-white border-[#1A1A1A]/20 text-[#1A1A1A] placeholder-[#1A1A1A]/40 rounded-md focus:ring-2 focus:ring-[#2C5F4E] focus:border-[#2C5F4E] transition-all"
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
        <Label htmlFor="booking-phone" className="text-[#1A1A1A] font-medium">
          Phone Number
        </Label>
        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => {
              setCountryCode(e.target.value)
              setPhoneNumber('')
              setValue('phone', e.target.value)
            }}
            className="px-2 sm:px-4 bg-white border border-[#1A1A1A]/20 text-[#1A1A1A] rounded-md focus:ring-2 focus:ring-[#2C5F4E] focus:border-[#2C5F4E] transition-all h-[42px] text-sm sm:text-base"
            style={{
              minWidth: '100px',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231A1A1A' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '36px',
              lineHeight: '42px'
            }}
          >
            {COUNTRIES.map((country, idx) => (
              <option key={`${country.code}-${idx}`} value={country.code}>
                {country.flag} {country.code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="booking-phone"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className="px-3 sm:px-4 bg-white border border-[#1A1A1A]/20 text-[#1A1A1A] placeholder-[#1A1A1A]/40 rounded-md focus:ring-2 focus:ring-[#2C5F4E] focus:border-[#2C5F4E] transition-all flex-1 min-w-0 h-[42px]"
            placeholder={COUNTRIES.find(c => c.code === countryCode)?.format.replace(/X/g, '0') || '12-345 6789'}
            aria-invalid={errors.phone ? 'true' : 'false'}
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Date & Time Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="booking-date" className="text-[#1A1A1A] font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2C5F4E]" />
            Consultation Date
          </Label>
          <input
            type="date"
            id="booking-date"
            {...register('booking_date')}
            min={getMinDate()}
            max={getMaxDate()}
            className="px-4 bg-white border border-[#1A1A1A]/20 text-[#1A1A1A] placeholder-[#1A1A1A]/40 rounded-md focus:ring-2 focus:ring-[#2C5F4E] focus:border-[#2C5F4E] transition-all h-[42px] w-full"
            aria-invalid={errors.booking_date ? 'true' : 'false'}
          />
          {errors.booking_date && (
            <p className="text-sm text-red-500 mt-1">{errors.booking_date.message}</p>
          )}
          <p className="text-xs text-[#1A1A1A]/60">
            Minimum 48 hours advance booking
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="booking-time" className="text-[#1A1A1A] font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#2C5F4E]" />
            Time Slot
          </Label>
          <select
            id="booking-time"
            {...register('booking_time')}
            disabled={!selectedDate || checkingAvailability}
            className="w-full px-4 bg-white border border-[#1A1A1A]/20 text-[#1A1A1A] rounded-md focus:ring-2 focus:ring-[#2C5F4E] focus:border-[#2C5F4E] transition-all disabled:opacity-50 disabled:cursor-not-allowed h-[42px]"
            style={{
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231A1A1A' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '36px',
              lineHeight: '42px'
            }}
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
            <p className="text-xs text-[#1A1A1A]/60">
              30-minute consultation
            </p>
          )}
        </div>
      </div>

      {/* Topic */}
      <div className="space-y-3">
        <Label htmlFor="booking-topic" className="text-[#1A1A1A] font-medium">
          What would you like to discuss?
        </Label>
        <Textarea
          id="booking-topic"
          {...register('topic')}
          rows={4}
          className="px-4 py-3 bg-white border-[#1A1A1A]/20 text-[#1A1A1A] placeholder-[#1A1A1A]/40 rounded-md focus:ring-2 focus:ring-[#2C5F4E] focus:border-[#2C5F4E] resize-none transition-all"
          placeholder="Brief description of your consultation needs..."
          aria-invalid={errors.topic ? 'true' : 'false'}
        />
        {errors.topic && (
          <p className="text-sm text-red-500 mt-1">{errors.topic.message}</p>
        )}
      </div>

      {/* Availability Info */}
      <div className="rounded-md p-3 sm:p-4" style={{ backgroundColor: '#F5F5F5', border: '1px solid #E5E5E5' }}>
        <p className="text-sm font-semibold mb-2" style={{ color: '#1A1A1A' }}>Availability</p>
        <ul className="text-sm space-y-1" style={{ color: '#666666' }}>
          <li>• <strong>Weekdays:</strong> 5:00 PM - 10:00 PM</li>
          <li>• <strong>Weekends:</strong> 9:00 AM - 5:00 PM</li>
        </ul>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <motion.button
          type="submit"
          disabled={isSubmitting || checkingAvailability}
          whileHover={!isSubmitting && !checkingAvailability ? { y: -1 } : {}}
          whileTap={!isSubmitting && !checkingAvailability ? { scale: 0.98 } : {}}
          className="w-full sm:w-auto px-8 py-3 text-white font-medium rounded-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#2C5F4E' }}
          onMouseEnter={(e) => {
            if (!isSubmitting && !checkingAvailability) {
              e.currentTarget.style.backgroundColor = '#234A3D'
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting && !checkingAvailability) {
              e.currentTarget.style.backgroundColor = '#2C5F4E'
            }
          }}
        >
          {isSubmitting ? 'Booking...' : checkingAvailability ? 'Checking...' : 'Book Consultation'}
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </form>
  )
}
