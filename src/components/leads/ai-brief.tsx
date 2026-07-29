"use client"

import { Sparkles, ArrowRight } from "lucide-react"

export function AiBrief() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-primary/15 bg-primary-light/80 p-5 transition-all duration-150 hover:border-primary/25">
      <div className="flex items-start gap-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="size-4 text-primary" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">
            <span className="text-primary">Elena</span> found <span className="font-semibold">3 leads worth ₹45L</span> that are ready to close today.
          </p>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            All from Google Ads campaign &mdash; high intent, pre-qualified, awaiting your review.
          </p>
        </div>
        <button className="group/btn flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium text-primary transition-all duration-100 hover:bg-primary/10">
          Review now
          <ArrowRight className="size-3.5 transition-transform duration-100 group-hover/btn:translate-x-0.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
