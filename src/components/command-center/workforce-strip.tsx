"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Bot, MessageSquare, TrendingUp, Timer, Users } from "lucide-react"

const workers = [
  { name: "Elena", status: "online" as const, activity: "Responding to lead", utilization: 88, handled: 14, queued: 3, confidence: 96, avgTime: "45s", mode: "auto" as const },
  { name: "Marcus", status: "online" as const, activity: "Handling conversation", utilization: 92, handled: 22, queued: 5, confidence: 92, avgTime: "52s", mode: "auto" as const },
  { name: "Priya", status: "review" as const, activity: "Reviewing data anomaly", utilization: 65, handled: 8, queued: 1, confidence: 88, avgTime: "1.2m", mode: "supervised" as const },
  { name: "James", status: "offline" as const, activity: "Unavailable", utilization: 0, handled: 5, queued: 0, confidence: 0, avgTime: "—", mode: "manual" as const },
  { name: "Aria", status: "online" as const, activity: "Scheduling visits", utilization: 78, handled: 18, queued: 2, confidence: 95, avgTime: "38s", mode: "auto" as const },
]

const modeColors = {
  auto: "bg-primary/10 text-primary",
  supervised: "bg-warning/10 text-warning",
  manual: "bg-muted text-muted-foreground",
}

const statusIndicator = {
  online: "bg-success",
  review: "bg-warning",
  offline: "bg-muted-foreground/30",
}

const activityColors = {
  online: "text-success",
  review: "text-warning",
  offline: "text-muted-foreground",
}

const icons = [Bot, MessageSquare, TrendingUp, Timer, Users]

export function WorkforceStrip() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live Workforce</h3>
        <span className="text-[10px] text-muted-foreground">5 workers · 4 active</span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">
        {workers.map((w, i) => {
          const Icon = icons[i]
          return (
            <motion.div
              key={w.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.025, ease: [0.25, 0.1, 0.25, 1] }}
              className={cn(
                "rounded-xl border border-border bg-card px-3.5 py-3",
                "transition-all duration-150 hover:border-foreground/20",
              )}
            >
              {/* Status + Activity */}
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full shrink-0", w.status === "online" && "animate-pulse-dot", statusIndicator[w.status])} />
                <div>
                  <span className="text-xs font-semibold text-foreground">{w.name}</span>
                  <span className={cn("text-[10px] ml-1.5 font-medium", activityColors[w.status])}>
                    {w.activity}
                  </span>
                </div>
              </div>

              {/* Utilization bar */}
              {w.status !== "offline" && (
                <div className="mt-2.5">
                  <div className="h-1 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${w.utilization}%` }}
                      transition={{ duration: 0.6, delay: 0.1 + i * 0.025, ease: "easeOut" }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              )}

              {/* Metrics row */}
              <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground flex-wrap">
                <span className="tabular-nums">{w.handled} handled</span>
                <span className="tabular-nums">{w.queued} queued</span>
                {w.confidence > 0 && (
                  <span className={cn("tabular-nums", w.confidence > 90 ? "text-success" : "text-warning")}>
                    {w.confidence}%
                  </span>
                )}
                {w.avgTime !== "—" && <span className="tabular-nums">{w.avgTime}</span>}
              </div>

              {/* Mode badge */}
              <div className="mt-1.5">
                <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", modeColors[w.mode])}>
                  {w.mode.toUpperCase()}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
