"use client"

import { Sparkles, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AiRecommendation() {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/[0.02] p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
            <Sparkles className="size-4" strokeWidth={2} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">AI Recommendation</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                Priority
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
              <strong>Elena</strong> has flagged 3 high-intent leads from today&apos;s queue — all from the{" "}
              <strong>Prestige Homes</strong> campaign. Estimated close value: <strong>₹45L</strong>.
            </p>
            <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span>Confidence: 96%</span>
              <span>·</span>
              <span>Auto-approved for conversion</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button size="sm" className="h-7 gap-1.5 px-3 text-xs">
          Review Leads
          <ArrowRight className="size-3" strokeWidth={2} />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-3 text-xs text-muted-foreground">
          <X className="size-3" strokeWidth={2} />
          Dismiss
        </Button>
      </div>
    </div>
  )
}
