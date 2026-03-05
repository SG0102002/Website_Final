'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Database, Search, TrendingUp } from 'lucide-react'

const challenges = [
  {
    icon: AlertCircle,
    title: 'Manual, repetitive workflows',
    description: 'Teams spending hours on tasks that could be automated, reducing productivity and increasing operational costs'
  },
  {
    icon: Database,
    title: 'Disconnected tools and data',
    description: 'Information scattered across platforms, making it difficult to get a complete view or make informed decisions'
  },
  {
    icon: Search,
    title: 'Information that is hard to find or use',
    description: 'Knowledge buried in documents and systems, wasting time and slowing down critical work'
  },
  {
    icon: TrendingUp,
    title: "Systems that don't scale or break under growth",
    description: "Solutions that worked initially but can't handle increased volume, complexity, or user demands"
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Understand the real problem',
    description: 'Listen deeply to business needs, constraints, and goals before proposing any solution'
  },
  {
    number: '02',
    title: 'Identify what actually needs automation or AI',
    description: 'Not every problem needs complex technology — we focus on what delivers genuine value'
  },
  {
    number: '03',
    title: 'Design a system that fits the business',
    description: 'Create solutions that work with existing tools, teams, and processes'
  },
  {
    number: '04',
    title: 'Build and validate incrementally',
    description: 'Ship working versions early, test with real users, and iterate based on feedback'
  },
  {
    number: '05',
    title: 'Refine based on real-world usage',
    description: 'Improve performance, reliability, and usability as the system proves itself'
  }
]

export function HowWeWork() {
  return (
    <section id="how-we-work" className="relative py-32 px-8 md:px-12 lg:px-16 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Background Pattern - very subtle */}
      <div className="absolute inset-0 opacity-[0.01]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #B8956A 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* No gradient blobs - keep it minimal */}

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Challenges Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 space-y-4"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: '#2C5F4E' }}>
              Common Challenges
            </span>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#1A1A1A' }}>
              Problems We Help Businesses Address
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -4 }}
                  className="group relative p-8 shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ backgroundColor: '#FFFFFF', border: `1px solid #E5E5E5` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#B8956A'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(184, 149, 106, 0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E5E5'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = ''
                  }}
                >
                  <div className="relative flex items-start gap-4">
                    <div className="p-4 transition-all duration-300 group-hover:bg-[#B8956A]/10" style={{ backgroundColor: 'rgba(44, 95, 78, 0.05)' }}>
                      <Icon className="w-6 h-6 transition-colors duration-300 group-hover:text-[#B8956A]" style={{ color: '#2C5F4E' }} />
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-bold transition-colors duration-300 text-[#1A1A1A] group-hover:text-[#B8956A]">
                        {challenge.title}
                      </h3>
                      <p className="leading-relaxed" style={{ color: '#666666' }}>
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Process Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 space-y-4"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: '#2C5F4E' }}>
              How We Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#1A1A1A' }}>
              A Structured, Thoughtful Approach
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{ color: '#666666' }}>
              We follow a proven process that balances speed with care, ensuring solutions that work and last.
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block" style={{ background: `linear-gradient(to bottom, transparent, #E5E5E5, transparent)` }} />

            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ x: 4 }}
                  className="relative flex gap-6 md:gap-8 items-start group"
                >
                  {/* Number badge */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 flex items-center justify-center shadow-sm transition-all duration-300" style={{ backgroundColor: '#2C5F4E' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#B8956A'
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(184, 149, 106, 0.3)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#2C5F4E'
                        e.currentTarget.style.boxShadow = ''
                      }}>
                      <span className="text-2xl font-mono font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 p-6 shadow-sm group-hover:shadow-md transition-all duration-300" style={{ backgroundColor: '#FFFFFF', border: `1px solid #E5E5E5` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#B8956A'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(184, 149, 106, 0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E5E5E5'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = ''
                    }}>
                    <h3 className="text-2xl font-bold mb-3 transition-colors duration-300 text-[#1A1A1A] group-hover:text-[#B8956A]">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-lg" style={{ color: '#666666' }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
