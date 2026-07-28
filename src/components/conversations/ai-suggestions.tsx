"use client"

import { ArrowUpRight, Calendar, DollarSign, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const suggestions = [
  { icon: ArrowUpRight, label: "Send Pricing", description: "Share current offers", color: "bg-primary/10 text-primary" },
  { icon: Calendar, label: "Book Meeting", description: "Schedule site visit", color: "bg-success/10 text-success" },
  { icon: DollarSign, label: "Create Opportunity", description: "Add to pipeline", color: "bg-warning/10 text-warning" },
  { icon: FileText, label: "Escalate", description: "Request human review", color: "bg-destructive/10 text-destructive" },
]

export function AISuggestions() {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Suggested Actions</p>
      {suggestions.map((s) => (
        <button
          key={s.label}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className={cn("flex size-7 items-center justify-center rounded-lg", s.color)}>
            <s.icon className="size-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-foreground">{s.label}</p>
            <p className="text-[11px] text-muted-foreground">{s.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

