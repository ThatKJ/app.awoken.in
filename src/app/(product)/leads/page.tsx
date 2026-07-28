"use client"

import { motion, type Variants } from "framer-motion"
import { LeadTable } from "@/components/leads/lead-table"

const section: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.06 },
  }),
}

export default function LeadsPage() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5 py-6 px-5">
      <motion.div custom={0} variants={section} initial="hidden" animate="visible">
        <LeadTable />
      </motion.div>
    </div>
  )
}
