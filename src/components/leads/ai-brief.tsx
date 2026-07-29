"use client"

import { useEffect, useState } from "react"
import { Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const metrics = [
  { label: "Revenue if approved", value: "₹11.2L", sub: "+12% vs avg" },
  { label: "Calls requested", value: "3", sub: "Last 2 hours" },
  { label: "Confidence", value: "94%", sub: "Across all 3" },
  { label: "Deadline", value: "4PM", sub: "Today" },
]

export function AiBrief() {
  const [seconds, setSeconds] = useState(12)

  useEffect(() => {
    const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/10 bg-gradient-to-br from-primary-light/90 via-primary-light/60 to-transparent p-5 transition-all duration-150 hover:border-primary/20">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" strokeWidth={2} />
          <span className="text-xs font-semibold text-foreground/70">AI Brief</span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-medium text-success tabular-nums">
          <span className="size-1.5 rounded-full bg-success animate-pulse-dot" />
          Updated {seconds}s ago
        </span>
      </div>

      <p className="text-sm font-medium text-foreground/90 leading-relaxed">
        <span className="text-primary font-semibold">3 buyers</span> became high intent. Worth{" "}
        <span className="font-semibold">₹45L</span> overnight.
      </p>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg bg-white/40 px-3 py-2">
            <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/60">{m.label}</span>
            <p className="text-sm font-semibold text-foreground tabular-nums mt-0.5">{m.value}</p>
            <span className="text-[9px] text-muted-foreground/50">{m.sub}</span>
          </div>
        ))}
      </div>

      <button className="mt-3 flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80">
        Review now
        <ArrowRight className="size-3" strokeWidth={2} />
      </button>
    </div>
  )
}
