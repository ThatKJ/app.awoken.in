"use client"

import { cn } from "@/lib/utils"
import { Bot, CheckSquare, MessageSquare, DollarSign, Users } from "lucide-react"

const items = [
  { icon: Bot, label: "Workers Active", value: "4", detail: "of 5 online", live: true },
  { icon: CheckSquare, label: "Tasks Today", value: "41", detail: "+5% vs yesterday", live: true },
  { icon: MessageSquare, label: "Conversations", value: "12", detail: "+3 today", live: true },
  { icon: DollarSign, label: "Recovered Revenue", value: "₹3.2M", detail: "+12% this week", live: false },
  { icon: Users, label: "Leads Qualified", value: "6", detail: "+2 today", live: true },
]

export function StatusStrip() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.label} className="rounded-xl border border-border bg-card p-3">
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
            <span className="text-[11px] text-muted-foreground tabular-nums">{item.detail}</span>
          </div>
        )
      })}
    </div>
  )
}
