"use client"

import { Search, Filter, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChannelBadge } from "@/components/conversations/channel-badge"
import type { Conversation, MessageChannel } from "@/types"

type ConversationListProps = {
  conversations: Conversation[]
  selectedId: string | null
  onSelect: (id: string) => void
}

function ConversationRow({
  conversation,
  isSelected,
  onSelect,
}: {
  conversation: Conversation
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex w-full items-start gap-3 px-4 py-3 text-left transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        isSelected ? "bg-accent/60" : "hover:bg-muted/40"
      )}
    >
      <div className="relative shrink-0">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {conversation.lead_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
        </div>
        {conversation.unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
            {conversation.unread > 9 ? "9+" : conversation.unread}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-foreground truncate">{conversation.lead_name}</span>
          <span className="shrink-0 text-[11px] text-muted-foreground">{conversation.last_timestamp}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <ChannelBadge channel={conversation.channel} />
          {conversation.is_escalated && (
            <span className="inline-flex items-center rounded-md bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
              Escalated
            </span>
          )}
          {conversation.is_ai && (
            <span className="inline-flex items-center rounded-md bg-success/10 px-1.5 py-0.5 text-[10px] font-medium text-success">
              AI
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate mt-1">{conversation.last_message}</p>
        <p className="text-[11px] text-muted-foreground/60 mt-0.5">{conversation.worker_name}</p>
      </div>
    </button>
  )
}

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Waiting", value: "waiting" },
  { label: "Escalated", value: "escalated" },
]

const channelFilters = [
  { label: "All Channels", value: "all" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
]

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Search */}
      <div className="border-b border-border px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search conversations..."
            className="h-9 w-full rounded-lg border border-border bg-muted/50 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/30 focus:ring-1 focus:ring-primary/20"
          />
        </div>
      </div>
      {/* Filters */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 overflow-x-auto">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {f.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 text-[11px] text-muted-foreground">
          <Filter className="size-3" />
          Channel
          <ChevronDown className="size-3" />
        </div>
      </div>
      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-border/50">
        {conversations.map((c) => (
          <ConversationRow
            key={c.id}
            conversation={c}
            isSelected={selectedId === c.id}
            onSelect={() => onSelect(c.id)}
          />
        ))}
      </div>
    </div>
  )
}
