"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { useAnimatedCounter } from "@/hooks/use-animated-counter"

function AnimatedMetric({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const count = useAnimatedCounter(value)
  return (
    <span className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  )
}

export function HeroMetric() {
  return (
    <div>
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-success animate-pulse-dot" />
        <span className="text-[10px] text-muted-foreground tabular-nums">Updated 34s ago</span>
      </div>
      <div className="rounded-2xl bg-card">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border/50">
          {/* Left: Pipeline */}
          <div className="p-5 lg:col-span-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Today&apos;s Pipeline
            </span>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground tabular-nums tracking-tight">
                <AnimatedMetric value={3200000} prefix="₹" />
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success tabular-nums">
                <TrendingUp className="size-3" strokeWidth={2} />
                +18.2%
              </span>
            </div>

            <div className="my-3 h-px bg-border/40" />

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground">Target</span>
                <span className="text-sm font-semibold text-foreground tabular-nums">₹2.85Cr</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground">Progress</span>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                      style={{ width: "82%" }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-foreground tabular-nums">82%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Forecast, Recovery, Confidence, Conversion */}
          <div className="p-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Forecast</span>
                <span className="text-sm font-semibold text-foreground tabular-nums">
                  <AnimatedMetric value={38000000} prefix="₹" />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Recovered</span>
                <span className="text-sm font-semibold text-success tabular-nums">
                  <AnimatedMetric value={780000} prefix="₹" />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Confidence</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-success tabular-nums">92%</span>
                  <TrendingUp className="size-3 text-success" strokeWidth={2} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Conversion</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-foreground tabular-nums">31%</span>
                  <TrendingUp className="size-3 text-success" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
