'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Calendar } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { BookingForm } from '@/components/BookingForm'

type Tab = 'contact' | 'booking'

export function Contact() {
  const [activeTab, setActiveTab] = useState<Tab>('contact')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      toast.success(result.message || "Message sent! We'll be in touch soon.")
      reset()
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Failed to send message. Please try again or email us directly at radixs2402@gmail.com'

      toast.error(errorMessage)
    }
  }

  return (
    <section id="contact" className="relative py-32 px-8 md:px-12 lg:px-16 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Clean white background - no patterns, no gradients */}

      <div className="max-w-[900px] mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-6" style={{ color: '#2C5F4E' }}>
            Ready to start?
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 font-bold tracking-tight" style={{ color: '#1A1A1A' }}>
            Let&apos;s Design Something
            <br />
            That Works
          </h2>

          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#666666' }}>
            If you&apos;re exploring automation or AI and want a thoughtful, well-designed system — not hype — let&apos;s talk.
          </p>
        </motion.div>

        {/* Tabs & Forms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative backdrop-blur-xl bg-white/90 p-10 md:p-12 rounded-3xl shadow-2xl" style={{ border: '1px solid #E5E5E5' }}>

            {/* Tab Buttons */}
            <div className="flex gap-2 mb-8 p-1 rounded-2xl" style={{ backgroundColor: '#F5F5F5' }}>
              <button
                type="button"
                onClick={() => setActiveTab('contact')}
                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2`}
                style={activeTab === 'contact' ? { backgroundColor: '#2C5F4E', color: '#FFFFFF' } : { color: '#666666' }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'contact') {
                    e.currentTarget.style.backgroundColor = '#E5E5E5'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'contact') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('booking')}
                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2`}
                style={activeTab === 'booking' ? { backgroundColor: '#2C5F4E', color: '#FFFFFF' } : { color: '#666666' }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'booking') {
                    e.currentTarget.style.backgroundColor = '#E5E5E5'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'booking') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <Calendar className="w-4 h-4" />
                Book Consultation
              </button>
            </div>

            {/* Contact Form */}
            {activeTab === 'contact' && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Name & Email Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="font-medium" style={{ color: '#1A1A1A' }}>
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    {...register('name')}
                    className="px-5 py-6 bg-white rounded-xl focus:ring-2 transition-all"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }}
                    placeholder="Your name"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#2C5F4E'
                      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(44, 95, 78, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E5E5E5'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="font-medium" style={{ color: '#1A1A1A' }}>
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="px-5 py-6 bg-white rounded-xl focus:ring-2 transition-all"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }}
                    placeholder="your@email.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#2C5F4E'
                      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(44, 95, 78, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E5E5E5'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-3">
                <Label htmlFor="message" className="font-medium" style={{ color: '#1A1A1A' }}>
                  Tell us about your project
                </Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className="px-5 py-4 bg-white rounded-xl focus:ring-2 resize-none transition-all"
                  style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }}
                  placeholder="Share your vision with us..."
                  aria-invalid={errors.message ? 'true' : 'false'}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2C5F4E'
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(44, 95, 78, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E5E5E5'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button & Alt Contact */}
              <div className="flex flex-col sm:flex-row gap-5 items-center pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="w-full sm:w-auto px-10 py-4 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#2C5F4E' }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = '#234A3D'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = '#2C5F4E'
                    }
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </motion.button>

                <div className="flex items-center gap-2 text-sm" style={{ color: '#666666' }}>
                  <Mail size={16} strokeWidth={1.5} />
                  <span>or email</span>
                  <a
                    href="mailto:radixs2402@gmail.com"
                    className="hover:underline font-medium transition-all"
                    style={{ color: '#2C5F4E' }}
                  >
                    radixs2402@gmail.com
                  </a>
                </div>
              </div>
            </form>
            )}

            {/* Booking Form */}
            {activeTab === 'booking' && (
              <BookingForm />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
