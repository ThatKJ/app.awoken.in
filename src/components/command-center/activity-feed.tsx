"use client"

import { cn } from "@/lib/utils"
import { Bot, User, Target, Clock, MessageSquare } from "lucide-react"

type Activity = {
  icon: typeof Bot
  text: string
  detail: string
  time: string
  type: "ai" | "human" | "system"
}

const today: Activity[] = [
  { icon: Bot, text: "Elena qualified lead Priya Sharma", detail: "Confidence 92% · Auto-approved → Convert", time: "2m ago", type: "ai" },
  { icon: MessageSquare, text: "Marcus resolved query for Rajesh Kumar", detail: "Contract terms explained · 4 messages", time: "15m ago", type: "ai" },
  { icon: Target, text: "Priya flagged anomaly in visit data", detail: "Week-over-week drop of 18% · Needs review", time: "32m ago", type: "ai" },
  { icon: User, text: "You dismissed 3 recovered deals", detail: "Bulk action · No longer valid", time: "1h ago", type: "human" },
  { icon: Clock, text: "MLS integration sync completed", detail: "Duration 12s · 0 errors", time: "2h ago", type: "system" },
]

const yesterday: Activity[] = [
  { icon: Bot, text: "Elena processed 28 leads overnight", detail: "6 qualified · 2 high-priority", time: "Yesterday", type: "ai" },
  { icon: MessageSquare, text: "Marcus handled 15 after-hours messages", detail: "93% satisfaction · 1 escalated", time: "Yesterday", type: "ai" },
  { icon: Target, text: "Aria completed 4 site visits", detail: "All confirmed · 1 rescheduled", time: "Yesterday", type: "system" },
]

const typeStyles = {
  ai: "border-primary/20 bg-primary/[0.02]",
  human: "border-foreground/10 bg-foreground/[0.02]",
  system: "border-muted-foreground/10 bg-muted/[0.02]",
}

const iconStyles = {
  ai: "bg-primary/10 text-primary",
  human: "bg-muted text-foreground",
  system: "bg-muted text-muted-foreground",
}

function ActivityItem({ item, isLast }: { item: Activity; isLast: boolean }) {
  const Icon = item.icon
  return (
    <div className={cn("flex gap-3 relative", !isLast && "pb-2.5")}>
      {!isLast && <div className="absolute left-[11px] top-5 bottom-0 w-px bg-border" />}

      <div className={cn("flex size-6 items-center justify-center rounded-md shrink-0", iconStyles[item.type])}>
        <Icon className="size-3" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-foreground">{item.text}</span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-px">{item.detail}</p>
      </div>

      <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">{item.time}</span>
    </div>
  )
}

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Activity</h3>
        <span className="text-[10px] text-muted-foreground">Last 24h</span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Today</span>
          <div className="h-px flex-1 bg-border/50" />
        </div>

        {today.map((item, i) => (
          <ActivityItem key={`today-${i}`} item={item} isLast={i === today.length - 1 && yesterday.length === 0} />
        ))}

        <div className="flex items-center gap-2 mb-2.5 pt-2">
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Yesterday</span>
          <div className="h-px flex-1 bg-border/50" />
        </div>

        {yesterday.map((item, i) => (
          <ActivityItem key={`yesterday-${i}`} item={item} isLast={i === yesterday.length - 1} />
        ))}
      </div>
    </div>
  )
}
