"use client"

import { TrendingUp } from "lucide-react"

export function HeroMetric() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Today&apos;s Pipeline
          </span>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground tabular-nums tracking-tight">₹3.2M</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success tabular-nums">
              <TrendingUp className="size-3" strokeWidth={2.5} />
              +18.2%
            </span>
          </div>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground">Target</span>
              <span className="text-[11px] font-semibold text-foreground tabular-nums">₹2.85Cr</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground">Progress</span>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: "82%" }} />
                </div>
                <span className="text-[11px] font-semibold text-foreground tabular-nums">82%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2.5 py-1">
          <span className="size-1.5 rounded-full bg-success animate-pulse-dot" />
          <span className="text-[10px] font-medium text-muted-foreground">Live</span>
        </div>
      </div>
    </div>
  )
}
