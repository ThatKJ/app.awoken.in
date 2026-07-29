"use client"

import { useEffect, useState } from "react"
import { Sparkles, ArrowRight, RefreshCw } from "lucide-react"

export function AiBrief() {
  const [time, setTime] = useState("12 sec ago")

  useEffect(() => {
    const interval = setInterval(() => {
      setTime("Updated just now")
      setTimeout(() => setTime("12 sec ago"), 2000)
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="group relative overflow-hidden rounded-xl border border-primary/15 bg-primary-light/80 p-4 transition-all duration-150 hover:border-primary/25">
      <div className="flex items-start gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="size-4 text-primary" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">Today&rsquo;s AI Brief</span>
            <span className="flex items-center gap-1 rounded-full bg-success/10 px-1.5 py-0.5 text-[9px] font-medium text-success">
              <span className="size-1.5 rounded-full bg-success animate-pulse" />
              {time}
            </span>
          </div>
          <p className="text-sm font-medium text-foreground">
            <span className="text-primary">Elena</span> identified <span className="font-semibold">3 high-intent buyers</span> worth <span className="font-semibold">₹45L</span>.
          </p>
          <p className="text-[12px] text-muted-foreground mt-0.5">
            All three requested callbacks within the last 2 hours &mdash; pre-qualified, awaiting your review.
          </p>
        </div>
        <button className="group/btn flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-primary transition-all duration-100 hover:bg-primary/10">
          Review now
          <ArrowRight className="size-3 transition-transform duration-100 group-hover/btn:translate-x-0.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
