"use client"

import { motion, type Variants } from "framer-motion"
import { LeadTable } from "@/components/leads/lead-table"
import { AiSidebar } from "@/components/leads/ai-sidebar"

const section: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.04 },
  }),
}

export default function LeadsPage() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 py-6 px-5">
      <motion.div
        custom={0}
        variants={section}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6 items-start"
      >
        <div className="min-w-0">
          <LeadTable />
        </div>
        <div className="hidden xl:block sticky top-6">
          <AiSidebar />
        </div>
      </motion.div>
    </div>
  )
}
