"use client"

import { cn } from "@/lib/utils"
import { MessageCircle, Mail, MessageSquare } from "lucide-react"
import type { MessageChannel } from "@/types"

type ChannelBadgeProps = {
  channel: MessageChannel
  className?: string
}

const config: Record<MessageChannel, { icon: typeof MessageCircle; label: string }> = {
  whatsapp: { icon: MessageCircle, label: "WhatsApp" },
  email: { icon: Mail, label: "Email" },
  sms: { icon: MessageSquare, label: "SMS" },
}

export function ChannelBadge({ channel, className }: ChannelBadgeProps) {
  const { icon: Icon, label } = config[channel]
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground", className)}>
      <Icon className="size-3" />
      {label}
    </span>
  )
}
