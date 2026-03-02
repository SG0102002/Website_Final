'use client'

import { Navigation } from '@/components/Navigation'
import { HeroPhysics } from '@/components/HeroPhysics'
import { ServicesGrid } from '@/components/ServicesGrid'
import { HowWeWork } from '@/components/HowWeWork'
import { Contact } from '@/components/Contact'
import { useScrollTracking } from '@/hooks/useScrollTracking'

export default function Home() {
  const activeSection = useScrollTracking(['home', 'services', 'how-we-work', 'contact'])

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} />

      <section id="home">
        <HeroPhysics />
      </section>

      <section id="services" className="py-24">
        <ServicesGrid />
      </section>

      <HowWeWork />

      <Contact />
    </div>
  )
}
