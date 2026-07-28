"use client"

import { cn } from "@/lib/utils"

export type WorkerMode = "off" | "observing" | "assisted" | "autonomous"

type WorkerModeBadgeProps = {
  mode: WorkerMode
}

const config: Record<WorkerMode, { label: string; className: string }> = {
  off: {
    label: "Off",
    className: "bg-foreground/5 text-foreground/40",
  },
  observing: {
    label: "Observing",
    className: "bg-info/8 text-info",
  },
  assisted: {
    label: "Assisted",
    className: "bg-warning/8 text-warning",
  },
  autonomous: {
    label: "Autonomous",
    className: "bg-success/8 text-success",
  },
}

export function WorkerModeBadge({ mode }: WorkerModeBadgeProps) {
  const c = config[mode]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wide",
        c.className
      )}
    >
      {c.label}
    </span>
  )
}
