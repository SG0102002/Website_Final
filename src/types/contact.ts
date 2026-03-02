export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ApiResponse {
  success: boolean
  message?: string
  error?: string
  data?: {
    id: string
    timestamp: string
  }
}
