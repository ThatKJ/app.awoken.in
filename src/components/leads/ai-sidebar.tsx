"use client"

import { Sparkles, TrendingUp, AlertTriangle, RotateCcw, ArrowRight, Bot, MessageSquare, Target } from "lucide-react"
import { cn } from "@/lib/utils"

const insights = [
  { label: "Hot Leads", value: "3", valueLabel: "Ready to close", color: "text-success", icon: TrendingUp },
  { label: "Need Review", value: "2", valueLabel: "Pending decision", color: "text-warning", icon: AlertTriangle },
  { label: "Recoverable", value: "₹1.8Cr", valueLabel: "4 opportunities", color: "text-primary", icon: RotateCcw },
]

const recommendations = [
  { text: "Call Rahul today", detail: "High intent, 92% confidence", priority: "high" as const },
  { text: "Recover Amit Singh", detail: "Campaign #18 completed", priority: "medium" as const },
  { text: "WhatsApp Vikram", detail: "Follow-up due today", priority: "medium" as const },
]

const activity = [
  { icon: Bot, text: "Elena qualified Priya Sharma", time: "2m ago" },
  { icon: MessageSquare, text: "Marcus replied to Rajesh", time: "15m ago" },
  { icon: Target, text: "Priya detected anomaly", time: "32m ago" },
]

export function AiSidebar() {
  return (
    <aside className="flex flex-col gap-5">
      {/* AI Insights */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="size-3.5 text-primary" strokeWidth={2} />
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">AI Insights</h3>
          <div className="h-px flex-1 bg-border/30" />
        </div>
        <div className="flex flex-col gap-1.5">
          {insights.map((i) => {
            const Icon = i.icon
            return (
              <div key={i.label} className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-muted/30">
                <div className="flex items-center gap-2.5">
                  <Icon className={cn("size-4", i.color)} strokeWidth={2} />
                  <span className="text-xs text-muted-foreground">{i.label}</span>
                </div>
                <div className="text-right">
                  <span className={cn("text-sm font-semibold tabular-nums", i.color)}>{i.value}</span>
                  <span className="text-[10px] text-muted-foreground/60 ml-1.5">{i.valueLabel}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* AI Recommendations */}
      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2.5">Recommendations</h3>
        <div className="flex flex-col gap-1">
          {recommendations.map((r) => (
            <button
              key={r.text}
              className="group flex items-center justify-between rounded-lg px-3 py-2 text-left transition-all duration-100 hover:bg-primary/[0.03]"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "size-1.5 rounded-full shrink-0",
                    r.priority === "high" ? "bg-destructive" : "bg-primary"
                  )} />
                  <span className="text-xs font-medium text-foreground">{r.text}</span>
                </div>
                <p className="text-[10px] text-muted-foreground/60 ml-3.5">{r.detail}</p>
              </div>
              <ArrowRight className="size-3 text-primary/0 transition-colors group-hover:text-primary shrink-0" strokeWidth={2} />
            </button>
          ))}
        </div>
      </div>

      {/* Recent AI Activity */}
      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2.5">AI Activity</h3>
        <div className="flex flex-col gap-0">
          {activity.map((a) => {
            const Icon = a.icon
            return (
              <div key={a.text} className="flex items-start gap-2.5 rounded-lg px-3 py-1.5">
                <Icon className="size-3 text-muted-foreground/50 mt-0.5 shrink-0" strokeWidth={2} />
                <div className="min-w-0">
                  <p className="text-[12px] text-foreground leading-snug truncate">{a.text}</p>
                  <span className="text-[10px] text-muted-foreground/50 tabular-nums">{a.time}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
