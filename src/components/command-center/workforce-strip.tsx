"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const statusCycles = [
  "Thinking...",
  "Scanning CRM...",
  "Drafting response...",
  "Processing...",
  "Analyzing data...",
]

const workers = [
  { name: "Elena", status: "online" as const, utilization: 88, confidence: 96, handled: 14, queued: 3, avgTime: "45s" },
  { name: "Marcus", status: "online" as const, utilization: 92, confidence: 92, handled: 22, queued: 5, avgTime: "52s" },
  { name: "Priya", status: "review" as const, utilization: 65, confidence: 88, handled: 8, queued: 1, avgTime: "1.2m" },
  { name: "James", status: "offline" as const, utilization: 0, confidence: 0, handled: 5, queued: 0, avgTime: "—" },
  { name: "Aria", status: "online" as const, utilization: 78, confidence: 95, handled: 18, queued: 2, avgTime: "38s" },
]

const activeCount = workers.filter((w) => w.status === "online").length
const idleCount = workers.filter((w) => w.status === "review").length
const avgConfidence = Math.round(workers.reduce((s, w) => s + w.confidence, 0) / workers.length)

function RotatingStatus() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % statusCycles.length), 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="text-[10px] text-success"
    >
      {statusCycles[index]}
    </motion.span>
  )
}

export function WorkforceStrip() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live Workforce</h3>
        <span className="text-[10px] text-muted-foreground tabular-nums">{activeCount} Active</span>
        <span className="text-[10px] text-muted-foreground/50">&middot;</span>
        <span className="text-[10px] text-muted-foreground tabular-nums">{idleCount} Idle</span>
        <span className="text-[10px] text-muted-foreground/50">&middot;</span>
        <span className="text-[10px] text-muted-foreground tabular-nums">{avgConfidence}% Avg</span>
      </div>
      <div className="flex flex-col gap-1">
        {workers.map((w, i) => (
          <motion.div
            key={w.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-100 hover:bg-muted/30"
          >
            {/* Name + Dot */}
            <div className="flex items-center gap-2 min-w-[90px]">
              <span
                className={cn(
                  "size-2 rounded-full shrink-0",
                  w.status === "online" && "bg-success animate-pulse-dot",
                  w.status === "review" && "bg-warning",
                  w.status === "offline" && "bg-muted-foreground/30",
                )}
              />
              <span className="text-sm font-medium text-foreground">{w.name}</span>
            </div>

            {/* Utilization bar */}
            <div className="flex-1 max-w-[120px]">
              {w.status !== "offline" ? (
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${w.utilization}%` }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.03, ease: "easeOut" }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              ) : (
                <span className="text-[10px] text-muted-foreground/50">Offline</span>
              )}
            </div>

            {/* Status text - cycles for online workers */}
            <div className="w-[120px] text-right">
              {w.status === "online" && <RotatingStatus />}
              {w.status === "review" && <span className="text-[10px] text-warning">Reviewing</span>}
              {w.status === "offline" && <span className="text-[10px] text-muted-foreground/50">Unavailable</span>}
            </div>

            {/* Compact stats - visible on hover */}
            <div className="hidden group-hover:flex items-center gap-2 text-[10px] text-muted-foreground tabular-nums ml-auto">
              <span>{w.handled}</span>
              <span className="text-muted-foreground/40">/</span>
              <span>{w.queued}q</span>
              <span className="text-muted-foreground/40">&middot;</span>
              <span>{w.avgTime}</span>
              <span className="text-muted-foreground/40">&middot;</span>
              <span className={cn(w.confidence > 90 ? "text-success" : "text-warning")}>{w.confidence}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
