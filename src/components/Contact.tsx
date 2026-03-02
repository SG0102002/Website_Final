'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // TODO: Add API endpoint for form submission
  }

  return (
    <section id="contact" className="relative py-32 px-8 md:px-12 lg:px-16 bg-gradient-to-br from-slate-100 via-purple-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `linear-gradient(to right, rgb(139 92 246) 1px, transparent 1px), linear-gradient(to bottom, rgb(139 92 246) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Purple accent gradient blobs */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl" />

      <div className="max-w-[900px] mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-vibrant-purple mb-6">
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

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative backdrop-blur-xl bg-white/90 p-10 md:p-12 rounded-3xl border border-vibrant-purple/20 shadow-2xl shadow-vibrant-purple/20">

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name & Email Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-vibrant-slate font-medium">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-5 py-6 bg-white border-vibrant-slate/20 text-vibrant-slate placeholder-vibrant-slate/40 rounded-xl focus:ring-2 focus:ring-vibrant-purple focus:border-vibrant-purple transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-vibrant-slate font-medium">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-5 py-6 bg-white border-vibrant-slate/20 text-vibrant-slate placeholder-vibrant-slate/40 rounded-xl focus:ring-2 focus:ring-vibrant-purple focus:border-vibrant-purple transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-3">
                <Label htmlFor="message" className="text-vibrant-slate font-medium">
                  Tell us about your project
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="px-5 py-4 bg-white border-vibrant-slate/20 text-vibrant-slate placeholder-vibrant-slate/40 rounded-xl focus:ring-2 focus:ring-vibrant-purple focus:border-vibrant-purple resize-none transition-all"
                  placeholder="Share your vision with us..."
                  required
                />
              </div>

              {/* Submit Button & Alt Contact */}
              <div className="flex flex-col sm:flex-row gap-5 items-center pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-10 py-4 bg-vibrant-purple text-white font-semibold rounded-full hover:bg-vibrant-purple-dark hover:shadow-xl hover:shadow-vibrant-purple/25 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </motion.button>

                <div className="flex items-center gap-2 text-vibrant-slate/60 text-sm">
                  <Mail size={16} strokeWidth={1.5} />
                  <span>or email</span>
                  <a
                    href="mailto:contact@su-studio.com"
                    className="text-vibrant-purple hover:underline font-medium transition-all"
                  >
                    contact@su-studio.com
                  </a>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
