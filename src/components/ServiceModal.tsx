'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Service } from '@/types/service'
import { Button } from '@/components/ui/button'

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service: Service | null
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!service) return null

  const scrollToContact = () => {
    onClose()
    setTimeout(() => {
      const element = document.getElementById('contact')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-vibrant-slate/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto backdrop-blur-xl bg-white/90 rounded-3xl shadow-2xl border border-vibrant-slate/10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-vibrant-slate/10 hover:bg-vibrant-slate/20 transition-colors z-10"
            >
              <X className="w-6 h-6 text-vibrant-slate" />
            </button>

            <div className="p-8 md:p-12 space-y-8">

              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-vibrant-purple/20 flex items-center justify-center border border-vibrant-purple/30">
                    <span className="text-2xl font-mono text-vibrant-purple font-bold">
                      {service.id}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-vibrant-slate leading-tight">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <p className="text-lg text-vibrant-slate/70 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Designed For Section */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-vibrant-purple/5 to-transparent border border-vibrant-purple/20">
                <h3 className="text-sm font-mono font-semibold text-vibrant-purple uppercase tracking-wider mb-4">
                  Designed For
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {service.designedFor.map((audience, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-vibrant-purple mt-2" />
                      <span className="text-vibrant-slate/80">{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits Section */}
              <div>
                <h3 className="text-sm font-mono font-semibold text-vibrant-slate/60 uppercase tracking-wider mb-4">
                  What We Build
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-vibrant-purple/20 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-vibrant-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-vibrant-slate/80 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact Metric */}
              {service.impactMetric && (
                <div className="p-5 rounded-xl bg-vibrant-slate/5 border-l-4 border-vibrant-purple">
                  <p className="text-vibrant-slate/80 leading-relaxed italic">
                    {service.impactMetric}
                  </p>
                </div>
              )}

              {/* Tech Stack */}
              {service.techStack && service.techStack.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-mono text-vibrant-slate/60 uppercase tracking-wider">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-sm font-mono rounded-full bg-vibrant-slate/10 text-vibrant-slate border border-vibrant-slate/20 hover:border-vibrant-purple/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="pt-4">
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="w-full bg-vibrant-purple hover:bg-vibrant-purple-light text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-vibrant-purple-light/40 py-6 text-lg"
                >
                  Let&apos;s Discuss Your Project
                </Button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
