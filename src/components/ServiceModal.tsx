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

            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">

                {/* Left: Visual Placeholder */}
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-vibrant-green/20 to-vibrant-green/5 flex items-center justify-center border border-vibrant-green/20">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-vibrant-green/20 flex items-center justify-center">
                      <span className="text-2xl font-mono text-vibrant-green font-bold">
                        {service.id}
                      </span>
                    </div>
                    <p className="text-sm font-mono text-vibrant-slate/60">Preview</p>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold text-vibrant-slate">
                      {service.title}
                    </h2>
                    <p className="text-vibrant-slate/70 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Impact Metric */}
                  <div className="p-4 rounded-xl bg-vibrant-green/10 border border-vibrant-green/20">
                    <p className="text-sm font-mono text-vibrant-green/80 mb-1">Impact</p>
                    <p className="font-semibold text-vibrant-slate">{service.impactMetric}</p>
                  </div>

                  {/* Tech Stack */}
                  {service.techStack && service.techStack.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-mono text-vibrant-slate/60">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-mono rounded-full bg-vibrant-slate/10 text-vibrant-slate border border-vibrant-slate/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <Button
                    onClick={scrollToContact}
                    size="lg"
                    className="w-full bg-vibrant-green hover:bg-vibrant-green-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-vibrant-green/25"
                  >
                    Let&apos;s Talk
                  </Button>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
