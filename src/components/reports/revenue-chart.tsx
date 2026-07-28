"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"

type RevenueChartProps = {
  data: { date: string; revenue: number; pipeline: number; qualified: number }[]
  className?: string
}

export function RevenueChart({ data, className }: RevenueChartProps) {
  const maxVal = useMemo(() => Math.max(...data.map((d) => Math.max(d.revenue, d.pipeline))), [data])

  const w = 700
  const h = 220
  const pad = { top: 20, right: 16, bottom: 32, left: 48 }
  const chartW = w - pad.left - pad.right
  const chartH = h - pad.top - pad.bottom

  const xScale = (i: number) => pad.left + (i / (data.length - 1)) * chartW
  const yScale = (v: number) => pad.top + chartH - (v / maxVal) * chartH

  const revLine = data.map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(d.revenue)}`).join(" ")
  const pipeLine = data.map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(d.pipeline)}`).join(" ")

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
    y: pad.top + chartH - pct * chartH,
    label: `₹${Math.round((maxVal * pct) / 100000)}L`,
  }))

  return (
    <div className={cn("w-full", className)}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" aria-label="Revenue over time chart">
        {/* Grid */}
        {yTicks.map((tick) => (
          <g key={tick.y}>
            <line x1={pad.left} y1={tick.y} x2={w - pad.right} y2={tick.y} stroke="currentColor" className="text-border/50" strokeWidth={1} />
            <text x={pad.left - 8} y={tick.y + 4} textAnchor="end" className="fill-muted-foreground text-[10px] font-medium">
              {tick.label}
            </text>
          </g>
        ))}

        {/* Pipeline area */}
        <path
          d={`${pipeLine} L${xScale(data.length - 1)},${pad.top + chartH} L${xScale(0)},${pad.top + chartH} Z`}
          fill="url(#pipelineGrad)"
          opacity={0.15}
        />
        <path d={pipeLine} fill="none" stroke="currentColor" className="text-primary" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {/* Revenue area */}
        <path
          d={`${revLine} L${xScale(data.length - 1)},${pad.top + chartH} L${xScale(0)},${pad.top + chartH} Z`}
          fill="url(#revenueGrad)"
          opacity={0.12}
        />
        <path d={revLine} fill="none" stroke="currentColor" className="text-success" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />

        {/* X-axis labels */}
        {data.filter((_, i) => i % 2 === 0 || i === data.length - 1).map((d, i) => (
          <text
            key={i}
            x={xScale(data.indexOf(d))}
            y={h - pad.bottom + 18}
            textAnchor="middle"
            className="fill-muted-foreground/60 text-[10px]"
          >
            {d.date}
          </text>
        ))}

        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" className="text-success" stopOpacity={0.3} />
            <stop offset="100%" stopColor="currentColor" className="text-success" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="pipelineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" className="text-primary" stopOpacity={0.25} />
            <stop offset="100%" stopColor="currentColor" className="text-primary" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2 px-1">
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-sm bg-success" />
          <span className="text-xs text-muted-foreground">Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-sm bg-primary" />
          <span className="text-xs text-muted-foreground">Pipeline</span>
        </div>
      </div>
    </div>
  )
}
