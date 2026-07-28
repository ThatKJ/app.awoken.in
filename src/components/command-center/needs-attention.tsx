"use client"

import { AlertCircle, WifiOff, Clock, Bot, UserX, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { icon: WifiOff, title: "WhatsApp Disconnected", detail: "API token expired", time: "12m ago", severity: "high" as const },
  { icon: AlertCircle, title: "Approval Required", detail: "3 recovered deals pending", time: "1h ago", severity: "medium" as const },
  { icon: Clock, title: "SLA Breach", detail: "Response time exceeded for 2 conversations", time: "30m ago", severity: "high" as const },
  { icon: UserX, title: "Worker Offline", detail: "Recovery Specialist James unavailable", time: "2h ago", severity: "medium" as const },
]

const severityStyles = {
  high: { dot: "bg-destructive", border: "border-l-destructive/40" },
  medium: { dot: "bg-warning", border: "border-l-warning/40" },
  low: { dot: "bg-info", border: "border-l-info/40" },
}

export function NeedsAttention() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <AlertCircle className="size-3.5 text-destructive" strokeWidth={2} />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Needs Attention</h3>
        </div>
        <span className="text-[10px] text-muted-foreground">{items.length} items</span>
      </div>
      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const style = severityStyles[item.severity]
          const Icon = item.icon
          return (
            <button
              key={item.title}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-all duration-100",
                "border-l-[3px]",
                style.border,
                "hover:bg-muted/40",
              )}
            >
              <div className={cn("size-2 rounded-full shrink-0", style.dot)} />
              <div className="flex size-5 items-center justify-center rounded-md bg-muted shrink-0">
                <Icon className="size-3 text-muted-foreground" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-foreground">{item.title}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <p className="text-[11px] text-muted-foreground truncate">{item.detail}</p>
                  <span className={cn(
                    "text-[10px] tabular-nums shrink-0",
                    item.severity === "high" ? "text-destructive" : "text-warning",
                  )}>
                    {item.time}
                  </span>
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
