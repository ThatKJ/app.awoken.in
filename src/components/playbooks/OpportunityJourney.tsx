"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { opportunityPipelineStages } from "@/data/real-estate-playbook"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import type { PipelineStatus } from "@/types"

const STATUS_DOT: Record<PipelineStatus, string> = {
  healthy: "bg-success",
  attention: "bg-warning",
  opportunity: "bg-info",
  risk: "bg-accent",
}

const STATUS_BADGE: Record<PipelineStatus, { className: string; label: string }> = {
  healthy: { className: "border-success/10 bg-success-light text-success", label: "On Track" },
  attention: { className: "border-warning/10 bg-warning-light text-warning", label: "Needs Attention" },
  opportunity: { className: "border-info/10 bg-info-light text-info", label: "Opportunity" },
  risk: { className: "border-accent/10 bg-accent/5 text-accent", label: "Potential Risk" },
}

export function OpportunityJourney() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const stage = opportunityPipelineStages[selectedIndex]
  const totalStages = opportunityPipelineStages.length

  const handleSelect = useCallback((index: number) => {
    setSelectedIndex(index)
    setExpandedSection(null)
  }, [])

  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => {
      const next = Math.max(0, prev - 1)
      setExpandedSection(null)
      return next
    })
  }, [])

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => {
      const next = Math.min(totalStages - 1, prev + 1)
      setExpandedSection(null)
      return next
    })
  }, [totalStages])

  const badge = STATUS_BADGE[stage.status]

  const sections = [
    { id: "live-signal", label: "Live Signal", content: stage.shortDescription },
    { id: "the-risk", label: "The Risk", content: stage.potentialLeak },
    { id: "what-awoken-changes", label: "What Awoken Changes", content: stage.awokenAction },
    { id: "key-signals", label: "Key Signals", content: stage.signal },
  ]

  return (
    <section className="border-b border-border py-16 sm:py-20 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Section Header */}
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              The Opportunity Journey
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.08] text-text-primary">
            This is where the opportunity goes.
          </h2>
          <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Each stage represents a moment where the opportunity can progress, stall, or disappear.
          </p>
        </motion.div>

        {/* Pipeline Visual */}
        <div className="mt-10 overflow-x-auto pb-2">
          <div className="flex items-center min-w-[700px]">
            {opportunityPipelineStages.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => handleSelect(i)}
                  className={cn(
                    "flex flex-col items-center gap-2 group cursor-pointer rounded-xl px-1.5 py-1",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  )}
                  aria-label={`Select stage: ${s.name}`}
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

        {/* Detail Panel */}
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mt-10 rounded-xl border border-border bg-background p-6 sm:p-8"
        >
          {/* Stage Header */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Stage {String(selectedIndex + 1).padStart(2, "0")} / {String(totalStages).padStart(2, "0")}
            </span>
            <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold", badge.className)}>
              <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[stage.status])} />
              {badge.label}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
            {stage.name}
          </h3>

          {/* Expandable Inspection Sections */}
          <div className="mt-6 space-y-2">
            {sections.map((section) => {
              const isOpen = expandedSection === section.id
              const isRisk = section.id === "the-risk"
              const isAwoken = section.id === "what-awoken-changes"

              return (
                <div
                  key={section.id}
                  className={cn(
                    "rounded-lg border transition-all duration-200",
                    isOpen && isRisk && "border-accent/20 bg-accent/5",
                    isOpen && isAwoken && "border-accent/20",
                    !isOpen && "border-border hover:border-border-hover",
                  )}
                >
                  <button
                    onClick={() => setExpandedSection(isOpen ? null : section.id)}
                    className="flex w-full items-center justify-between px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        isRisk && isOpen && "text-accent",
                        isAwoken && isOpen && "text-accent",
                        !isOpen && "text-text-primary",
                      )}
                    >
                      {section.label}
                    </span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-90",
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className={cn(
                          "px-4 pb-4 text-sm leading-relaxed",
                          isRisk ? "text-text-primary" : "text-text-secondary",
                        )}>
                          {section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Stage {selectedIndex + 1} of {totalStages}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={goToPrevious} disabled={selectedIndex === 0} aria-label="Previous stage">
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button variant="ghost" size="sm" onClick={goToNext} disabled={selectedIndex === totalStages - 1} aria-label="Next stage">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
