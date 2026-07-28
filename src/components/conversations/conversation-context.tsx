"use client"

import { LeadTimeline } from "@/components/leads/lead-timeline"
import { LeadConfidence } from "@/components/leads/lead-confidence"
import { AISuggestions } from "@/components/conversations/ai-suggestions"
import type { Conversation } from "@/types"

type ConversationContextProps = {
  conversation: Conversation | null
}

export function ConversationContext({ conversation }: ConversationContextProps) {
  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center px-4">
        <p className="text-xs text-muted-foreground text-center">Select a conversation to view context</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Lead Summary */}
      <div className="border-b border-border px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {conversation.lead_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{conversation.lead_name}</p>
            <p className="text-xs text-muted-foreground">{conversation.channel === "whatsapp" ? "+91 98765 43210" : "email@example.com"}</p>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Worker</span>
            <span className="font-medium text-foreground">{conversation.worker_name}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Channel</span>
            <span className="font-medium text-foreground capitalize">{conversation.channel}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">AI Confidence</span>
            <LeadConfidence value={conversation.ai_confidence} />
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="border-b border-border px-4 py-4">
        <AISuggestions />
      </div>

      {/* Recent Activity */}
      <div className="px-4 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recent Activity</p>
        <LeadTimeline />
      </div>
    </div>
  )
}
