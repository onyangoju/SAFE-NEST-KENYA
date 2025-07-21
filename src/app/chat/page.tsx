'use client'

import { useState, useRef, useEffect } from 'react'
import { Shield, Lock, Eye, MessageCircle, Send, User, Bot } from 'lucide-react'

interface Message {
  id: string
  sender: 'user' | 'bot'
  content: string
  timestamp: number
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome',
    sender: 'bot',
    content: 'Hello! I am Safe Nest Support. How can I help you today? (You can remain anonymous.)',
    timestamp: 0, // Use fixed value for SSR consistency
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg: Message = {
      id: `${Date.now()}-user`,
      sender: 'user',
      content: input,
      timestamp: Date.now(),
    }
    setMessages((msgs) => [...msgs, userMsg])
    setInput('')
    setLoading(true)
    // Call AI API (OpenAI or Hugging Face)
    let botReply = 'Sorry, I am unable to respond at the moment.'
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content }),
      })
      const data = await res.json()
      if (data.reply) botReply = data.reply
    } catch {}
    setMessages((msgs) => [
      ...msgs,
      {
        id: `${Date.now()}-bot`,
        sender: 'bot',
        content: botReply,
        timestamp: Date.now(),
      },
    ])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Main Content Card */}
      <main className="max-w-2xl mx-auto p-10 bg-white rounded-2xl shadow-lg border border-gray-100 mt-10 mb-10 flex flex-col">
        <div className="flex flex-col items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-2">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2 flex items-center gap-2">💬 Support Chat</h1>
          <p className="text-gray-800 text-base text-center">You can chat anonymously. All messages are private and secure.</p>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1 text-green-600 text-xs"><Lock className="w-4 h-4" /> Secure</div>
            <div className="flex items-center gap-1 text-green-600 text-xs"><Eye className="w-4 h-4" /> Anonymous</div>
            <div className="flex items-center gap-1 text-green-600 text-xs"><Shield className="w-4 h-4" /> Protected</div>
          </div>
        </div>
        <div ref={chatRef} className="flex-1 overflow-y-auto bg-blue-50 rounded-xl p-4 mb-4 max-h-96">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-blue-500" />}
                  <span className="font-semibold">{msg.sender === 'user' ? 'You' : 'SafeNestBot'}</span>
                </div>
                <div>{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-3">
              <div className="max-w-xs px-4 py-2 rounded-lg shadow text-sm bg-white text-gray-800 border animate-pulse">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold">SafeNestBot</span>
                </div>
                <div>Typing...</div>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={sendMessage} className="flex gap-2 items-end">
          <textarea
            className="form-input flex-1 text-gray-900 placeholder-gray-600 bg-gray-50 border-gray-300 focus:border-blue-500 focus:bg-white"
            rows={2}
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold shadow flex items-center gap-1 text-lg" disabled={loading || !input.trim()}>
            <Send className="w-4 h-4" />
            Send
          </button>
        </form>
      </main>
    </div>
  )
} 