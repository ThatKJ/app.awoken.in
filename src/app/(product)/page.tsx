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
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5 py-6 px-5">
      <motion.div custom={0} variants={section} initial="hidden" animate="visible">
        <HeroMetric />
      </motion.div>

      <motion.div custom={1} variants={section} initial="hidden" animate="visible">
        <StatusStrip />
      </motion.div>

      <motion.div custom={2} variants={section} initial="hidden" animate="visible">
        <AiRecommendation />
      </motion.div>

      <motion.div
        custom={3}
        variants={section}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-5 lg:grid-cols-3"
      >
        <div className="lg:col-span-2">
          <WorkforceStrip />
        </div>
        <div>
          <NeedsAttention />
        </div>
      </motion.div>

      <motion.div custom={4} variants={section} initial="hidden" animate="visible">
        <ActivityFeed />
      </motion.div>
    </div>
  )
}
