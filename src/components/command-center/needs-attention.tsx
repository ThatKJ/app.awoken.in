"use client"

import { WifiOff, AlertCircle, Clock, UserX, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

type Severity = "critical" | "high" | "medium" | "low"

type AlertItem = {
  icon: LucideIcon
  title: string
  detail: string
  time: string
  severity: Severity
}

const items: AlertItem[] = [
  { icon: WifiOff, title: "WhatsApp Disconnected", detail: "API token expired", time: "12m ago", severity: "critical" },
  { icon: AlertCircle, title: "SLA Breach", detail: "Response time exceeded for 2 conversations", time: "30m ago", severity: "high" },
  { icon: Clock, title: "Approval Needed", detail: "3 recovered deals pending", time: "1h ago", severity: "medium" },
  { icon: UserX, title: "Worker Offline", detail: "Recovery Specialist James unavailable since 2h", time: "2h ago", severity: "low" },
]

const severityConfig: Record<Severity, { dot: string; border: string; label: string; labelClass: string }> = {
  critical: { dot: "bg-destructive", border: "border-l-destructive", label: "Critical", labelClass: "bg-destructive/10 text-destructive" },
  high: { dot: "bg-warning", border: "border-l-warning", label: "High", labelClass: "bg-warning/10 text-warning" },
  medium: { dot: "bg-amber-400", border: "border-l-amber-400", label: "Medium", labelClass: "bg-amber-400/10 text-amber-500" },
  low: { dot: "bg-muted-foreground/40", border: "border-l-muted-foreground/30", label: "Info", labelClass: "bg-muted/40 text-muted-foreground" },
}

export function NeedsAttention() {
  return (
    <div>
      <div className="flex items-center justify-center gap-1.5 mb-2.5">
        <AlertCircle className="size-3.5 text-destructive" strokeWidth={2} />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Critical Attention</h3>
        <span className="text-[10px] text-muted-foreground">{items.length}</span>
      </div>
      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const cfg = severityConfig[item.severity]
          const Icon = item.icon
          return (
            <button
              key={item.title}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-all duration-100",
                "border-l-[3px]",
                cfg.border,
                "hover:bg-muted/40",
              )}
            >
              <div className={cn("size-2 rounded-full shrink-0", cfg.dot)} />
              <div className="flex size-5 items-center justify-center rounded-md shrink-0">
                <Icon className="size-3.5" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-xs font-medium text-foreground">{item.title}</span>
                  <span className={cn("rounded-full px-1.5 py-px text-[9px] font-medium", cfg.labelClass)}>
                    {cfg.label}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-px">
                  <p className="text-[11px] text-muted-foreground truncate">{item.detail}</p>
                  <span className="text-[10px] tabular-nums shrink-0 text-muted-foreground/60">{item.time}</span>
                </div>
              </div>
              <ArrowRight className="size-3 text-muted-foreground/0 group-hover:text-muted-foreground/60 transition-colors shrink-0" strokeWidth={2} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
