'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { MessageCircle } from 'lucide-react'
import Chat from './Chat'

export default function ChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open Chat</span>
      </Button>
      {isChatOpen && <Chat onClose={() => setIsChatOpen(false)} />}
    </>
  )
}

