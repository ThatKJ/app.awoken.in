"use client"

import { useState } from "react"
import { ConversationList } from "@/components/conversations/conversation-list"
import { ConversationPanel } from "@/components/conversations/conversation-panel"
import { ConversationContext } from "@/components/conversations/conversation-context"
import { useConversations, useConversation, useMessages } from "@/hooks/use-conversations"
import type { Message } from "@/types"

export default function ConversationsPage() {
  const [selectedId, setSelectedId] = useState<string | null>("c1")
  const { data: conversations } = useConversations()
  const { data: conversation } = useConversation(selectedId)
  const { data: messages } = useMessages(selectedId)
  const [localMessages, setLocalMessages] = useState<Record<string, Message[]>>({})

  function handleSend(content: string) {
    if (!selectedId) return
    const msg: Message = {
      id: `m-${Date.now()}`,
      conversation_id: selectedId,
      sender: "human",
      channel: conversation?.channel ?? "whatsapp",
      content,
      type: "text",
      created_at: new Date().toISOString(),
    }
    setLocalMessages((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] ?? []), msg],
    }))
  }

  const allMessages = [...(messages ?? []), ...(localMessages[selectedId ?? ""] ?? [])]

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-0 py-0 h-[calc(100vh-4rem)]">
      <div className="flex flex-1 overflow-hidden border-t border-border">
        <div className="w-[360px] shrink-0 border-r border-border bg-card overflow-hidden">
          <ConversationList
            conversations={conversations ?? []}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0 bg-card">
          <ConversationPanel
            conversation={conversation ?? null}
            messages={allMessages}
            onSend={handleSend}
          />
        </div>
        <div className="w-[300px] shrink-0 border-l border-border bg-card overflow-y-auto hidden xl:block">
          <ConversationContext conversation={conversation ?? null} />
        </div>
      </div>
    </div>
  )
}
