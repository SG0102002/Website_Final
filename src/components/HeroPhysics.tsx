'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { InteractiveBackground } from './InteractiveBackground'
import { ParticleNetwork } from './ParticleNetwork'

export function HeroPhysics() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen flex items-center relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Animated green background with cursor interaction */}
      <InteractiveBackground />
      <ParticleNetwork />

      {/* Text Content - Overlaid on top */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-20 w-full">
        <div className="max-w-4xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-8xl font-bold leading-tight"
                style={{ color: '#1A1A1A' }}
              >
                Build Systems That{' '}
                <span style={{ color: '#2C5F4E' }}>Work</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto"
                style={{ color: '#666666' }}
              >
                We design automation and intelligent systems that reduce manual work,
                improve decision-making, and scale reliably.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                onClick={scrollToContact}
                size="lg"
                className="text-white font-semibold px-10 py-7 text-xl transition-all duration-200 shadow-md hover:shadow-lg"
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
                Start a Project
              </Button>

              <div className="flex items-center gap-4 px-6 py-3" style={{ backgroundColor: '#F5F5F5', borderColor: '#E5E5E5', borderWidth: '1px' }}>
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2C5F4E', border: '2px solid #FFFFFF' }}>
                    <span className="text-xs font-mono font-bold text-white">AI</span>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2C5F4E', border: '2px solid #FFFFFF' }}>
                    <span className="text-[9px] font-mono font-bold text-white">AUTO</span>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2C5F4E', border: '2px solid #FFFFFF' }}>
                    <span className="text-xs font-mono font-bold text-white">WEB</span>
                  </div>
                </div>
                <p className="text-sm font-mono font-semibold" style={{ color: '#1A1A1A' }}>
                  Full-stack
                </p>
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="pt-16"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-mono" style={{ color: '#999999' }}>Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-6 h-10 rounded-full flex items-start justify-center p-2"
                  style={{ borderColor: '#E5E5E5', borderWidth: '2px' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#2C5F4E' }} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
