"use client"

import { cn } from "@/lib/utils"
import type { IntegrationStatus, IntegrationHealth } from "@/services/integrations/integrations.service"

const statusConfig: Record<IntegrationStatus, { label: string; color: string; dot: string }> = {
  connected: { label: "Connected", color: "bg-success/10 text-success border-success/20", dot: "bg-success" },
  disconnected: { label: "Disconnected", color: "bg-muted/30 text-muted-foreground border-muted/20", dot: "bg-muted-foreground" },
  attention: { label: "Attention", color: "bg-warning/10 text-warning border-warning/20", dot: "bg-warning" },
  syncing: { label: "Syncing", color: "bg-info/10 text-info border-info/20", dot: "bg-info" },
  error: { label: "Error", color: "bg-destructive/10 text-destructive border-destructive/20", dot: "bg-destructive" },
  expired: { label: "Expired", color: "bg-destructive/5 text-destructive/70 border-destructive/10", dot: "bg-destructive/50" },
}

const healthConfig: Record<IntegrationHealth, { label: string; dot: string }> = {
  healthy: { label: "Healthy", dot: "bg-success" },
  warning: { label: "Warning", dot: "bg-warning" },
  critical: { label: "Critical", dot: "bg-destructive" },
}

export function IntegrationStatusBadge({ status, size = "sm" }: { status: IntegrationStatus; size?: "sm" | "md" }) {
  const cfg = statusConfig[status]
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border font-medium", size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs", cfg.color)}>
      <span className={cn("size-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  )
}

export function IntegrationHealthIndicator({ health, size = "sm" }: { health: IntegrationHealth; size?: "sm" | "md" }) {
  const cfg = healthConfig[health]
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn("rounded-full", size === "sm" ? "size-1.5" : "size-2", cfg.dot)} />
      <span className={cn("text-muted-foreground", size === "sm" ? "text-[10px]" : "text-xs")}>{cfg.label}</span>
    </div>
  )
}
