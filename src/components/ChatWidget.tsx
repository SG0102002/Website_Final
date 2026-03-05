'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Minimize2, Sparkles } from 'lucide-react'
import { WELCOME_MESSAGE, QUICK_ACTIONS } from '@/lib/chat/faq-data'
import type { Message, QuickAction } from '@/types/chat'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('chatbot-visited')

    if (!hasVisited) {
      sessionStorage.setItem('chatbot-visited', 'true')

      // Show welcome message after a short delay
      setTimeout(() => {
        addBotMessage(WELCOME_MESSAGE, QUICK_ACTIONS)
      }, 1000)
    }
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const addBotMessage = (text: string, quickActions?: QuickAction[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      quickActions
    }
    setMessages(prev => [...prev, newMessage])
    setIsTyping(false)
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleSendMessage = async (message: string) => {
    const trimmedMessage = message.trim()
    if (!trimmedMessage) return

    // Add user message
    addUserMessage(trimmedMessage)
    setInputValue('')

    // Show typing indicator
    setIsTyping(true)

    try {
      // Build conversation history for context
      const conversationHistory = messages
        .slice(-6) // Last 3 exchanges
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.text
        }))

      // Call AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedMessage,
          conversationHistory
        }),
      })

      const data = await response.json()

      if (data.success && data.response) {
        addBotMessage(data.response)
      } else {
        throw new Error('Failed to get response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      addBotMessage(
        "Sorry, I'm having trouble connecting right now. Please try again or email us at radixs2402@gmail.com"
      )
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsOpen(true)
              if (messages.length === 0) {
                addBotMessage(WELCOME_MESSAGE, QUICK_ACTIONS)
              }
            }}
            className="fixed bottom-6 right-6 w-16 h-16 bg-vibrant-purple text-white rounded-full shadow-2xl shadow-vibrant-purple/40 flex items-center justify-center hover:bg-vibrant-purple-light hover:scale-110 hover:shadow-vibrant-purple-light/60 transition-all duration-300 z-50"
            aria-label="Open chat"
          >
            <MessageCircle className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[380px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-vibrant-purple/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-vibrant-purple to-vibrant-green text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
                  <MessageCircle className="w-5 h-5" />
                  <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-1.5">
                    SU Assistant
                    <span className="text-[10px] bg-yellow-400 text-purple-900 px-1.5 py-0.5 rounded font-bold">AI</span>
                  </h3>
                  <p className="text-xs text-white/80">Powered by Groq AI</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Minimize chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                          message.sender === 'user'
                            ? 'bg-vibrant-purple text-white'
                            : 'bg-white text-vibrant-slate shadow-sm border border-gray-200'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.text}
                        </p>

                        {/* Quick Actions */}
                        {message.quickActions && message.quickActions.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.quickActions.map((action) => (
                              <button
                                key={action.id}
                                onClick={() => handleQuickAction(action)}
                                className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-vibrant-terracotta text-xs rounded-full transition-colors border border-orange-200"
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-vibrant-slate shadow-sm border border-gray-200 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-vibrant-purple/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-vibrant-purple/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-vibrant-purple/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your question..."
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-purple focus:border-vibrant-purple text-sm"
                      disabled={isTyping}
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isTyping}
                      className="px-4 py-2.5 bg-vibrant-purple text-white rounded-xl hover:bg-vibrant-purple-light hover:shadow-md hover:shadow-vibrant-purple-light/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
