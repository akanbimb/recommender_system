'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from 'lucide-react'

interface Message {
  role: 'user' | 'bot'
  content: string
}

export default function Chat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hello! I'm your AI course recommender. What would you like to learn?" }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      // Here you would typically send the message to your AI backend and get a response
      // For this example, we'll just echo the user's message
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', content: `You said: ${input}. That's an interesting topic! I recommend checking out our courses on that subject.` }])
      }, 1000)
      setInput('')
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
      <CardContent>
        <ScrollArea className="w-full pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {message.content}
              </span>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className='absolute bottom-0 w-full'>
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

