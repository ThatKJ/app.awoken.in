"use client"

import { useState } from "react"
import {
  MessageCircle, Filter, Repeat, RotateCcw, CalendarCheck, Users,
} from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { SectionHeader } from "@/components/shared/section-header"
import { Filters } from "@/components/shared/filters"
import { WorkerGrid } from "@/components/workers/worker-grid"
import { LoadingState } from "@/components/shared/loading-state"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"

const workers = [
  {
    id: "lead-response",
    name: "Lead Response",
    type: "Worker",
    icon: MessageCircle,
    color: "#F97316",
    activity: "Talking to Rahul Patel...",
    health: "healthy" as const,
    progress: { value: 88, label: "Conversation Engagement" },
    kpis: [
      { label: "Avg Response", value: "12s" },
      { label: "Conversions Today", value: "3" },
    ],
  },
  {
    id: "qualification",
    name: "Qualification",
    type: "Worker",
    icon: Filter,
    color: "#22C55E",
    activity: "Scoring Priya Sharma",
    health: "healthy" as const,
    progress: { value: 65, label: "Review Queue" },
    kpis: [
      { label: "Pipeline Value", value: "₹1.2Cr" },
      { label: "Qualified Today", value: "2" },
    ],
  },
  {
    id: "follow-up",
    name: "Follow-up",
    type: "Worker",
    icon: Repeat,
    color: "#8B5CF6",
    activity: "Waiting for new leads",
    health: "healthy" as const,
    progress: { value: 100, label: "Cadence Completion" },
    kpis: [
      { label: "Emails Sent", value: "42" },
      { label: "Re-engaged", value: "8" },
    ],
  },
  {
    id: "recovery",
    name: "Recovery",
    type: "Worker",
    icon: RotateCcw,
    color: "#8B5CF6",
    activity: "Running Campaign #18",
    health: "attention" as const,
    progress: { value: 42, label: "Campaign Progress" },
    kpis: [
      { label: "Recovered Today", value: "₹1.25L" },
      { label: "Cold Leads", value: "12" },
    ],
  },
  {
    id: "appointment",
    name: "Appointment",
    type: "Worker",
    icon: CalendarCheck,
    color: "#F59E0B",
    activity: "Booking Saturday visits",
    health: "healthy" as const,
    kpis: [
      { label: "Booked Today", value: "2" },
      { label: "Pending Approval", value: "1" },
    ],
  },
]

const filterOptions = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Healthy", value: "Healthy" },
  { label: "Attention", value: "Attention" },
]

const section: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut", delay: i * 0.04 } }),
}

export default function WorkersPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  if (loading) return <LoadingState variant="page" count={1} />

  if (!workers.length) {
    return (
<div className="mx-auto flex max-w-[1400px] flex-col gap-5 py-6 px-5">
        <EmptyState icon={Users} title="No workers configured" description="Add your first worker to start automating your workflow." action={{ label: "Add Worker" }} />
      </div>
    )
  }

  const healthyCount = workers.filter((w) => w.health === "healthy").length

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-6 py-6">
      <motion.div custom={0} variants={section} initial="hidden" animate="visible">
        <SectionHeader
          title="Workforce"
          description={`${workers.length} workers · ${healthyCount} operational`}
          action={<Button size="sm"><Users className="size-4" />Add Worker</Button>}
        />
      </motion.div>

      <motion.div custom={1} variants={section} initial="hidden" animate="visible">
        <Filters
          options={filterOptions}
          active={activeFilter}
          onChange={setActiveFilter}
          search={{ value: search, onChange: setSearch, placeholder: "Search workers..." }}
        />
      </motion.div>

      <motion.div custom={2} variants={section} initial="hidden" animate="visible">
        <WorkerGrid workers={workers} onWorkerClick={() => {}} />
      </motion.div>
    </div>
  )
}
