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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-auto shadow-2xl"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 transition-colors z-10 group"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <X className="w-5 h-5" style={{ color: '#666666' }} />
            </button>

            <div className="p-10 md:p-16 space-y-12">

              {/* Header */}
              <div className="space-y-6 pb-10" style={{ borderBottom: `1px solid #E5E5E5` }}>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight" style={{ color: '#1A1A1A' }}>
                  {service.title}
                </h2>
                <p className="text-xl leading-relaxed max-w-3xl" style={{ color: '#666666' }}>
                  {service.fullDescription}
                </p>
              </div>

              {/* Video Demo - clean, minimal integration */}
              {service.videoUrl && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#999999' }}>
                    Solution Overview
                  </h3>
                  <div className="relative overflow-hidden" style={{ backgroundColor: '#F5F5F5', border: `1px solid #E5E5E5` }}>
                    <video
                      src={service.videoUrl}
                      controls
                      muted
                      loop
                      playsInline
                      className="w-full aspect-video object-contain"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-12">

                {/* Left Column - Designed For */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#999999' }}>
                    Designed For
                  </h3>
                  <ul className="space-y-3">
                    {service.designedFor.map((audience, idx) => (
                      <li key={idx} className="flex items-start gap-3" style={{ color: '#1A1A1A' }}>
                        <span className="mt-1" style={{ color: '#2C5F4E' }}>•</span>
                        <span>{audience}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column - Capabilities */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#999999' }}>
                    Capabilities
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3" style={{ color: '#1A1A1A' }}>
                        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#2C5F4E' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Impact Statement */}
              {service.impactMetric && (
                <div className="p-6" style={{ backgroundColor: '#F5F5F5', borderLeft: `3px solid #2C5F4E` }}>
                  <p className="leading-relaxed" style={{ color: '#1A1A1A' }}>
                    {service.impactMetric}
                  </p>
                </div>
              )}

              {/* Tech Stack - Minimal */}
              {service.techStack && service.techStack.length > 0 && (
                <div className="space-y-3 pt-6" style={{ borderTop: `1px solid #E5E5E5` }}>
                  <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#999999' }}>Technology Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm"
                        style={{ backgroundColor: '#F5F5F5', color: '#1A1A1A', border: `1px solid #E5E5E5` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA - Clean Button */}
              <div className="pt-8">
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="w-full md:w-auto text-white font-medium px-8 py-6 text-base transition-all"
                  style={{ backgroundColor: '#2C5F4E' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#234A3D'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2C5F4E'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Discuss Your Project
                </Button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
