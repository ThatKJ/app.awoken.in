"use client"

import { cn } from "@/lib/utils"

type OpportunityProbabilityProps = {
  value: number
  size?: "sm" | "md"
}

export function OpportunityProbability({ value, size = "sm" }: OpportunityProbabilityProps) {
  const color = value >= 80 ? "bg-success" : value >= 50 ? "bg-warning" : value >= 25 ? "bg-info" : "bg-destructive"
  const textColor = value >= 80 ? "text-success" : value >= 50 ? "text-warning" : value >= 25 ? "text-info" : "text-destructive"

  return (
    <div className="flex items-center gap-2">
      <div className={cn("flex-1 rounded-full bg-muted/50 overflow-hidden", size === "sm" ? "h-1.5" : "h-2")}>
        <div className={cn("h-full rounded-full transition-all duration-500", color)} style={{ width: `${value}%` }} />
      </div>
      <span className={cn("font-semibold tabular-nums", textColor, size === "sm" ? "text-[11px]" : "text-xs")}>
        {value}%
      </span>
    </div>
  )
}
