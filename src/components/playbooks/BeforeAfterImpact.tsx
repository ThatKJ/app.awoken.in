"use client"

import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { illustrativeMetrics, awokenSystemSteps } from "@/data/real-estate-playbook"
import { Container } from "@/components/ui/container"
import type { TrendDirection } from "@/types"

const beforeItems = [
  "Missed calls go to voicemail",
  "Web forms land in unmonitored inboxes",
  "Response takes hours, not minutes",
  "Preferences discussed but not captured",
  "Follow-up is inconsistent or absent",
  "Pipeline status is unknown",
]

const afterItems = [
  "Every signal is captured immediately",
  "Response is instant and contextual",
  "Intent and preferences are structured",
  "Next action is always clear",
  "Follow-up is timed and tracked",
  "Pipeline visibility is complete",
]

const trendIcon: Record<TrendDirection, React.ReactNode> = {
  up: <ArrowUp className="h-3.5 w-3.5 text-success" />,
  down: <ArrowDown className="h-3.5 w-3.5 text-accent" />,
  neutral: <Minus className="h-3.5 w-3.5 text-muted-foreground" />,
}

export function BeforeAfterImpact() {
  return (
    <section className="border-b border-border py-16 sm:py-20 md:py-24">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            The Transformation
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.08] text-text-primary">
            From scattered signals to visible opportunities.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="rounded-xl border border-border bg-background p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Before Awoken
              </span>
              <h3 className="mt-2 text-lg sm:text-xl font-bold text-text-primary">
                Scattered Signals
              </h3>
              <ul className="mt-5 space-y-3">
                {beforeItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/40" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          >
            <div className="rounded-xl border-2 border-accent/20 bg-accent/5 p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                After Awoken
              </span>
              <h3 className="mt-2 text-lg sm:text-xl font-bold text-text-primary">
                Visible Opportunities
              </h3>
              <ul className="mt-5 space-y-3">
                {afterItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-success" />
                    <span className="text-sm text-text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Awoken System Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="mt-12"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            The system that makes it possible
          </span>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {awokenSystemSteps.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className="rounded-lg border border-border bg-background px-3 py-2">
                  <span className="text-xs font-bold text-text-primary">{step.name}</span>
                </div>
                {i < awokenSystemSteps.length - 1 && (
                  <ArrowDown className="h-3 w-3 text-muted-foreground shrink-0 rotate-270 sm:rotate-0" />
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-lg">
            {awokenSystemSteps.map((s) => s.output).join(" ")}
          </p>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          className="mt-14"
        >
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Illustrative Example
            </span>
            <h3 className="mt-1 text-lg sm:text-xl font-bold text-text-primary">
              The system generates evidence.
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {illustrativeMetrics.map((metric) => (
              <div
                key={metric.id}
                className="rounded-xl border border-border bg-background p-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-bold text-text-primary">
                    {metric.value}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {metric.unit}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  {trendIcon[metric.trend]}
                  <span className={cn(
                    "text-xs font-medium",
                    metric.trend === "up" && "text-success",
                    metric.trend === "down" && "text-accent",
                    metric.trend === "neutral" && "text-muted-foreground",
                  )}>
                    {metric.change > 0 && "+"}{metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {illustrativeMetrics[0].description}
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
