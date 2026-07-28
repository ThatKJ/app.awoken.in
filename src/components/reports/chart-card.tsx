"use client"

import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Maximize2, Minimize2 } from "lucide-react"

type ChartCardProps = {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  headerAction?: ReactNode
  onExpand?: () => void
}

export function ChartCard({ title, subtitle, children, className, headerAction, onExpand }: ChartCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card transition-all duration-200 hover:border-border/80",
        expanded && "col-span-full",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-3.5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-1">
          {headerAction}
          {onExpand && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
            </button>
          )}
        </div>
      </div>
      <div className={cn("p-5", expanded && "max-h-[600px]")}>{children}</div>
    </div>
  )
}
