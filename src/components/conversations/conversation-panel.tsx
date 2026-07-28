"use client"

import { useRef, useEffect } from "react"
import { MessageBubble } from "@/components/conversations/message-bubble"
import { MessageComposer } from "@/components/conversations/message-composer"
import { TypingIndicator } from "@/components/conversations/typing-indicator"
import type { Conversation, Message } from "@/types"

type ConversationPanelProps = {
  conversation: Conversation | null
  messages: Message[]
  onSend: (content: string) => void
}

export function ConversationPanel({ conversation, messages, onSend }: ConversationPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">No conversation selected</p>
          <p className="text-xs text-muted-foreground mt-1">Choose a conversation from the list</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {conversation.lead_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{conversation.lead_name}</p>
            <p className="text-xs text-muted-foreground">{conversation.worker_name} · {conversation.channel}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <MessageComposer onSend={onSend} disabled={conversation.is_escalated && !conversation.is_ai} />
    </div>
  )
}
