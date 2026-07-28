"use client"

import { useState } from "react"
import { MoreHorizontal, Plug, Unplug, RefreshCw, Settings, Clock, Wifi } from "lucide-react"
import { cn } from "@/lib/utils"
import { IntegrationStatusBadge, IntegrationHealthIndicator } from "./integration-status"
import type { Integration } from "@/services/integrations/integrations.service"

type Props = {
  integration: Integration
  onSelect: (id: string) => void
  onConnect?: (id: string) => void
  onDisconnect?: (id: string) => void
  onReconnect?: (id: string) => void
}

const categoryLabels: Record<string, string> = {
  communication: "Communication",
  calendar: "Calendar",
  crm: "CRM",
  forms: "Forms",
  automation: "Automation",
  storage: "Storage",
  payments: "Payments",
}

export function IntegrationCard({ integration, onSelect, onConnect, onDisconnect, onReconnect }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const i = integration

  return (
    <div
      onClick={() => onSelect(i.id)}
      className="group relative rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-soft cursor-pointer"
      tabIndex={0}
      role="button"
      aria-label={i.name}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(i.id) } }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex size-10 items-center justify-center rounded-xl font-bold text-sm shrink-0",
            i.status === "disconnected" || i.status === "expired" ? "bg-muted/30 text-muted-foreground" : "bg-primary/10 text-primary",
          )}>
            {i.logo}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">{i.name}</p>
              {i.webhookStatus === "failing" && <Wifi className="size-3 text-destructive" />}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">{categoryLabels[i.category]}</p>
          </div>
        </div>
        <IntegrationStatusBadge status={i.status} />
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{i.description}</p>

      {/* Health + Last Sync */}
      <div className="flex items-center justify-between text-xs mb-3">
        <IntegrationHealthIndicator health={i.health} />
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="size-3" />
          {i.lastSync}
        </div>
      </div>

      {/* Workers */}
      {i.workers.length > 0 && (
        <div className="flex items-center gap-1.5 pt-3 border-t border-border/40">
          <span className="text-[10px] text-muted-foreground">Workers</span>
          <div className="flex -space-x-1.5">
            {i.workers.slice(0, 4).map((w) => (
              <div
                key={w.id}
                className={cn(
                  "flex size-5 items-center justify-center rounded-full text-[7px] font-bold border border-background",
                  w.status === "using" ? "bg-primary/15 text-primary" : w.status === "idle" ? "bg-muted/30 text-muted-foreground" : "bg-muted/10 text-muted-foreground/30",
                )}
                title={`${w.name} (${w.status})`}
              >
                {w.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
            ))}
            {i.workers.length > 4 && <span className="text-[9px] text-muted-foreground ml-1">+{i.workers.length - 4}</span>}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/40">
        {i.status === "disconnected" || i.status === "expired" ? (
          <button
            onClick={(e) => { e.stopPropagation(); onConnect?.(i.id) }}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[10px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plug className="size-3" />
            Connect
          </button>
        ) : (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onReconnect?.(i.id) }}
              className="flex items-center gap-1.5 rounded-lg bg-muted/30 px-3 py-1.5 text-[10px] font-medium text-foreground hover:bg-muted/50 transition-colors"
            >
              <RefreshCw className="size-3" />
              Reconnect
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDisconnect?.(i.id) }}
              className="flex items-center gap-1.5 rounded-lg bg-destructive/5 px-3 py-1.5 text-[10px] font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <Unplug className="size-3" />
              Disconnect
            </button>
          </>
        )}
      </div>
    </div>
  )
}
