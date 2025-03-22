'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from 'lucide-react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'bot'
  content: string
}

export default function Chat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hello! I'm your AI course recommender. What would you like to learn?" }
  ])
  const [input, setInput] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const handleSend = async () => {
    if (input.trim()) {
      // Add user message to the chat
      setMessages(prev => [...prev, { role: 'user', content: input }])
      setIsLoading(true)
      
      try {
        // Send the message to the backend
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
          user_input: input
        })
        
        // Add bot response to the chat
        setMessages(prev => [...prev, { role: 'bot', content: response.data.response }])
      } catch (error) {
        console.error('Error communicating with the backend:', error)
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: "Sorry, I'm having trouble connecting to the server. Please try again later." 
        }])
      } finally {
        setIsLoading(false)
        setInput('')
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="fixed bottom-4 bg-white right-4 w-80 h-96 flex flex-col">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="flex-grow">AI Recommender</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 pr-4 mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </span>
            </div>
          ))}
          {isLoading && <div className="loading-indicator">AI is thinking...</div>}
        </ScrollArea>
      </CardContent>
      <CardFooter className='absolute bg-white bottom-0 w-full'>
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
          />
          <Button type="submit" onClick={handleSend} disabled={isLoading || !input.trim()}>Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}