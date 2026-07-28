"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

type TrendProps = {
  direction: "up" | "down" | "neutral"
  value: string
  className?: string
}

export function Trend({ direction, value, className }: TrendProps) {
  if (direction === "neutral") {
    return <span className={cn("text-xs text-muted-foreground", className)}>{value}</span>
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium",
        direction === "up" ? "text-success" : "text-destructive",
        className
      )}
    >
      {direction === "up" ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
      {value}
    </span>
  )
}
