"use client"

import { cn } from "@/lib/utils"
import { Check, CheckCheck, Bot, User } from "lucide-react"
import type { Message, MessageSender } from "@/types"

type MessageBubbleProps = {
  message: Message
}

const senderConfig: Record<MessageSender, { align: string; bg: string; text: string; icon: typeof Bot }> = {
  worker: { align: "justify-end", bg: "bg-primary/10 text-foreground", text: "text-right", icon: Bot },
  human: { align: "justify-end", bg: "bg-accent text-accent-foreground", text: "text-right", icon: User },
  lead: { align: "justify-start", bg: "bg-muted text-foreground", text: "text-left", icon: User },
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const config = senderConfig[message.sender]
  const Icon = config.icon

  return (
    <div className={cn("flex", config.align)}>
      <div className={cn("flex max-w-[80%] gap-2", message.sender === "lead" ? "flex-row" : "flex-row-reverse")}>
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted mt-1">
          <Icon className="size-3.5 text-muted-foreground" />
        </div>
        <div>
          <div className={cn("rounded-2xl px-4 py-2.5 text-sm leading-relaxed", config.bg)}>
            {message.content}
          </div>
          <div className={cn("flex items-center gap-1 mt-1", config.text)}>
            <span className="text-[10px] text-muted-foreground">
              {new Date(message.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </span>
            {message.sender === "worker" && (
              <CheckCheck className="size-3 text-muted-foreground/60" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
