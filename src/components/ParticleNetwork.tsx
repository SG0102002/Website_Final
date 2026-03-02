'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  originalX: number
  originalY: number
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      // Reinitialize particles on resize
      initParticles()
    }

    // Initialize particles
    const initParticles = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      particlesRef.current = []
      const particleCount = Math.floor((width * height) / 14000) // Balanced particle count

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width
        const y = Math.random() * height

        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.5, // Moderate drift speed
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 2, // Medium particles (2-3.5px)
          originalX: x,
          originalY: y
        })
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationId: number
    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      const particles = particlesRef.current
      const connectionDistance = 150
      const mouseInfluence = 120

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Natural drift
        particle.x += particle.vx
        particle.y += particle.vy

        // Return to original position slowly
        const dx = particle.originalX - particle.x
        const dy = particle.originalY - particle.y
        particle.x += dx * 0.01
        particle.y += dy * 0.01

        // Mouse interaction - repulsion/attraction
        const distToMouse = Math.sqrt(
          Math.pow(particle.x - mousePos.current.x, 2) +
          Math.pow(particle.y - mousePos.current.y, 2)
        )

        if (distToMouse < mouseInfluence) {
          const angle = Math.atan2(
            particle.y - mousePos.current.y,
            particle.x - mousePos.current.x
          )
          const force = (mouseInfluence - distToMouse) / mouseInfluence
          particle.x += Math.cos(angle) * force * 2
          particle.y += Math.sin(angle) * force * 2
        }

        // Boundaries
        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1

        // Draw particle with glow
        const distanceFromMouse = Math.sqrt(
          Math.pow(particle.x - mousePos.current.x, 2) +
          Math.pow(particle.y - mousePos.current.y, 2)
        )
        const highlightFactor = Math.max(0, 1 - distanceFromMouse / 200)

        // Color shifts based on proximity to cursor (purple gradient)
        const r = Math.floor(139 + highlightFactor * 28) // 139 -> 167 (vibrant to light purple)
        const g = Math.floor(92 + highlightFactor * 47)  // 92 -> 139
        const b = Math.floor(246 + highlightFactor * 4)  // 246 -> 250

        // Add subtle glow effect
        ctx.shadowBlur = 4 + highlightFactor * 8 // Softer glow
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${0.4 + highlightFactor * 0.3})`

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.7 + highlightFactor * 0.2})` // Balanced visibility
        ctx.fill()

        // Reset shadow for lines
        ctx.shadowBlur = 0

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dist = Math.sqrt(
            Math.pow(particle.x - other.x, 2) +
            Math.pow(particle.y - other.y, 2)
          )

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.35 // Subtle connections

            // Line color matches particle color gradient
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
            ctx.lineWidth = 1 // Standard thickness
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
