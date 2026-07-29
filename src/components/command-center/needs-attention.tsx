"use client"

import { WifiOff, AlertOctagon, Clock, UserX, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

type Severity = "critical" | "high" | "medium" | "low"

type AlertItem = {
  icon: LucideIcon
  title: string
  subtitle: string
  time: string
  severity: Severity
}

const items: AlertItem[] = [
  { icon: WifiOff, title: "WhatsApp Offline", subtitle: "Token expired", time: "12m", severity: "critical" },
  { icon: AlertOctagon, title: "SLA Breach", subtitle: "Response exceeded for 2 conversations", time: "30m", severity: "high" },
  { icon: Clock, title: "Approval Needed", subtitle: "3 recovered deals pending", time: "1h", severity: "medium" },
]

const severityConfig: Record<Severity, { dot: string; iconColor: string }> = {
  critical: { dot: "bg-destructive", iconColor: "text-destructive" },
  high: { dot: "bg-warning", iconColor: "text-warning" },
  medium: { dot: "bg-amber-400", iconColor: "text-amber-500" },
  low: { dot: "bg-muted-foreground/40", iconColor: "text-muted-foreground" },
}

export function NeedsAttention() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Needs Attention</h3>
        <span className="text-[10px] text-muted-foreground">{items.length} items</span>
      </div>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => {
          const cfg = severityConfig[item.severity]
          const Icon = item.icon
          return (
            <button
              key={item.title}
              className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-all duration-100 hover:bg-destructive/[0.03]"
            >
              <div className={cn("size-2 rounded-full shrink-0", cfg.dot)} />
              <Icon className={cn("size-4 shrink-0", cfg.iconColor)} strokeWidth={2} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground">{item.title}</span>
                  <span className="text-[10px] text-muted-foreground/60 tabular-nums">{item.time}</span>
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{item.subtitle}</p>
              </div>
              <span className="text-[11px] font-medium text-primary/0 group-hover:text-primary transition-colors shrink-0">
                Resolve &rarr;
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
