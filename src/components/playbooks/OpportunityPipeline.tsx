"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { opportunityPipelineStages } from "@/data/real-estate-playbook"
import { Button } from "@/components/ui/button"
import type { PipelineStatus } from "@/types"

const STATUS_DOT: Record<PipelineStatus, string> = {
  healthy: "bg-success",
  attention: "bg-warning",
  opportunity: "bg-info",
  risk: "bg-accent",
}

const STATUS_BADGE: Record<PipelineStatus, { className: string; label: string }> = {
  healthy: {
    className: "border-success/10 bg-success-light text-success",
    label: "On Track",
  },
  attention: {
    className: "border-warning/10 bg-warning-light text-warning",
    label: "Needs Attention",
  },
  opportunity: {
    className: "border-info/10 bg-info-light text-info",
    label: "Opportunity",
  },
  risk: {
    className: "border-accent/10 bg-accent/5 text-accent",
    label: "Potential Risk",
  },
}

export function OpportunityPipeline() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const stage = opportunityPipelineStages[selectedIndex]
  const totalStages = opportunityPipelineStages.length

  const handleSelect = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => Math.min(totalStages - 1, prev + 1))
  }, [totalStages])

  const badge = STATUS_BADGE[stage.status]

  return (
    <section aria-labelledby="pipeline-heading">
      {/* Layer 1 — Introduction */}
      <div className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          The Opportunity Flow
        </p>
        <h2
          id="pipeline-heading"
          className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.08] text-text-primary"
        >
          Every opportunity has a journey.
        </h2>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          The question is not only how many inquiries enter your business. It is
          what happens to them after they arrive.
        </p>
      </div>

      {/* Layer 2 — Pipeline Visual */}
      <div
        className="mb-12 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Opportunity pipeline stages"
      >
        <div className="flex items-center">
          {opportunityPipelineStages.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => handleSelect(i)}
                className={cn(
                  "flex flex-col items-center gap-2.5 group cursor-pointer rounded-xl px-1.5 py-1",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                )}
                role="tab"
                aria-selected={i === selectedIndex}
                aria-controls="pipeline-detail-panel"
                tabIndex={i === selectedIndex ? 0 : -1}
              >
                <div
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300",
                    i === selectedIndex
                      ? "border-accent bg-accent text-accent-foreground shadow-sm"
                      : "border-border bg-background text-text-secondary hover:border-text-muted",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                  <span
                    className={cn(
                      "absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-background",
                      STATUS_DOT[s.status],
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-wider transition-colors",
                    i === selectedIndex ? "text-accent" : "text-muted-foreground",
                  )}
                >
                  {s.shortLabel}
                </span>
              </button>

              {i < totalStages - 1 && (
                <div className="mx-2 flex items-center">
                  <ArrowRight
                    className={cn(
                      "h-3.5 w-3.5 transition-colors duration-300",
                      i < selectedIndex ? "text-accent" : "text-border",
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Layer 3 — Detail Panel */}
      <div
        id="pipeline-detail-panel"
        role="tabpanel"
        aria-label={`Stage: ${stage.name}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {/* Stage header */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                {String(totalStages).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                  badge.className,
                )}
              >
                <span
                  className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[stage.status])}
                />
                {badge.label}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.08] text-text-primary">
              {stage.name}
            </h3>

            <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {stage.shortDescription}
            </p>

            <div className="mt-10 space-y-8">
              {/* What Happens */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  What Happens
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-text-primary max-w-prose">
                  {stage.whatHappens}
                </p>
              </div>

              {/* Why It Matters */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Why It Matters
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-text-primary max-w-prose">
                  {stage.whyItMatters}
                </p>
              </div>

              {/* Potential Leak Callout */}
              <div className="rounded-xl border border-accent/10 bg-accent/5 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Potential Opportunity
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-primary">
                  {stage.potentialLeak}
                </p>
                <div className="mt-3 border-t border-accent/10 pt-3">
                  <p className="text-xs font-medium text-text-secondary">
                    Business Impact
                  </p>
                  <p className="mt-0.5 text-sm text-text-secondary">
                    {stage.businessImpact}
                  </p>
                </div>
              </div>

              {/* What the Business May Not See */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  What the Business May Not See
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-text-primary max-w-prose">
                  {stage.whatTheBusinessMayNotSee}
                </p>
              </div>

              {/* Awoken Action */}
              <div className="border-l-2 border-accent pl-4 sm:pl-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Awoken Action
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-text-primary">
                  {stage.awokenAction}
                </p>
              </div>

              {/* Signal */}
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-text-secondary">
                  Signal to watch:{" "}
                </span>
                {stage.signal}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Layer 4 — Navigation */}
        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <div className="text-sm text-muted-foreground">
            Stage {selectedIndex + 1} of {totalStages}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              disabled={selectedIndex === 0}
              aria-label="Previous stage"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              disabled={selectedIndex === totalStages - 1}
              aria-label="Next stage"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
