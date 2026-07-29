"use client"

import { Sparkles, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AiRecommendation() {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/10 bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5 text-primary" strokeWidth={2} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">AI Recommendation</span>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
          High Impact
        </span>
      </div>

      {/* Body */}
      <div className="px-5 pb-4">
        <p className="text-base font-semibold text-foreground">Review 3 buyers worth ₹45L</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Elena identified three buyers ready for manual review.
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-1.5 px-5 pb-4">
        {["Budget ₹1Cr+", "Callback", "Brochure", "Fast Reply"].map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Metrics row */}
      <div className="flex items-center justify-between border-t border-border/30 px-5 py-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-foreground">92%</span>
          <span className="text-muted-foreground">Close Probability</span>
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Deadline:</span> 4 PM
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-border/30 px-5 py-3">
        <Button size="sm" className="h-8 gap-1.5 px-4 text-xs">
          Review Buyers
          <ArrowRight className="size-3" strokeWidth={2} />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-3 text-xs text-muted-foreground">
          <X className="size-3" strokeWidth={2} />
          Dismiss this
        </Button>
      </div>
    </div>
  )
}
