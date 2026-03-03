import { FAQ_DATA, FALLBACK_RESPONSES } from './faq-data'
import type { FAQItem } from '@/types/chat'

export function findBestMatch(userMessage: string): string {
  const normalizedMessage = userMessage.toLowerCase().trim()

  // Remove common question words for better matching
  const cleanedMessage = normalizedMessage
    .replace(/^(what is|what's|tell me about|explain|describe)\s+/i, '')
    .replace(/\s+(service|services|about)\s*$/i, '')
    .trim()

  // Check for exact question match first
  const exactMatch = FAQ_DATA.find(faq =>
    faq.question.toLowerCase() === normalizedMessage ||
    faq.question.toLowerCase() === cleanedMessage
  )

  if (exactMatch) {
    return exactMatch.answer
  }

  // Score each FAQ based on keyword matches (use both original and cleaned)
  const scores = FAQ_DATA.map(faq => ({
    faq,
    score: Math.max(
      calculateScore(normalizedMessage, faq),
      calculateScore(cleanedMessage, faq)
    )
  }))

  // Sort by score (highest first)
  scores.sort((a, b) => b.score - a.score)

  // If best match has a good score, return it
  const bestMatch = scores[0]
  if (bestMatch.score > 0.3) {
    return bestMatch.faq.answer
  }

  // No good match found - return fallback
  return getRandomFallback()
}

function calculateScore(message: string, faq: FAQItem): number {
  let score = 0
  const words = message.split(/\s+/)

  // Check keywords
  for (const keyword of faq.keywords) {
    const keywordLower = keyword.toLowerCase()

    // Exact keyword match in message
    if (message.includes(keywordLower)) {
      score += 1.0
    }

    // Individual word matches
    for (const word of words) {
      if (keywordLower.includes(word) || word.includes(keywordLower)) {
        score += 0.5
      }
    }
  }

  // Bonus for question similarity
  const questionWords = faq.question.toLowerCase().split(/\s+/)
  const matchingWords = words.filter(word =>
    questionWords.some(qWord => qWord.includes(word) || word.includes(qWord))
  )
  score += matchingWords.length * 0.3

  // Normalize by message length to avoid bias towards longer messages
  return score / Math.max(words.length, 1)
}

function getRandomFallback(): string {
  const randomIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length)
  return FALLBACK_RESPONSES[randomIndex]
}

export function getSuggestedQuestions(currentCategory?: string): string[] {
  if (currentCategory) {
    // Get questions from the same category
    return FAQ_DATA
      .filter(faq => faq.category === currentCategory)
      .slice(0, 3)
      .map(faq => faq.question)
  }

  // Get random popular questions
  const popularQuestions = [
    'What services do you offer?',
    'How much do you charge?',
    'How do I book a consultation?',
    'What are your working hours?'
  ]

  return popularQuestions.slice(0, 3)
}
