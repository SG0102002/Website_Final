'use client'

import { useEffect, useRef } from 'react'

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0.5, y: 0.5 })
  const currentPos = useRef({ x: 0.5, y: 0.5 })

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
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Color interpolation helper
    const lerpColor = (color1: number[], color2: number[], t: number) => {
      return color1.map((c, i) => Math.round(c + (color2[i] - c) * t))
    }

    // Animation loop with time-based color cycling
    let animationId: number
    const startTime = Date.now()

    const animate = () => {
      // Smooth lerp to mouse position
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.08
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.08

      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Animated color cycling - subtle shift between purple shades
      const time = (Date.now() - startTime) * 0.0003 // Slow cycle speed
      const cycle = (Math.sin(time) + 1) / 2 // 0 to 1 oscillation

      // Color palette (RGB values)
      const vibrantPurple = [139, 92, 246]     // #8B5CF6
      const lightPurple = [167, 139, 250]      // #A78BFA

      // Interpolate between colors
      const currentColor = lerpColor(vibrantPurple, lightPurple, cycle)
      const [r, g, b] = currentColor

      // Main gradient that follows cursor with animated colors
      const gradient = ctx.createRadialGradient(
        currentPos.current.x * width,
        currentPos.current.y * height,
        0,
        currentPos.current.x * width,
        currentPos.current.y * height,
        Math.max(width, height) * 0.5
      )

      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.5)`)      // Strong center (increased opacity)
      gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.25)`)   // Medium
      gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.1)`)    // Fade
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)        // Transparent edge

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Secondary gradient with slightly shifted color (inverse cycle)
      const secondaryColor = lerpColor(lightPurple, vibrantPurple, cycle)
      const [r2, g2, b2] = secondaryColor

      const gradient2 = ctx.createRadialGradient(
        width - currentPos.current.x * width * 0.3,
        height - currentPos.current.y * height * 0.3,
        0,
        width - currentPos.current.x * width * 0.3,
        height - currentPos.current.y * height * 0.3,
        Math.max(width, height) * 0.4
      )

      gradient2.addColorStop(0, `rgba(${r2}, ${g2}, ${b2}, 0.35)`)
      gradient2.addColorStop(0.5, `rgba(${r2}, ${g2}, ${b2}, 0.15)`)
      gradient2.addColorStop(1, `rgba(${r2}, ${g2}, ${b2}, 0)`)

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, width, height)

      // Third ambient glow with pulsing effect
      const pulseColor = lerpColor(vibrantPurple, lightPurple, cycle * 0.5)
      const [r3, g3, b3] = pulseColor

      const gradient3 = ctx.createRadialGradient(
        currentPos.current.x * width * 0.6,
        currentPos.current.y * height * 1.2,
        0,
        currentPos.current.x * width * 0.6,
        currentPos.current.y * height * 1.2,
        Math.max(width, height) * 0.6
      )

      gradient3.addColorStop(0, `rgba(${r3}, ${g3}, ${b3}, 0.3)`)
      gradient3.addColorStop(0.6, `rgba(${r3}, ${g3}, ${b3}, 0.1)`)
      gradient3.addColorStop(1, `rgba(${r3}, ${g3}, ${b3}, 0)`)

      ctx.fillStyle = gradient3
      ctx.fillRect(0, 0, width, height)

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
