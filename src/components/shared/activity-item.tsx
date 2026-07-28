"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

type ActivityItemProps = {
  icon: LucideIcon
  color: string
  title: string
  description?: string
  timestamp: string
  badge?: { label: string; variant?: "default" | "success" | "warning" | "danger" | "info" }
}

export function ActivityItem({
  icon: Icon,
  color,
  title,
  description,
  timestamp,
  badge,
}: ActivityItemProps) {
  return (
    <div className="relative flex gap-3 pb-6 last:pb-0">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div
          className="flex size-7 items-center justify-center rounded-full ring-4 ring-background"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="size-3.5" style={{ color }} />
        </div>
        <div className="mt-1 w-px flex-1 bg-border" />
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{title}</span>
          {badge && (
            <span
              className={cn(
                "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                badge.variant === "success" && "bg-success/10 text-success",
                badge.variant === "warning" && "bg-warning/10 text-warning",
                badge.variant === "danger" && "bg-destructive/10 text-destructive",
                badge.variant === "info" && "bg-info/10 text-info",
                (!badge.variant || badge.variant === "default") && "bg-primary/10 text-primary"
              )}
            >
              {badge.label}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        )}
        <span className="text-[11px] text-muted-foreground/60">{timestamp}</span>
      </div>
    </div>
  )
}
