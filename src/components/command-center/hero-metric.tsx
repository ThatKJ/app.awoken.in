"use client"

import { useState, useEffect } from "react"
import { TrendingUp, ArrowUpRight } from "lucide-react"
import { useAnimatedCounter } from "@/hooks/use-animated-counter"
import { Button } from "@/components/ui/button"
import { HeroTicker } from "@/components/command-center/hero-ticker"

function compactCurrency(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`
  if (value >= 1000000) return `₹${(value / 1000000).toFixed(2)}M`
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`
  return `₹${value}`
}

function AnimatedMetric({
  value,
  formatter,
}: {
  value: number
  formatter: (v: number) => string
}) {
  const count = useAnimatedCounter(value)
  return <>{formatter(count)}</>
}

function Sparkline({ data, color = "text-muted-foreground/40" }: { data: number[]; color?: string }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = 40
  const h = 14
  const points = data
    .map((v, i) => `${((i / (data.length - 1)) * w).toFixed(1)},${(h - ((v - min) / range) * h * 0.8 - h * 0.1).toFixed(1)}`)
    .join(" ")

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`w-10 h-3.5 ${color} shrink-0`} aria-hidden="true">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

const forecastData = [3.1, 3.3, 3.5, 3.4, 3.6, 3.7, 3.8]
const recoveryData = [4.2, 5.1, 5.8, 6.3, 6.8, 7.2, 7.8]
const confidenceData = [85, 87, 88, 90, 91, 91, 92]
const conversionData = [24, 26, 25, 28, 29, 30, 31]

type MetricRowProps = {
  label: string
  value: number
  formatter: (v: number) => string
  sparklineData: number[]
  sparklineColor?: string
  personality?: string
  delay: number
}

function MetricRow({ label, value, formatter: fmt, sparklineData, sparklineColor, personality, delay }: MetricRowProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) {
    return (
      <div className="space-y-1 text-center" style={{ minHeight: 52 }}>
        <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
        <p className="text-sm text-muted-foreground/30 animate-pulse">&hellip;</p>
      </div>
    )
  }

  return (
    <div className="space-y-1 text-center">
      <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
      <p className="text-lg font-bold text-foreground tabular-nums tracking-tight">
        <AnimatedMetric value={value} formatter={fmt} />
      </p>
      <div className="flex items-center justify-center gap-2">
        <Sparkline data={sparklineData} color={sparklineColor} />
        {personality && (
          <span className="text-[10px] text-muted-foreground/60">{personality}</span>
        )}
      </div>
    </div>
  )
}

export function HeroMetric() {
  return (
    <div
      className="rounded-[24px] bg-card shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md hover:border-foreground/20"
      style={{ background: "linear-gradient(180deg, #FFFFFF, #FCFCFC)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-0">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Today&apos;s Pipeline
        </span>
        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground">
          View Pipeline
          <ArrowUpRight className="size-3" strokeWidth={2} />
        </Button>
      </div>

      {/* Pipeline value + LIVE */}
      <div className="px-6 pt-4 pb-0 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-4">
            <span className="text-[32px] font-bold text-foreground tabular-nums tracking-[-0.04em] leading-none">
              <AnimatedMetric value={3200000} formatter={(v) => compactCurrency(v)} />
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success tabular-nums">
              <TrendingUp className="size-3" strokeWidth={2} />
              ↗ +18.2% Today
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-success animate-pulse-dot" />
            <span className="text-xs font-semibold text-foreground">LIVE</span>
          </div>
        </div>
        <span className="block mt-1 text-[10px] text-muted-foreground/60 tabular-nums">
          Updated 34s ago &bullet; Syncing every 15s
        </span>
      </div>

      {/* Progress bar */}
      <div className="px-6 pt-5 pb-0 text-center">
        <div className="mb-1.5">
          <span className="text-[11px] text-muted-foreground">Target: ₹2.85Cr</span>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <span className="text-sm font-semibold text-foreground tabular-nums">82%</span>
            <span className="rounded-full bg-success/10 px-1.5 py-px text-[9px] font-medium text-success">
              On Track
            </span>
          </div>
        </div>
        <div className="mx-auto h-1.5 max-w-[400px] overflow-hidden rounded-full bg-muted/60 relative">
          <div
            className="relative h-full rounded-full bg-primary transition-all duration-1000 ease-out overflow-hidden"
            style={{ width: "82%" }}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>

      {/* Metric grid */}
      <div className="grid grid-cols-4 gap-6 px-6 pt-5 pb-3">
        <MetricRow
          label="Forecast"
          value={38000000}
          formatter={(v) => compactCurrency(v)}
          sparklineData={forecastData}
          sparklineColor="text-primary/40"
          personality="Above target"
          delay={0}
        />
        <MetricRow
          label="Recovered"
          value={780000}
          formatter={(v) => compactCurrency(v)}
          sparklineData={recoveryData}
          sparklineColor="text-success/40"
          personality="↑ 14% vs last week"
          delay={80}
        />
        <MetricRow
          label="AI Confidence"
          value={92}
          formatter={(v) => `${v}%`}
          sparklineData={confidenceData}
          sparklineColor="text-primary/40"
          personality="Very High"
          delay={160}
        />
        <MetricRow
          label="Conversion"
          value={31}
          formatter={(v) => `${v}%`}
          sparklineData={conversionData}
          sparklineColor="text-muted-foreground/40"
          personality="Stable"
          delay={240}
        />
      </div>

      {/* Ticker */}
      <div className="border-t border-border/40 mt-1">
        <HeroTicker />
      </div>
    </div>
  )
}
