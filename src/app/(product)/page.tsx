"use client"

import { motion, type Variants } from "framer-motion"
import { HeroMetric } from "@/components/command-center/hero-metric"
import { StatusStrip } from "@/components/command-center/status-strip"
import { AiRecommendation } from "@/components/command-center/ai-recommendation"
import { NeedsAttention } from "@/components/command-center/needs-attention"
import { WorkforceStrip } from "@/components/command-center/workforce-strip"
import { ActivityFeed } from "@/components/command-center/activity-feed"

const section: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.04 },
  }),
}

export default function CommandCenterPage() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 py-6 px-5">
      <motion.div custom={0} variants={section} initial="hidden" animate="visible">
        <HeroMetric />
      </motion.div>

      <motion.div custom={2} variants={section} initial="hidden" animate="visible">
        <StatusStrip />
      </motion.div>

      <motion.div custom={3} variants={section} initial="hidden" animate="visible">
        <AiRecommendation />
      </motion.div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-border/30" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40">
            Live Operations
          </span>
          <div className="h-px flex-1 bg-border/30" />
        </div>

        <motion.div
          custom={5}
          variants={section}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          <div className="rounded-xl border border-border bg-card p-4">
            <WorkforceStrip />
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <NeedsAttention />
          </div>
        </motion.div>
      </div>

      <motion.div custom={6} variants={section} initial="hidden" animate="visible">
        <div className="bg-card rounded-xl border border-border p-4">
          <ActivityFeed />
        </div>
      </motion.div>
    </div>
  )
}
