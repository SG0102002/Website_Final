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
    <section id="how-we-work" className="relative py-32 px-8 md:px-12 lg:px-16 bg-gradient-to-br from-purple-50 via-white to-slate-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(139 92 246) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Purple accent gradient blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl" />

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
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-vibrant-purple mb-2">
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
                  whileHover={{ y: -4 }}
                  className="group relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-vibrant-purple/20 hover:border-vibrant-purple/40 shadow-xl shadow-purple-500/10 hover:shadow-2xl hover:shadow-vibrant-purple/25 transition-all duration-500"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-vibrant-purple/0 to-vibrant-purple/0 group-hover:from-vibrant-purple/5 group-hover:to-transparent rounded-2xl transition-all duration-500" />

                  <div className="relative flex items-start gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-vibrant-purple/10 to-vibrant-purple/5 group-hover:from-vibrant-purple/20 group-hover:to-vibrant-purple/10 transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6 text-vibrant-purple" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-bold text-vibrant-slate group-hover:text-vibrant-purple transition-colors">
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
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-vibrant-purple mb-2">
              How We Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-vibrant-slate">
              A Structured, Thoughtful Approach
            </h2>
            <p className="text-lg md:text-xl text-vibrant-slate/70 max-w-3xl mx-auto">
              We follow a proven process that balances speed with care, ensuring solutions that work and last.
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-vibrant-purple/30 to-transparent hidden md:block" />

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
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vibrant-purple to-vibrant-purple-dark flex items-center justify-center shadow-lg shadow-vibrant-purple/30 group-hover:shadow-xl group-hover:shadow-vibrant-purple/40 transition-all duration-300 group-hover:scale-110">
                      <span className="text-2xl font-mono font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 p-6 rounded-2xl bg-white/80 border border-vibrant-purple/20 group-hover:border-vibrant-purple/40 shadow-lg shadow-purple-500/10 group-hover:shadow-xl group-hover:shadow-vibrant-purple/20 transition-all duration-300 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-vibrant-slate mb-3 group-hover:text-vibrant-purple transition-colors">
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
