export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  quickActions?: QuickAction[]
}

export interface QuickAction {
  id: string
  label: string
  value: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  keywords: string[]
  category: string
  relatedQuestions?: string[]
}
