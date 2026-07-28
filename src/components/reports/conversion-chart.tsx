"use client"

import { cn } from "@/lib/utils"

type ConversionChartProps = {
  className?: string
}

const stages = [
  { label: "Lead Inbound", value: 312, pct: 100 },
  { label: "Qualified", value: 284, pct: 91 },
  { label: "Appointment", value: 178, pct: 57 },
  { label: "Proposal", value: 98, pct: 31 },
  { label: "Negotiation", value: 52, pct: 17 },
  { label: "Closed Won", value: 28, pct: 9 },
]

export function ConversionChart({ className }: ConversionChartProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {stages.map((stage, i) => (
        <div key={i} className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-foreground font-medium">{stage.label}</span>
            <span className="text-muted-foreground tabular-nums">{stage.value}</span>
          </div>
          <div className="relative h-2 rounded-full bg-muted/50 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
              style={{
                width: `${stage.pct}%`,
                background: i === stages.length - 1
                  ? "linear-gradient(90deg, hsl(var(--success)), hsl(var(--success)))"
                  : "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)/60%))",
              }}
            />
          </div>
          {i < stages.length - 1 && (
            <p className="text-[10px] text-muted-foreground/50 text-right">
              {stage.pct - stages[i + 1].pct}% drop
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
