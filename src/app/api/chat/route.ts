import { NextResponse } from 'next/server'
import { getGroqClient } from '@/lib/chat/groq-client'
import { getSystemPrompt } from '@/lib/chat/system-prompt'
import { findBestMatch } from '@/lib/chat/matcher'

export async function POST(request: Request) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Try using Groq AI first
    try {
      const groq = getGroqClient()

      // Build conversation context
      const messages = [
        {
          role: 'system' as const,
          content: getSystemPrompt()
        },
        // Add conversation history if provided
        ...(conversationHistory || []).slice(-6), // Last 3 exchanges for context
        {
          role: 'user' as const,
          content: message
        }
      ]

      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile', // Production model - 280 t/s, 131k context
        messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
      })

      const aiResponse = completion.choices[0]?.message?.content

      if (aiResponse) {
        return NextResponse.json({
          success: true,
          response: aiResponse,
          source: 'ai'
        })
      }
    } catch (aiError) {
      console.error('Groq AI error, falling back to keyword matching:', aiError)

      // Fall back to keyword matching
      const keywordResponse = findBestMatch(message)

      return NextResponse.json({
        success: true,
        response: keywordResponse,
        source: 'keyword'
      })
    }

    // If we get here, something went wrong
    return NextResponse.json({
      success: false,
      error: 'Failed to generate response'
    }, { status: 500 })

  } catch (error) {
    console.error('Chat API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while processing your message'
      },
      { status: 500 }
    )
  }
}
