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
    <section id="contact" className="relative py-32 px-8 md:px-12 lg:px-16 bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `linear-gradient(to right, rgb(146 64 14) 1px, transparent 1px), linear-gradient(to bottom, rgb(146 64 14) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Warm bronze accent gradient blobs */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-amber-900/15 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl" />

      <div className="max-w-[900px] mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-vibrant-terracotta mb-6">
            Ready to start?
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-vibrant-slate leading-tight mb-6 font-bold tracking-tight">
            Let&apos;s Design Something
            <br />
            That Works
          </h2>

          <p className="text-lg text-vibrant-slate/70 max-w-2xl mx-auto leading-relaxed">
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
          <div className="relative backdrop-blur-xl bg-white/90 p-10 md:p-12 rounded-3xl border border-vibrant-purple/20 shadow-2xl shadow-vibrant-purple/20">

            {/* Tab Buttons */}
            <div className="flex gap-2 mb-8 p-1 bg-amber-50/50 rounded-2xl">
              <button
                type="button"
                onClick={() => setActiveTab('contact')}
                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'contact'
                    ? 'bg-vibrant-purple text-white shadow-lg shadow-vibrant-purple/30'
                    : 'text-vibrant-slate/60 hover:text-vibrant-slate hover:bg-white/50'
                }`}
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('booking')}
                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'booking'
                    ? 'bg-vibrant-purple text-white shadow-lg shadow-vibrant-purple/30'
                    : 'text-vibrant-slate/60 hover:text-vibrant-slate hover:bg-white/50'
                }`}
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
                  <Label htmlFor="name" className="text-vibrant-slate font-medium">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
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
                  <Label htmlFor="email" className="text-vibrant-slate font-medium">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
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

              {/* Message */}
              <div className="space-y-3">
                <Label htmlFor="message" className="text-vibrant-slate font-medium">
                  Tell us about your project
                </Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className="px-5 py-4 bg-white border-vibrant-slate/20 text-vibrant-slate placeholder-vibrant-slate/40 rounded-xl focus:ring-2 focus:ring-vibrant-purple focus:border-vibrant-purple resize-none transition-all"
                  placeholder="Share your vision with us..."
                  aria-invalid={errors.message ? 'true' : 'false'}
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
                  className="w-full sm:w-auto px-10 py-4 bg-vibrant-terracotta text-white font-semibold rounded-full hover:bg-vibrant-terracotta-light hover:shadow-xl hover:shadow-vibrant-terracotta/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </motion.button>

                <div className="flex items-center gap-2 text-vibrant-slate/60 text-sm">
                  <Mail size={16} strokeWidth={1.5} />
                  <span>or email</span>
                  <a
                    href="mailto:radixs2402@gmail.com"
                    className="text-vibrant-terracotta hover:underline font-medium transition-all"
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
