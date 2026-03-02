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
    <div className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-white to-vibrant-white">
      {/* Interactive cursor-following background gradient */}
      <InteractiveBackground />

      {/* Particle Network - Neural network style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.5 }}
        className="absolute inset-0"
      >
        <ParticleNetwork />
      </motion.div>

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
                className="text-5xl md:text-6xl lg:text-8xl font-bold text-vibrant-slate leading-tight drop-shadow-lg"
                style={{ textShadow: '0 2px 20px rgba(255,255,255,0.8)' }}
              >
                Build Systems That{' '}
                <span className="text-vibrant-green">Work</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl lg:text-2xl text-vibrant-slate/80 leading-relaxed max-w-3xl mx-auto backdrop-blur-sm bg-white/20 rounded-2xl px-6 py-4"
                style={{ textShadow: '0 1px 10px rgba(255,255,255,0.9)' }}
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
                className="bg-vibrant-green hover:bg-vibrant-green-dark text-white font-semibold px-10 py-7 text-xl rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-vibrant-green/40"
              >
                Start a Project
              </Button>

              <div className="flex items-center gap-4 backdrop-blur-sm bg-white/30 rounded-full px-6 py-3">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-vibrant-green/30 border-2 border-white flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xs font-mono text-vibrant-green font-bold">AI</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-vibrant-green/30 border-2 border-white flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xs font-mono text-vibrant-green font-bold">AUTO</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-vibrant-green/30 border-2 border-white flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xs font-mono text-vibrant-green font-bold">WEB</span>
                  </div>
                </div>
                <p className="text-sm text-vibrant-slate font-mono font-semibold">
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
                <span className="text-xs uppercase tracking-wider text-vibrant-slate/50 font-mono">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-6 h-10 rounded-full border-2 border-vibrant-slate/30 flex items-start justify-center p-2"
                >
                  <div className="w-1.5 h-1.5 bg-vibrant-green rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
