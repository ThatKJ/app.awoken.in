"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type TimelineEvent = {
  id: string
  icon: LucideIcon
  color: string
  title: string
  description?: string
  timestamp: string
  badge?: { label: string; className?: string }
}

type TimelineProps = {
  groups: { label: string; events: TimelineEvent[] }[]
  className?: string
}

function TimelineItem({ event }: { event: TimelineEvent }) {
  return (
    <div className="relative flex gap-3 pb-7 last:pb-0 group/timeline">
      <div className="flex flex-col items-center">
        <div
          className="flex size-7 items-center justify-center rounded-full ring-4 ring-background transition-transform duration-150 group-hover/timeline:scale-110"
          style={{ backgroundColor: `${event.color}12` }}
        >
          <event.icon className="size-3.5" style={{ color: event.color }} />
        </div>
        <div className="mt-1.5 w-px flex-1 bg-border/40 group-last/timeline:hidden" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5 rounded-lg p-2 -mx-2 transition-colors duration-150 group-hover/timeline:bg-accent/30">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{event.title}</span>
          {event.badge && (
            <span
              className={cn(
                "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                event.badge.className ?? "bg-primary/10 text-primary",
              )}
            >
              {event.badge.label}
            </span>
          )}
        </div>
        {event.description && (
          <p className="text-xs text-muted-foreground leading-relaxed">{event.description}</p>
        )}
        <span className="text-[11px] text-muted-foreground/50">{event.timestamp}</span>
      </div>
    </div>
  )
}

export function Timeline({ groups, className }: TimelineProps) {
  return (
    <div className={cn("", className)}>
      {groups.map((group) => (
        <div key={group.label} className="mb-6 last:mb-0">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {group.label}
            </span>
            <div className="h-px flex-1 bg-border/30" />
          </div>
          {group.events.map((event) => (
            <TimelineItem key={event.id} event={event} />
          ))}
        </div>
      ))}
    </div>
  )
}
