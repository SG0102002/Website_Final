'use client'

import { Navigation } from '@/components/Navigation'
import { HeroPhysics } from '@/components/HeroPhysics'
import { ServicesGrid } from '@/components/ServicesGrid'
import { HowWeWork } from '@/components/HowWeWork'
import { Contact } from '@/components/Contact'
import { SectionTransition } from '@/components/SectionTransition'
import { useScrollTracking } from '@/hooks/useScrollTracking'

export default function Home() {
  const activeSection = useScrollTracking(['home', 'services', 'how-we-work', 'contact'])

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} />

      <section id="home">
        <HeroPhysics />
      </section>

      {/* Gradient transition from light hero to dark services */}
      <SectionTransition from="light" to="dark" />

      <section id="services">
        <ServicesGrid />
      </section>

      {/* Gradient transition from dark services to light how-we-work */}
      <SectionTransition from="dark" to="light" />

      <HowWeWork />

      <Contact />
    </div>
  )
}
