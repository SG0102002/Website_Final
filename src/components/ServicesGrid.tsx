'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Service } from '@/types/service'
import { ServiceModal } from './ServiceModal'
import { ArrowUpRight } from 'lucide-react'

const services: Service[] = [
  {
    id: '01',
    title: 'Automated Variance Analysis',
    description: 'A custom-built engine designed to compare complex Excel files instantly. Built specifically to eliminate hours of manual cross-checking for accountants, auditors, and real estate professionals.',
    impactMetric: 'Eliminates manual data comparison errors.',
    techStack: ['Python', 'Pandas', 'Excel API', 'FastAPI']
  },
  {
    id: '02',
    title: 'Knowledge & Search Systems',
    description: 'Enterprise-grade systems for finding and retrieving internal information. We design AI-powered document retrieval for large knowledge bases using vector search with filtering for accurate, contextual results.',
    impactMetric: 'Reduced information retrieval time by 70% for internal teams.',
    techStack: ['LangChain', 'Pinecone', 'OpenAI', 'React']
  },
  {
    id: '03',
    title: 'Internal Workflow Automation',
    description: 'Streamlining repetitive processes to free up human capacity. We integrate disconnected systems to eliminate manual data transfer and build self-service tools to reduce dependency on technical teams.',
    impactMetric: 'Eliminated 15+ hours of manual work per week per team.',
    techStack: ['n8n', 'Zapier', 'Python', 'API Integration']
  },
  {
    id: '04',
    title: 'High-Performance Web Architecture',
    description: 'As an AI Engineer and Web Designer, I build websites that aren\'t just templates. We create fast, unique, and highly interactive digital experiences that position your brand as a technical authority.',
    impactMetric: 'Scalable, unique digital presence.',
    techStack: ['Next.js', 'React', 'Three.js', 'Tailwind CSS']
  }
]

export function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-24">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-vibrant-slate">
            What We Build
          </h2>
          <p className="text-lg md:text-xl text-vibrant-slate/70 max-w-2xl mx-auto">
            End-to-end solutions designed to solve real problems
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedService(service)}
              className="group relative p-8 rounded-3xl bg-white border border-vibrant-slate/10 hover:border-vibrant-green/50 hover:shadow-2xl hover:shadow-vibrant-green/10 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-vibrant-green/0 to-vibrant-green/0 group-hover:from-vibrant-green/5 group-hover:to-vibrant-green/0 transition-all duration-500 rounded-3xl" />

              <div className="relative space-y-4">
                {/* Service Number */}
                <div className="flex items-start justify-between">
                  <span className="text-5xl font-mono font-bold text-vibrant-green/20 group-hover:text-vibrant-green/40 transition-colors">
                    {service.id}
                  </span>
                  <div className="p-2 rounded-full bg-vibrant-green/10 group-hover:bg-vibrant-green/20 transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-vibrant-green" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-vibrant-slate group-hover:text-vibrant-green transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-vibrant-slate/70 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                {/* Impact Badge */}
                <div className="pt-2">
                  <div className="inline-block px-4 py-2 rounded-full bg-vibrant-green/10 border border-vibrant-green/20">
                    <p className="text-sm font-mono text-vibrant-green">
                      {service.impactMetric}
                    </p>
                  </div>
                </div>

                {/* Learn More */}
                <div className="pt-2">
                  <span className="text-sm font-semibold text-vibrant-green group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ServiceModal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </>
  )
}
