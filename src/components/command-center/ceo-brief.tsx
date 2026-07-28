"use client"

export function CeoBrief() {
  return (
    <div className="flex items-stretch gap-3">
      {/* Pipeline health — primary metric */}
      <div className="flex flex-1 items-center rounded-xl border border-border bg-card px-4 py-3">
        <div className="flex items-center gap-4 w-full">
          <div className="min-w-0">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Pipeline</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl font-bold text-foreground tabular-nums tracking-tight">₹2.34Cr</span>
              <span className="text-xs text-success tabular-nums">↑ 14.2%</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[11px] text-muted-foreground tabular-nums">Target ₹2.85Cr</span>
              <span className="text-[11px] font-semibold text-foreground tabular-nums">82%</span>
              {/* Mini progress bar */}
              <div className="flex-1 max-w-[80px] h-1 rounded-full bg-muted/50 overflow-hidden">
                <div className="h-full rounded-full bg-primary" style={{ width: "82%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting metrics */}
      <div className="flex items-center rounded-xl border border-border bg-card px-4 py-3 min-w-[160px]">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Today&apos;s Revenue</span>
          <p className="text-lg font-bold text-foreground tabular-nums mt-0.5">₹18.2L</p>
          <span className="text-[11px] text-success tabular-nums">+12% vs yesterday</span>
        </div>
      </div>

      <div className="flex items-center rounded-xl border border-border bg-card px-4 py-3 min-w-[140px]">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">AI Confidence</span>
          <p className="text-lg font-bold text-foreground tabular-nums mt-0.5">94%</p>
          <span className="text-[11px] text-muted-foreground tabular-nums">Last 24h average</span>
        </div>
      </div>

      <div className="flex items-center rounded-xl border border-border bg-card px-4 py-3 min-w-[140px]">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Workers Active</span>
          <p className="text-lg font-bold text-foreground tabular-nums mt-0.5">
            4<span className="text-sm font-normal text-muted-foreground">/5</span>
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="size-1.5 rounded-full bg-success animate-pulse-dot" />
            <span className="text-[11px] text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  )
}
