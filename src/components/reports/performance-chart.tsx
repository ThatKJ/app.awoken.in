"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"

type PerformanceChartProps = {
  data: { name: string; revenue: number; leads: number; conversion: number; roi: number }[]
  className?: string
}

export function PerformanceChart({ data, className }: PerformanceChartProps) {
  const maxRevenue = useMemo(() => Math.max(...data.map((d) => d.revenue)), [data])

  const w = 500
  const h = 200
  const barW = Math.min(36, (w - 40) / data.length - 12)
  const pad = { left: 48, right: 16, top: 12, bottom: 32 }

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
    y: pad.top + (h - pad.top - pad.bottom) * (1 - pct),
    label: `₹${Math.round((maxRevenue * pct * 1.15) / 100000)}L`,
  }))

  return (
    <div className={cn("w-full", className)} aria-label="Worker performance bar chart">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        {/* Grid */}
        {yTicks.map((tick) => (
          <g key={tick.y}>
            <line x1={pad.left} y1={tick.y} x2={w - pad.right} y2={tick.y} stroke="currentColor" className="text-border/50" strokeWidth={1} />
            <text x={pad.left - 8} y={tick.y + 4} textAnchor="end" className="fill-muted-foreground text-[10px] font-medium">
              {tick.label}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const barH = ((d.revenue / (maxRevenue * 1.15)) * (h - pad.top - pad.bottom))
          const x = pad.left + (i * (w - pad.left - pad.right)) / data.length + ((w - pad.left - pad.right) / data.length - barW) / 2
          return (
            <g key={i}>
              <rect
                x={x}
                y={h - pad.bottom - barH}
                width={barW}
                height={barH}
                rx={4}
                className="fill-primary/70 hover:fill-primary transition-colors"
              >
                <title>{d.name}: {d.revenue >= 10000000 ? `₹${(d.revenue / 10000000).toFixed(1)}Cr` : `₹${(d.revenue / 100000).toFixed(0)}L`}</title>
              </rect>
              <text
                x={x + barW / 2}
                y={h - pad.bottom + 16}
                textAnchor="middle"
                className="fill-muted-foreground/70 text-[9px]"
              >
                {d.name.split(" ")[0]}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
