"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Bot, MessageSquare, TrendingUp, Timer, Users } from "lucide-react"

const workers = [
  { name: "Elena", role: "Lead Qualifier", mode: "auto" as const, conversations: 14, confidence: 96, queue: 3, avgTime: "45s", status: "online" as const },
  { name: "Marcus", role: "Conversation Agent", mode: "auto" as const, conversations: 22, confidence: 92, queue: 5, avgTime: "52s", status: "online" as const },
  { name: "Priya", role: "Data Analyst", mode: "supervised" as const, conversations: 8, confidence: 88, queue: 1, avgTime: "1.2m", status: "review" as const },
  { name: "James", role: "Recovery Specialist", mode: "manual" as const, conversations: 5, confidence: 0, queue: 0, avgTime: "—", status: "offline" as const },
  { name: "Aria", role: "Scheduler", mode: "auto" as const, conversations: 18, confidence: 95, queue: 2, avgTime: "38s", status: "online" as const },
]

const modeColors = {
  auto: "bg-primary/10 text-primary",
  supervised: "bg-warning/10 text-warning",
  manual: "bg-muted text-muted-foreground",
}

const statusDot = {
  online: "bg-success",
  review: "bg-warning",
  offline: "bg-muted-foreground/30",
}

const icons = [Bot, MessageSquare, TrendingUp, Timer, Users]

export function WorkforceStrip() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Workforce</h3>
        <span className="text-[10px] text-muted-foreground">5 workers · 4 active</span>
      </div>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-5">
        {workers.map((w, i) => {
          const Icon = icons[i]
          return (
            <motion.div
              key={w.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.025, ease: [0.25, 0.1, 0.25, 1] }}
              className={cn(
                "relative rounded-xl border border-border bg-card px-3 py-2.5",
                "transition-all duration-150 hover:border-foreground/20",
              )}
            >
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-md bg-muted shrink-0">
                  <Icon className="size-3 text-muted-foreground" />
                </div>
                <span className="text-xs font-semibold text-foreground">{w.name}</span>
                <div className="flex items-center gap-0.5 ml-auto">
                  <span className={cn("size-1.5 rounded-full", w.status === "online" && "animate-pulse-dot", statusDot[w.status])} />
                  <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", modeColors[w.mode])}>
                    {w.mode}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
                <span className="tabular-nums">{w.conversations} conv</span>
                {w.confidence > 0 && (
                  <span className={cn("tabular-nums", w.confidence > 90 ? "text-success" : "text-warning")}>
                    {w.confidence}% conf
                  </span>
                )}
                <span className="tabular-nums">{w.queue} queued</span>
                {w.avgTime !== "—" && <span className="tabular-nums">{w.avgTime}/ea</span>}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
