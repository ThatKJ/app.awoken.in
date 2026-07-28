"use client"

import { cn } from "@/lib/utils"

type WorkerHealthProps = {
  level: "healthy" | "attention" | "issue"
}

const config = {
  healthy: {
    dot: "bg-success",
    label: "Healthy",
    labelClass: "text-success",
  },
  attention: {
    dot: "bg-warning",
    label: "Attention Needed",
    labelClass: "text-warning",
  },
  issue: {
    dot: "bg-destructive",
    label: "Issue",
    labelClass: "text-destructive",
  },
}

export function WorkerHealth({ level }: WorkerHealthProps) {
  const c = config[level]
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("size-2 rounded-full", c.dot)} />
      <span className={cn("text-[11px] font-medium", c.labelClass)}>{c.label}</span>
    </div>
  )
}
