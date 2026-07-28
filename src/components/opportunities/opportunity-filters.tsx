"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { OpportunityStage } from "@/types"

const stages: { value: OpportunityStage | "all"; label: string }[] = [
  { value: "all", label: "All Stages" },
  { value: "new", label: "New" },
  { value: "qualified", label: "Qualified" },
  { value: "proposal", label: "Proposal" },
  { value: "negotiation", label: "Negotiation" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
]

type Props = {
  search: string
  onSearchChange: (val: string) => void
  stageFilter: OpportunityStage | "all"
  onStageFilterChange: (val: OpportunityStage | "all") => void
  showFilters: boolean
  onToggleFilters: () => void
}

export function OpportunityFilters({
  search,
  onSearchChange,
  stageFilter,
  onStageFilterChange,
  showFilters,
  onToggleFilters,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search opportunities…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-8 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
        />
        {search && (
          <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Stage Filter */}
      <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
        {stages.map((s) => (
          <button
            key={s.value}
            onClick={() => onStageFilterChange(s.value)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              stageFilter === s.value
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Toggle filters */}
      <button
        onClick={onToggleFilters}
        className={cn(
          "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all",
          showFilters
            ? "border-primary/30 bg-primary/[0.05] text-primary"
            : "border-border bg-card text-muted-foreground hover:text-foreground",
        )}
      >
        <SlidersHorizontal className="size-3.5" />
        Filters
      </button>
    </div>
  )
}
