"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type LeadConfidenceProps = {
  value: number
  size?: "sm" | "md"
}

const labels: Record<string, { label: string; color: string; bar: string }> = {
  high: { label: "Very likely to book", color: "text-success", bar: "bg-success" },
  medium: { label: "Moderate intent", color: "text-warning", bar: "bg-warning" },
  low: { label: "Low interest", color: "text-muted-foreground/60", bar: "bg-muted-foreground/30" },
}

function getLevel(value: number) {
  if (value >= 80) return labels.high
  if (value >= 50) return labels.medium
  return labels.low
}

export function LeadConfidence({ value, size = "sm" }: LeadConfidenceProps) {
  const level = getLevel(value)
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex flex-col items-end gap-0.5 min-w-[80px]">
        <div className="flex items-center gap-1.5">
          <span className={cn("font-semibold tabular-nums leading-none", size === "sm" ? "text-xs" : "text-sm", level.color)}>
            {value}%
          </span>
          <span className={cn("leading-none font-medium", size === "sm" ? "text-[10px]" : "text-[11px]", level.color)}>
            {level.label}
          </span>
        </div>
        <div className={cn("w-full overflow-hidden rounded-full bg-muted", size === "sm" ? "h-1" : "h-1.5")}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn("h-full rounded-full", level.bar)}
          />
        </div>
      </div>
    </div>
  )
}
