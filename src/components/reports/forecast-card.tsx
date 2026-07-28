"use client"

import { cn } from "@/lib/utils"
import type { ForecastPoint } from "@/services/reports/reports.service"

type Props = {
  data: ForecastPoint[]
  className?: string
}

export function ForecastCard({ data, className }: Props) {
  const maxVal = Math.max(...data.map((d) => d.upper))

  const w = 500
  const h = 180
  const pad = { top: 16, right: 16, bottom: 40, left: 56 }
  const chartW = w - pad.left - pad.right
  const chartH = h - pad.top - pad.bottom

  const xScale = (i: number) => pad.left + (i / (data.length - 1)) * chartW
  const yScale = (v: number) => pad.top + chartH - (v / (maxVal * 1.1)) * chartH

  const predLine = data.map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(d.predicted)}`).join(" ")

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
    y: pad.top + chartH - pct * chartH,
    label: `₹${Math.round((maxVal * 1.1 * pct) / 100000)}L`,
  }))

  return (
    <div className={cn("space-y-4", className)}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" aria-label="Revenue forecast chart with confidence interval">
        {/* Grid */}
        {yTicks.map((tick) => (
          <g key={tick.y}>
            <line x1={pad.left} y1={tick.y} x2={w - pad.right} y2={tick.y} stroke="currentColor" className="text-border/50" strokeWidth={1} />
            <text x={pad.left - 8} y={tick.y + 4} textAnchor="end" className="fill-muted-foreground text-[10px] font-medium">
              {tick.label}
            </text>
          </g>
        ))}

        {/* Confidence range bars */}
        {data.map((d, i) => (
          <g key={`conf-${i}`}>
            <line
              x1={xScale(i)}
              y1={yScale(d.lower)}
              x2={xScale(i)}
              y2={yScale(d.upper)}
              stroke="currentColor"
              className="text-primary/20"
              strokeWidth={12}
              strokeLinecap="round"
              opacity={0.15}
            />
            <line
              x1={xScale(i)}
              y1={yScale(d.lower)}
              x2={xScale(i)}
              y2={yScale(d.upper)}
              stroke="currentColor"
              className="text-primary/30"
              strokeWidth={1}
              strokeDasharray="3 2"
            />
          </g>
        ))}

        {/* Predicted line */}
        <path d={predLine} fill="none" stroke="currentColor" className="text-primary" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />

        {/* Points */}
        {data.map((d, i) => (
          <circle key={i} cx={xScale(i)} cy={yScale(d.predicted)} r={3.5} className="fill-primary" stroke="hsl(var(--background))" strokeWidth={2} />
        ))}

        {/* X labels */}
        {data.map((d, i) => (
          <text key={i} x={xScale(i)} y={h - pad.bottom + 18} textAnchor="middle" className="fill-muted-foreground/60 text-[10px]">
            {d.month}
          </text>
        ))}

        <defs />
      </svg>

      {/* Values */}
      <div className="grid grid-cols-4 gap-2">
        {data.map((d, i) => (
          <div key={i} className="text-center">
            <p className="text-[10px] text-muted-foreground">{d.month}</p>
            <p className="text-sm font-bold text-foreground tabular-nums">
              {d.predicted >= 10000000 ? `₹${(d.predicted / 10000000).toFixed(1)}Cr` : `₹${(d.predicted / 100000).toFixed(0)}L`}
            </p>
            <p className="text-[10px] text-muted-foreground/50">
              {d.lower >= 10000000 ? `₹${(d.lower / 10000000).toFixed(1)}Cr` : `₹${(d.lower / 100000).toFixed(0)}L`}
              {" – "}
              {d.upper >= 10000000 ? `₹${(d.upper / 10000000).toFixed(1)}Cr` : `₹${(d.upper / 100000).toFixed(0)}L`}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
