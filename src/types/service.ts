export interface Service {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  designedFor: string[]
  benefits: string[]
  impactMetric?: string
  techStack?: string[]
}
