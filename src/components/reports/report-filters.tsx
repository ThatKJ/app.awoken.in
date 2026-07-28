"use client"

import { useState } from "react"
import { CalendarDays, X } from "lucide-react"
import { cn } from "@/lib/utils"

const dateRanges = ["Today", "This Week", "This Month", "Last Month", "Last Quarter", "This Year", "Custom"]

const workers = ["All Workers", "Qualification Worker", "Response Worker", "Follow-up Worker", "Appointment Worker", "Recovery Worker"]

const channels = ["All Channels", "WhatsApp", "Website", "Google Ads", "Facebook", "Instagram", "Email"]

type Props = {
  className?: string
}

export function ReportFilters({ className }: Props) {
  const [dateRange, setDateRange] = useState("This Month")
  const [selectedWorker, setSelectedWorker] = useState("All Workers")
  const [selectedChannel, setSelectedChannel] = useState("All Channels")
  const [showDateDropdown, setShowDateDropdown] = useState(false)

  return (
    <div className={cn("flex items-center gap-3 flex-wrap", className)}>
      {/* Date Range */}
      <div className="relative">
        <button
          onClick={() => setShowDateDropdown(!showDateDropdown)}
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-sm text-foreground hover:border-primary/30 transition-colors"
        >
          <CalendarDays className="size-4 text-muted-foreground" />
          {dateRange}
        </button>
        {showDateDropdown && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowDateDropdown(false)} />
            <div className="absolute top-full left-0 mt-1 z-20 w-44 rounded-xl border border-border bg-card shadow-premium p-1.5">
              {dateRanges.map((r) => (
                <button
                  key={r}
                  onClick={() => { setDateRange(r); setShowDateDropdown(false) }}
                  className={cn(
                    "w-full rounded-lg px-3 py-1.5 text-xs text-left transition-colors",
                    dateRange === r ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Worker filter */}
      <select
        value={selectedWorker}
        onChange={(e) => setSelectedWorker(e.target.value)}
        className="rounded-xl border border-border bg-card px-3.5 py-2 text-sm text-foreground appearance-none cursor-pointer hover:border-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {workers.map((w) => (
          <option key={w} value={w}>{w}</option>
        ))}
      </select>

      {/* Channel filter */}
      <select
        value={selectedChannel}
        onChange={(e) => setSelectedChannel(e.target.value)}
        className="rounded-xl border border-border bg-card px-3.5 py-2 text-sm text-foreground appearance-none cursor-pointer hover:border-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {channels.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Active filter indicators */}
      <div className="flex items-center gap-1.5">
        {selectedWorker !== "All Workers" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            {selectedWorker}
            <button onClick={() => setSelectedWorker("All Workers")} className="hover:text-primary/70">
              <X className="size-3" />
            </button>
          </span>
        )}
        {selectedChannel !== "All Channels" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            {selectedChannel}
            <button onClick={() => setSelectedChannel("All Channels")} className="hover:text-primary/70">
              <X className="size-3" />
            </button>
          </span>
        )}
      </div>
    </div>
  )
}
