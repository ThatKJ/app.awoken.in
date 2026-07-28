"use client"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

type KpiItem = {
  label: string
  value: string
  subtext?: string
}

type WorkerKpiProps = {
  items: KpiItem[]
  className?: string
}

export function WorkerKpi({ items, className }: WorkerKpiProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-outline bg-outline sm:grid-cols-4", className)}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1 bg-card-bg px-4 py-3">
          <span className="text-xs text-muted-foreground">{item.label}</span>
          <span className="text-lg font-semibold tracking-tight text-foreground">{item.value}</span>
          {item.subtext && <span className="text-[11px] text-muted-foreground">{item.subtext}</span>}
        </div>
      ))}
    </div>
  )
}
