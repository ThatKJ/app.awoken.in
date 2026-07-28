"use client"

import { cn } from "@/lib/utils"

type WorkerQueueProps = {
  count: number
  label: string
}

export function WorkerQueue({ count, label }: WorkerQueueProps) {
  return (
    <div className="flex items-baseline gap-1">
      <span
        className={cn(
          "text-lg font-semibold tracking-tight",
          count > 0 ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {count}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
