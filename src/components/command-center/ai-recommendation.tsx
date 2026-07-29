"use client"

import { Sparkles, ArrowRight, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AiRecommendation() {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-sm">
      <div className="relative p-5 text-center">
        <div className="flex items-start justify-center">
          <div className="flex items-start gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
              <Zap className="size-4" strokeWidth={2} />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">AI Recommendation</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                  High Impact
                </span>
              </div>
              <div className="mt-2">
                <span className="text-xl font-bold text-foreground tracking-tight">Recover ₹450,000</span>
              </div>
              <p className="mt-1 text-sm text-foreground/70">
                Elena identified 3 high-intent leads from today&apos;s queue — Prestige Homes campaign.
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="tabular-nums">
                  Close rate: <span className="font-semibold text-foreground">92%</span>
                </span>
                <span className="tabular-nums">
                  Leads: <span className="font-semibold text-foreground">3</span>
                </span>
                <span className="tabular-nums">
                  Avg value: <span className="font-semibold text-foreground">₹15L</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <Button size="sm" className="h-7 gap-1.5 px-3 text-xs">
            Review now
            <ArrowRight className="size-3" strokeWidth={2} />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-3 text-xs text-muted-foreground">
            <X className="size-3" strokeWidth={2} />
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  )
}
