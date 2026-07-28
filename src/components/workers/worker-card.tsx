"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

type WorkerCardProps = {
  name: string
  type: string
  icon: LucideIcon
  color: string
  activity: string
  health: "healthy" | "attention" | "issue"
  progress?: { value: number; label: string }
  kpis: { label: string; value: string }[]
  onClick?: () => void
}

const healthConfig = {
  healthy: { dot: "bg-success", text: "text-success", ring: "ring-success/20" },
  attention: { dot: "bg-warning", text: "text-warning", ring: "ring-warning/20" },
  issue: { dot: "bg-destructive", text: "text-destructive", ring: "ring-destructive/20" },
}

export function WorkerCard({
  name,
  type,
  icon: Icon,
  color,
  activity,
  health,
  progress,
  kpis,
  onClick,
}: WorkerCardProps) {
  const hc = healthConfig[health]

  return (
    <Card
      onClick={onClick}
      className={cn(
        "group relative flex cursor-pointer flex-col gap-0 p-5",
        "rounded-2xl border bg-card shadow-soft",
        "transition-all duration-180 ease-out",
        "hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(249,115,22,0.08)] hover:border-orange-500/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
      tabIndex={0}
      role="button"
      aria-label={`${name} ${type}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.()
      }}
    >
      {/* Row 1: Icon + Name + Type */}
      <div className="flex items-start gap-4">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}12` }}
        >
          <Icon className="size-6" style={{ color }} strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-foreground leading-snug">{name}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{type}</p>
        </div>
      </div>

      {/* Row 2: Health */}
      <div className="mt-4 flex items-center gap-1.5">
        <span className={cn("size-2 rounded-full", hc.dot, health === "healthy" && "animate-pulse-dot")} />
        <span className={cn("text-sm font-medium", hc.text)}>
          {health === "healthy" ? "Healthy" : health === "attention" ? "Attention" : "Issue"}
        </span>
      </div>

      {/* Row 3: Current task */}
      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60 mb-1">
          Currently
        </p>
        <p className="text-sm text-foreground leading-relaxed">{activity}</p>
      </div>

      {/* Row 4: Progress */}
      {progress && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60">
              {progress.label}
            </p>
            <span className="text-xs font-semibold text-foreground">{Math.round(progress.value)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted/50 overflow-hidden">
            <div
              className="h-full rounded-full animate-progress-fill transition-all duration-700 ease-out"
              style={{ width: `${progress.value}%`, backgroundColor: color }}
            />
          </div>
        </div>
      )}

      {/* Row 5: KPIs */}
      {kpis.length > 0 && (
        <>
          <div className="my-4 h-px bg-border/40" />
          <div className="grid grid-cols-2 gap-4">
            {kpis.map((kpi) => (
              <div key={kpi.label}>
                <p className="text-lg font-bold text-foreground leading-tight">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  )
}
