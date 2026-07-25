"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { recoveryScenario, recoverySequenceSteps } from "@/data/real-estate-playbook"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"

export function RecoverySequence() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [completed, setCompleted] = useState(false)

  const handleStepClick = useCallback((index: number) => {
    if (completed) return
    if (activeStep === index) {
      setActiveStep(null)
    } else {
      setActiveStep(index)
    }
  }, [activeStep, completed])

  const handleComplete = useCallback(() => {
    setCompleted(true)
    setActiveStep(null)
  }, [])

  const handleReset = useCallback(() => {
    setCompleted(false)
    setActiveStep(null)
  }, [])

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
            Recovery Investigation
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.08] text-text-primary">
            Not every lost opportunity is truly lost.
          </h2>
          <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            A previous opportunity has been inactive for 42 days. The business may assume it is gone. Awoken asks a different question.
          </p>
        </motion.div>

        {/* Inactive Lead Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-10 rounded-xl border border-border bg-background p-6 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Previous Opportunity
                </span>
                <span className="rounded-full border border-warning/10 bg-warning-light px-2 py-0.5 text-[10px] font-semibold text-warning">
                  {recoveryScenario.daysInactive} days inactive
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                {recoveryScenario.leadName}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {recoveryScenario.previousInterest} · Last interaction: {recoveryScenario.lastInteraction}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-muted-foreground">Potential</p>
              <p className="text-sm font-semibold text-warning">Recoverable</p>
            </div>
          </div>
        </motion.div>

        {/* Recovery Sequence */}
        <div className="mt-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Investigation Steps
          </p>
          {recoverySequenceSteps.map((step, index) => {
            const isActive = activeStep === index
            const isDone = completed || (activeStep !== null && index < activeStep)

            return (
              <div
                key={step.id}
                className={cn(
                  "rounded-lg border transition-all duration-200 cursor-pointer",
                  isDone && "border-success/20 bg-success/5",
                  isActive && !completed && "border-accent/20 bg-accent/5",
                  !isActive && !isDone && "border-border hover:border-border-hover bg-background",
                )}
                onClick={() => handleStepClick(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleStepClick(index)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
              >
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                      isDone && "bg-success text-white",
                      isActive && !completed && "bg-accent text-accent-foreground",
                      !isActive && !isDone && "bg-surface text-text-secondary",
                    )}
                  >
                    {isDone ? (
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={cn(
                      "text-sm font-semibold",
                      isDone && "text-success",
                      isActive && !completed && "text-accent",
                      !isActive && !isDone && "text-text-primary",
                    )}>
                      {step.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.shortDescription}
                    </p>
                  </div>
                  <ChevronRight className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0",
                    isActive && !completed && "rotate-90",
                  )} />
                </div>

                <AnimatePresence initial={false}>
                  {isActive && !completed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border/50 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Purpose
                        </p>
                        <p className="mt-1 text-sm text-text-secondary">
                          {step.purpose}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          {!completed ? (
            <Button
              variant="primary"
              size="sm"
              onClick={handleComplete}
              disabled={activeStep === null}
            >
              Complete Investigation
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-success/20 bg-success/5 px-4 py-2">
                <p className="text-sm font-semibold text-success">
                  Investigation complete — recovery actions identified
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </Button>
            </div>
          )}
        </div>

        {/* Demo Label */}
        <div className="mt-4">
          <p className="text-xs text-muted-foreground">{recoveryScenario.demoLabel}</p>
        </div>
      </Container>
    </section>
  )
}
