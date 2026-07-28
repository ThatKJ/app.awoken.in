"use client"

import { cn } from "@/lib/utils"

type LeadConfidenceProps = {
  value: number
  size?: "sm" | "md"
}

export function LeadConfidence({ value, size = "sm" }: LeadConfidenceProps) {
  const color = value >= 80 ? "bg-success" : value >= 50 ? "bg-warning" : "bg-destructive"
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn("flex gap-[2px]", size === "sm" ? "h-2" : "h-2.5")}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn("w-[3px] rounded-full", value / 20 > i ? color : "bg-border")}
          />
        ))}
      </div>
      <span className={cn("font-medium tabular-nums", size === "sm" ? "text-[11px]" : "text-xs", color === "bg-success" ? "text-success" : color === "bg-warning" ? "text-warning" : "text-destructive")}>
        {value}%
      </span>
    </div>
  )
}
