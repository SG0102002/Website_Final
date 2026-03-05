'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Service } from '@/types/service'
import { ServiceModal } from './ServiceModal'
import { ArrowUpRight } from 'lucide-react'

const services: Service[] = [
  {
    id: '01',
    title: 'Automated Excel Comparison & Data Validation',
    shortDescription: 'Automated Excel comparison systems that detect inconsistencies, highlight mismatches, and reduce manual reconciliation hours for finance teams.',
    fullDescription: 'Many SMEs rely heavily on Excel for reporting, reconciliation, budgeting, and compliance. Manual cross-checking between complex spreadsheets is time-consuming and prone to error.',
    designedFor: [
      'Accountants',
      'Auditors',
      'Finance teams',
      'Real estate professionals',
      'Operations managers'
    ],
    benefits: [
      'Compare large, multi-sheet Excel files instantly',
      'Detect inconsistencies and discrepancies',
      'Highlight missing or mismatched data',
      'Reduce manual reconciliation hours',
      'Improve reporting accuracy'
    ],
    impactMetric: 'Especially valuable for firms handling financial audits, property reconciliations, cost tracking, and compliance reporting.',
    techStack: ['Python', 'Pandas', 'openpyxl', 'FastAPI', 'Excel API'],
    videoUrl: '/assets/videos/excel-comparison-demo.mov'
  },
  {
    id: '02',
    title: 'Custom Website Development',
    shortDescription: 'Modern, secure, and scalable websites custom-built for business growth—not template-based.',
    fullDescription: 'We develop modern, secure, and scalable websites tailored to your operations. Whether it\'s a corporate site, booking system, or secure client portal, we ensure your website supports your business — not just markets it.',
    designedFor: [
      'SMEs establishing digital presence',
      'Service-based businesses',
      'Professional firms',
      'Companies needing client portals',
      'Internal dashboards'
    ],
    benefits: [
      'Custom-built (not template-based)',
      'Structured for performance and scalability',
      'Designed for credibility and authority',
      'Integrated with internal systems where required'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL']
  },
  {
    id: '03',
    title: 'Smart Search & Internal Knowledge Systems',
    shortDescription: 'Intelligent search systems that allow teams to find documents instantly using natural language, reducing time spent searching through folders.',
    fullDescription: 'As companies grow, finding the right document quickly becomes difficult. We build intelligent search systems with natural language capabilities and smart filtering.',
    designedFor: [
      'Companies with large internal documentation',
      'HR departments',
      'Legal & compliance teams',
      'Engineering and project-based firms',
      'Operations-heavy businesses'
    ],
    benefits: [
      'Search documents in natural language',
      'Filter by department, project, or category',
      'Retrieve relevant files instantly',
      'Reduce time spent searching through folders'
    ],
    impactMetric: 'Significantly improves productivity for document-driven businesses.',
    techStack: ['LangChain', 'Pinecone', 'OpenAI', 'React', 'Vector Search']
  },
  {
    id: '04',
    title: 'Workflow Automation & Software Integration',
    shortDescription: 'Connect your software tools and automate repetitive workflows to eliminate duplicate data entry and reduce operational errors.',
    fullDescription: 'We design systems that connect your software tools and automate repetitive workflows. Instead of adding more manual steps, we simplify and streamline your operations.',
    designedFor: [
      'SMEs using multiple disconnected tools',
      'Businesses managing repetitive manual processes',
      'Teams relying on spreadsheet-based operations'
    ],
    benefits: [
      'Eliminate duplicate data entry',
      'Sync data across systems',
      'Automate reporting',
      'Reduce operational errors',
      'Improve process clarity'
    ],
    techStack: ['n8n', 'Zapier', 'Microsoft 365', 'Google Workspace', 'Python', 'API Integration']
  },
  {
    id: '05',
    title: 'CAD to BIM Digital Transformation',
    shortDescription: 'Digital solutions that help transition traditional CAD workflows into structured BIM-ready environments.',
    fullDescription: 'We develop digital solutions that help architecture and engineering firms modernize their workflows while maintaining efficiency and project accuracy.',
    designedFor: [
      'Architecture firms',
      'Engineering consultancies',
      'Construction companies',
      'Real estate developers'
    ],
    benefits: [
      'Convert CAD drawings into structured BIM-compatible data',
      'Reduce repetitive modeling work',
      'Improve data consistency across projects',
      'Support scalable digital construction processes'
    ],
    impactMetric: 'Helps firms modernize their workflows while maintaining efficiency and project accuracy.',
    videoUrl: '/assets/videos/cad2bim-demo.mov'
  }
]

export function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  return (
    <>
      <div className="relative overflow-hidden" style={{ backgroundColor: '#2C5F4E' }}>
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(184 149 106) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-20 md:py-32 relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 space-y-4"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-2 text-white/70">
              What We Build
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Systems That Solve Real Problems
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              End-to-end solutions designed for impact
            </p>
          </motion.div>

          {/* Services Grid - First 3 in row, last 2 centered */}
          <div className="space-y-6 lg:space-y-8">
            {/* First row - 3 services */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedService(service)}
                className="group relative p-8 bg-white/5 border border-white/10 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#B8956A'
                  e.currentTarget.style.backgroundColor = 'rgba(184, 149, 106, 0.08)'
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(184, 149, 106, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <div className="relative space-y-4">
                  {/* Service Number */}
                  <div className="flex items-start justify-between">
                    <span className="text-5xl font-mono font-bold text-white/20 group-hover:text-[#B8956A]/40 transition-colors duration-300">
                      {service.id}
                    </span>
                    <div className="p-2 bg-white/10 group-hover:bg-[#B8956A]/20 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-white group-hover:text-[#B8956A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#B8956A] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {/* Learn More */}
                  <div className="pt-2">
                    <span className="text-sm font-semibold text-white group-hover:text-[#B8956A] group-hover:underline transition-all duration-300">
                      Learn More →
                    </span>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>

            {/* Second row - 2 services centered */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {services.slice(3, 5).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedService(service)}
                className="group relative p-8 bg-white/5 border border-white/10 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#B8956A'
                  e.currentTarget.style.backgroundColor = 'rgba(184, 149, 106, 0.08)'
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(184, 149, 106, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <div className="relative space-y-4">
                  {/* Service Number */}
                  <div className="flex items-start justify-between">
                    <span className="text-5xl font-mono font-bold text-white/20 group-hover:text-[#B8956A]/40 transition-colors duration-300">
                      {service.id}
                    </span>
                    <div className="p-2 bg-white/10 group-hover:bg-[#B8956A]/20 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-white group-hover:text-[#B8956A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#B8956A] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {/* Learn More */}
                  <div className="pt-2">
                    <span className="text-sm font-semibold text-white group-hover:text-[#B8956A] group-hover:underline transition-all duration-300">
                      Learn More →
                    </span>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          </div>
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
