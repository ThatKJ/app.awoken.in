"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import type { Opportunity, OpportunityStage } from "@/types"

const stageConfig: Record<OpportunityStage, { label: string; color: string; bg: string }> = {
  new: { label: "New", color: "text-info", bg: "bg-info/5" },
  qualified: { label: "Qualified", color: "text-primary", bg: "bg-primary/5" },
  proposal: { label: "Proposal", color: "text-warning", bg: "bg-warning/5" },
  negotiation: { label: "Negotiation", color: "text-destructive", bg: "bg-destructive/5" },
  won: { label: "Won", color: "text-success", bg: "bg-success/5" },
  lost: { label: "Lost", color: "text-muted-foreground", bg: "bg-muted/20" },
}

const stageOrder: OpportunityStage[] = ["new", "qualified", "proposal", "negotiation", "won", "lost"]

type OpportunityBoardProps = {
  opportunities: Opportunity[]
  onMove: (id: string, stage: OpportunityStage) => void
  onSelect: (id: string) => void
}

export function OpportunityBoard({ opportunities, onMove, onSelect }: OpportunityBoardProps) {
  const [dragOverStage, setDragOverStage] = useState<string | null>(null)

  const grouped = stageOrder.reduce(
    (acc, stage) => {
      acc[stage] = opportunities.filter((o) => o.stage === stage)
      return acc
    },
    {} as Record<OpportunityStage, Opportunity[]>,
  )

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 min-h-[500px]">
      {stageOrder.map((stage) => {
        const items = grouped[stage]
        const totalValue = items.reduce((s, o) => s + o.value, 0)
        const cfg = stageConfig[stage]

        return (
          <div
            key={stage}
            className={cn(
              "flex w-64 shrink-0 flex-col rounded-2xl border border-border transition-colors duration-150",
              dragOverStage === stage ? "border-primary/30 bg-primary/[0.02]" : cfg.bg,
            )}
            onDragOver={(e) => { e.preventDefault(); setDragOverStage(stage) }}
            onDragLeave={() => setDragOverStage(null)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOverStage(null)
              const id = e.dataTransfer.getData("text/opportunity-id")
              if (id) onMove(id, stage as OpportunityStage)
            }}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className={cn("text-xs font-semibold", cfg.color)}>{cfg.label}</span>
                <span className="inline-flex items-center justify-center rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground min-w-[20px]">
                  {items.length}
                </span>
              </div>
              <span className="text-xs font-medium text-foreground">
                ₹{(totalValue / 100000).toFixed(0)}L
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2 p-3 overflow-y-auto max-h-[calc(100vh-320px)]">
              {items.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  onSelect={() => onSelect(opp.id)}
                />
              ))}
              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-xs text-muted-foreground/50">Drop opportunities here</p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function OpportunityCard({
  opportunity,
  onSelect,
}: {
  opportunity: Opportunity
  onSelect: () => void
}) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData("text/opportunity-id", opportunity.id)
      e.dataTransfer.effectAllowed = "move"
      setIsDragging(true)
    },
    [opportunity.id],
  )

  const priorityColors: Record<string, string> = {
    high: "border-l-destructive",
    medium: "border-l-warning",
    low: "border-l-border",
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
      onClick={onSelect}
      className={cn(
        "group relative cursor-pointer rounded-xl border border-border bg-card p-3.5 transition-all duration-150",
        "hover:border-primary/20 hover:shadow-soft",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isDragging && "opacity-50 scale-[0.97]",
        "border-l-[3px]",
        priorityColors[opportunity.priority],
      )}
      tabIndex={0}
      role="button"
      aria-label={`${opportunity.lead_name} — ${opportunity.stage}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect() }
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">{opportunity.lead_name}</p>
          <p className="text-xs text-muted-foreground truncate">{opportunity.company}</p>
        </div>
        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-semibold text-primary">
          {opportunity.worker_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
      </div>

      <div className="space-y-1.5 mb-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Value</span>
          <span className="font-semibold text-foreground">
            ₹{(opportunity.value / 100000).toFixed(0)}L
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Confidence</span>
          <OpportunityProbabilityInline value={opportunity.confidence} />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Next</span>
          <span className="text-foreground truncate max-w-[120px] text-right">{opportunity.next_action}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <span className="text-[10px] text-muted-foreground/60">{opportunity.last_activity}</span>
        <span className="text-[10px] text-muted-foreground/60">
          {opportunity.expected_close !== "—" ? `Close ${opportunity.expected_close}` : "—"}
        </span>
      </div>
    </div>
  )
}

function OpportunityProbabilityInline({ value }: { value: number }) {
  const color = value >= 80 ? "text-success" : value >= 50 ? "text-warning" : "text-destructive"
  return <span className={cn("font-medium tabular-nums", color)}>{value}%</span>
}
