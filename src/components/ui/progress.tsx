"use client"

import { cn } from "@/lib/utils"

type ProgressProps = {
  value: number
  max?: number
  variant?: "default" | "success" | "warning" | "danger"
  size?: "sm" | "md"
  showLabel?: boolean
  className?: string
}

const barColors = {
  default: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
}

const heights = {
  sm: "h-1",
  md: "h-2",
}

export function Progress({ value, max = 100, variant = "default", size = "sm", showLabel, className }: ProgressProps) {
  const pct = Math.min(Math.round((value / max) * 100), 100)
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn("flex-1 rounded-full bg-muted/50 overflow-hidden", heights[size])}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", barColors[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && <span className="text-[11px] text-muted-foreground tabular-nums shrink-0">{pct}%</span>}
    </div>
  )
}
