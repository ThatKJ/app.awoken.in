"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { opportunityPipelineStages, opportunityLeaks } from "@/data/real-estate-playbook"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import type { SeverityLevel } from "@/types"

const leakStageMap: Record<string, string> = {
  "missed-inquiry": "inquiry",
  "slow-response": "first-response",
  "weak-qualification": "conversation",
  "inconsistent-follow-up": "follow-up",
  "no-property-match": "property-match",
  "viewing-dropoff": "viewing",
  "silent-pipeline": "decision",
}

const severityColor: Record<SeverityLevel, string> = {
  high: "border-accent/30 bg-accent/5",
  medium: "border-warning/30 bg-warning/5",
  low: "border-border bg-background",
}

const severityLabel: Record<SeverityLevel, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
}

export function LeakInterruption() {
  const [selectedLeakId, setSelectedLeakId] = useState<string | null>(null)

  const handleSelect = useCallback((id: string) => {
    setSelectedLeakId((prev) => (prev === id ? null : id))
  }, [])

  const leaksWithStages = opportunityLeaks.map((leak) => ({
    leak,
    stageId: leakStageMap[leak.id] ?? "inquiry",
    stage: opportunityPipelineStages.find((s) => s.id === (leakStageMap[leak.id] ?? "inquiry")),
  }))

  return (
    <section className="border-b border-border py-16 sm:py-20 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Where the journey breaks
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.08] text-text-primary">
            Not every opportunity makes it through.
          </h2>
          <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            The journey looks healthy until you see where opportunities actually disappear. These are the points where the connection between demand and outcome breaks.
          </p>
        </motion.div>

        {/* Leak List */}
        <div className="mt-10 space-y-3">
          {leaksWithStages.map(({ leak, stage }, index) => {
            const isOpen = selectedLeakId === leak.id
            return (
              <motion.div
                key={leak.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div
                  className={cn(
                    "rounded-xl border transition-all duration-200 cursor-pointer",
                    isOpen
                      ? severityColor[leak.severity]
                      : "border-border bg-background hover:border-border-hover",
                  )}
                  onClick={() => handleSelect(leak.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleSelect(leak.id)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <AlertTriangle className={cn(
                        "h-4 w-4 shrink-0",
                        leak.severity === "high" && "text-accent",
                        leak.severity === "medium" && "text-warning",
                        leak.severity === "low" && "text-muted-foreground",
                      )} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-primary truncate">
                          {leak.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {leak.shortDescription}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {stage && (
                        <Badge variant="info" className="hidden sm:inline-flex">
                          {stage.shortLabel}
                        </Badge>
                      )}
                      <span className={cn(
                        "text-[11px] font-semibold",
                        leak.severity === "high" && "text-accent",
                        leak.severity === "medium" && "text-warning",
                        leak.severity === "low" && "text-muted-foreground",
                      )}>
                        {severityLabel[leak.severity]}
                      </span>
                      {isOpen ? (
                        <X className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/50 px-5 py-4 space-y-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              What happens
                            </p>
                            <p className="mt-1 text-sm text-text-primary">{leak.problem}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              What the business may not see
                            </p>
                            <p className="mt-1 text-sm text-text-secondary">{leak.whatTheBusinessMayNotSee}</p>
                          </div>
                          {leak.severity === "high" && (
                            <div className="rounded-lg border border-accent/10 bg-accent/5 px-4 py-3">
                              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                                How Awoken responds
                              </p>
                              <p className="mt-1 text-sm text-text-primary">{leak.awokenRole}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
