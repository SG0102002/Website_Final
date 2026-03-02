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
    <section id="how-we-work" className="py-24 px-8 md:px-12 lg:px-16 bg-gradient-to-b from-white to-vibrant-white">
      <div className="max-w-[1400px] mx-auto">

        {/* Challenges Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 space-y-4"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-vibrant-green mb-2">
              Common Challenges
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-vibrant-slate">
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
                  className="group relative p-8 rounded-3xl bg-white border border-vibrant-slate/10 hover:border-vibrant-green/30 hover:shadow-xl hover:shadow-vibrant-green/5 transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-vibrant-green/10 group-hover:bg-vibrant-green/20 transition-colors">
                      <Icon className="w-6 h-6 text-vibrant-green" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-bold text-vibrant-slate group-hover:text-vibrant-green transition-colors">
                        {challenge.title}
                      </h3>
                      <p className="text-vibrant-slate/70 leading-relaxed">
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
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-vibrant-green mb-2">
              How We Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-vibrant-slate">
              A Structured, Thoughtful Approach
            </h2>
            <p className="text-lg md:text-xl text-vibrant-slate/70 max-w-3xl mx-auto">
              We follow a proven process that balances speed with care, ensuring solutions that work and last.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-vibrant-green/20 via-vibrant-green/40 to-vibrant-green/20 hidden md:block" />

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative flex gap-6 md:gap-8 items-start"
                >
                  {/* Number badge */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-vibrant-green flex items-center justify-center shadow-lg shadow-vibrant-green/25">
                      <span className="text-2xl font-mono font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2 pb-8">
                    <h3 className="text-2xl font-bold text-vibrant-slate mb-3">
                      {step.title}
                    </h3>
                    <p className="text-vibrant-slate/70 leading-relaxed text-lg">
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
