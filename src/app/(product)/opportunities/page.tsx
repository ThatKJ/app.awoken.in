"use client"

import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { SectionHeader } from "@/components/shared/section-header"
import { OpportunitySummaryMetrics } from "@/components/opportunities/opportunity-summary"
import { OpportunityBoard } from "@/components/opportunities/opportunity-board"
import { OpportunityDrawer } from "@/components/opportunities/opportunity-drawer"
import { OpportunityFilters } from "@/components/opportunities/opportunity-filters"
import { useOpportunities, useOpportunityAnalytics, useMoveOpportunity } from "@/hooks/use-opportunities"
import type { OpportunityStage } from "@/types"

const section: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.06 },
  }),
}

export default function OpportunitiesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [stageFilter, setStageFilter] = useState<OpportunityStage | "all">("all")
  const [showFilters, setShowFilters] = useState(false)

  const { data: opportunities } = useOpportunities()
  const { data: analytics } = useOpportunityAnalytics()
  const moveMutation = useMoveOpportunity()

  const selectedOpportunity = opportunities?.find((o) => o.id === selectedId) ?? null

  const filtered = (opportunities ?? []).filter((o) => {
    if (stageFilter !== "all" && o.stage !== stageFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!o.lead_name.toLowerCase().includes(q) && !o.company.toLowerCase().includes(q)) return false
    }
    return true
  })

  function handleMove(id: string, stage: OpportunityStage) {
    moveMutation.mutate({ id, stage })
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5 py-6 px-5">
      {/* Summary */}
      <motion.div custom={0} variants={section} initial="hidden" animate="visible">
        <SectionHeader
          title="Revenue Pipeline"
          description="Track and move opportunities through the sales pipeline"
        />
      </motion.div>

      {analytics && (
        <motion.div custom={1} variants={section} initial="hidden" animate="visible">
          <OpportunitySummaryMetrics {...analytics} />
        </motion.div>
      )}

      {/* Filters */}
      <motion.div custom={2} variants={section} initial="hidden" animate="visible">
        <OpportunityFilters
          search={search}
          onSearchChange={setSearch}
          stageFilter={stageFilter}
          onStageFilterChange={setStageFilter}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />
      </motion.div>

      {/* Kanban Board */}
      <motion.div custom={3} variants={section} initial="hidden" animate="visible">
        <OpportunityBoard
          opportunities={filtered}
          onMove={handleMove}
          onSelect={setSelectedId}
        />
      </motion.div>

      {/* Detail Drawer */}
      <OpportunityDrawer
        opportunity={selectedOpportunity}
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  )
}
