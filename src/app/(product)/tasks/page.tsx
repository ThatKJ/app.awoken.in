"use client"

import { motion, type Variants } from "framer-motion"
import { CheckSquare } from "lucide-react"

const section: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function TasksPage() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 py-6 px-5">
      <motion.div variants={section} initial="hidden" animate="visible" className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex size-12 items-center justify-center rounded-xl bg-muted mb-4">
          <CheckSquare className="size-6 text-muted-foreground" strokeWidth={2} />
        </div>
        <h3 className="text-base font-semibold text-foreground">Tasks coming soon</h3>
        <p className="text-sm text-muted-foreground mt-1">View and manage automated task execution.</p>
      </motion.div>
    </div>
  )
}
