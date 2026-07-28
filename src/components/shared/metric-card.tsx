"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type MetricCardProps = {
  label: string
  value: string | number
  icon?: LucideIcon
  trend?: { direction: "up" | "down" | "neutral"; value: string }
  variant?: "default" | "success" | "warning" | "danger" | "info"
  loading?: boolean
  onClick?: () => void
  className?: string
}

const trendColors = {
  default: "text-success",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
  info: "text-info",
}

export function MetricCard({ label, value, icon: Icon, trend, variant = "default", loading, onClick, className }: MetricCardProps) {
  if (loading) {
    return (
      <Card className={cn("flex flex-col gap-2 p-4", className)}>
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-3 w-16" />
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        "flex flex-col gap-1.5 p-4",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick() } : undefined}
      role={onClick ? "button" : undefined}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        {Icon && <Icon className="size-3.5 text-muted-foreground/60" />}
      </div>
      <div className="flex items-baseline gap-2">
        <span className={cn("text-xl font-semibold tracking-tight tabular-nums", trendColors[variant])}>{value}</span>
        {trend && (
          <span className={cn("text-xs tabular-nums", trend.direction === "up" ? "text-success" : trend.direction === "down" ? "text-destructive" : "text-muted-foreground")}>
            {trend.direction === "up" && "↑"} {trend.direction === "down" && "↓"} {trend.value}
          </span>
        )}
      </div>
    </Card>
  )
}
