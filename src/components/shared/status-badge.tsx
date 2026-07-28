"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const variantMap: Record<string, "success" | "warning" | "danger" | "info" | "neutral"> = {
  active: "success",
  idle: "neutral",
  paused: "warning",
  off: "danger",
  healthy: "success",
  attention: "warning",
  issue: "danger",
  completed: "success",
  failed: "danger",
  pending: "warning",
  queued: "info",
}

const dotColors: Record<string, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
  info: "bg-info",
  neutral: "bg-muted-foreground",
}

const labels: Record<string, string> = {
  active: "Active", idle: "Idle", paused: "Paused", off: "Off",
  healthy: "Healthy", attention: "Attention Needed", issue: "Issue",
  completed: "Completed", failed: "Failed", pending: "Pending", queued: "Queued",
}

type StatusBadgeProps = {
  variant?: keyof typeof variantMap
  label?: string
  className?: string
}

export function StatusBadge({ variant = "idle", label, className }: StatusBadgeProps) {
  const badgeVariant = variantMap[variant] ?? "neutral"
  return (
    <Badge variant={badgeVariant} className={cn("gap-1.5 pl-1.5", className)}>
      <span className={cn("size-1.5 rounded-full", dotColors[badgeVariant])} />
      {label ?? labels[variant] ?? variant}
    </Badge>
  )
}

export function HealthIndicator({ variant = "healthy" }: { variant?: "healthy" | "attention" | "issue" }) {
  return <StatusBadge variant={variant} />
}
