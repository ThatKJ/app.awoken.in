"use client"

import { useEffect, useState } from "react"
import { Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

function AnimatedValue({ value, className }: { value: string; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {value}
    </motion.span>
  )
}

export function AiBrief() {
  const [seconds, setSeconds] = useState(12)

  useEffect(() => {
    const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/10 bg-gradient-to-br from-primary-light/90 via-primary-light/60 to-transparent transition-all duration-150 hover:border-primary/20">
      {/* Header */}
      <div className="px-7 pt-6 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="size-4 text-primary" strokeWidth={2} />
            <span className="text-xs font-semibold text-foreground/70">AI Brief</span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-medium text-success tabular-nums">
            <span className="size-1.5 rounded-full bg-success animate-pulse-dot" />
            Updated {seconds}s ago
          </span>
        </div>
        <p className="text-sm font-medium text-foreground/90 leading-relaxed mt-2.5">
          <span className="text-primary font-semibold">3 buyers</span> became high intent. Worth{" "}
          <span className="font-semibold">₹45L</span> overnight.
        </p>
      </div>

      {/* Metrics strip */}
      <div className="px-7 pt-5 pb-5">
        <div className="flex items-stretch divide-x divide-border/20">
          {/* Potential Revenue */}
          <div className="flex-1 flex flex-col pr-8">
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">Potential Revenue</span>
            <AnimatedValue value="₹11.2L" className="text-[28px] font-bold text-foreground tabular-nums mt-1 leading-none" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="text-[13px] text-success mt-1.5 font-medium tabular-nums"
            >
              ↑ +12% vs average
            </motion.span>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="group/cta flex items-center gap-1 mt-3 text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              Review Leads
              <ArrowRight className="size-3 transition-transform duration-100 group-hover/cta:translate-x-0.5" strokeWidth={2} />
            </motion.button>
          </div>

          {/* Callbacks */}
          <div className="flex-1 flex flex-col px-8">
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">Callbacks</span>
            <AnimatedValue value="3" className="text-[24px] font-bold text-foreground tabular-nums mt-1 leading-none" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="text-[13px] text-muted-foreground mt-1.5"
            >
              3 waiting
            </motion.span>
          </div>

          {/* Confidence */}
          <div className="flex-1 flex flex-col px-8">
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">Confidence</span>
            <div className="mt-1 flex items-baseline gap-2">
              <AnimatedValue value="94%" className="text-[24px] font-bold text-foreground tabular-nums leading-none" />
              <span className="text-[13px] text-muted-foreground font-medium">Very High</span>
            </div>
            <div className="w-full h-0.5 mt-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                className="h-full rounded-full bg-success"
              />
            </div>
          </div>

          {/* Deadline */}
          <div className="flex-1 flex flex-col pl-8">
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">Review before</span>
            <AnimatedValue value="4 PM" className="text-[24px] font-bold text-foreground tabular-nums mt-1 leading-none" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="text-[13px] text-muted-foreground mt-1.5"
            >
              Today
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  )
}
