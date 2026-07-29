"use client"

import { cn } from "@/lib/utils"
import { Bot, Wifi, Timer, ShieldCheck, TrendingUp } from "lucide-react"

const items = [
  { icon: Bot, label: "Workers", value: "4/5", note: "operational", live: true, trend: "up" as const },
  { icon: Wifi, label: "Integrations", value: "6", note: "connected", live: true, trend: "up" as const },
  { icon: Timer, label: "Response Time", value: "12s", note: "avg today", live: true, trend: "down" as const },
  { icon: ShieldCheck, label: "SLA", value: "98.5%", note: "last 24h", live: false, trend: "up" as const },
  { icon: TrendingUp, label: "Revenue Recovery", value: "₹3.2M", note: "+12% this week", live: false, trend: "up" as const },
]

export function StatusStrip() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.label} className={cn("rounded-xl bg-card p-3", item.live && "border border-border/40", !item.live && "")}>
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md bg-muted">
                <Icon className="size-3 text-muted-foreground" strokeWidth={2} />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                {item.label}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <p className="text-xl font-bold text-foreground tabular-nums tracking-tight">{item.value}</p>
              {item.live && (
                <span className={cn("size-1.5 rounded-full bg-success animate-pulse-dot")} />
              )}
            </div>
            <span className="text-[11px] text-muted-foreground tabular-nums">{item.note}</span>
          </div>
        )
      })}
    </div>
  )
}
