"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sparkles, ChevronDown, MessageSquare, ExternalLink, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { LeadAvatar } from "@/components/leads/lead-avatar"
import { Button } from "@/components/ui/button"
import { AiBrief } from "@/components/leads/ai-brief"

type Lead = {
  id: string
  name: string
  confidence: number
  narrative: string
  source: string
  pipelineValue: string
  pipelineNumeric: number
  status: string
  worker: { name: string; action: string; time: string }
  recommendedAction: string
  lastMessage: string
  aiSummary: string
  aiReasons: string[]
  needsYou: boolean
  needsYouReason: string
}

const STATUS_CYCLES = ["Typing reply", "Qualifying lead", "Following up", "Checking CRM", "Updating record"]

const leads: Lead[] = [
  { id: "1", name: "Rahul Patel", confidence: 92, narrative: "Ready to close today", source: "Google Ads", pipelineValue: "₹1.2Cr", pipelineNumeric: 1.2, status: "ready", worker: { name: "Elena", action: "Typing reply", time: "2m" }, recommendedAction: "Schedule Site Visit", lastMessage: "Can I visit this weekend?", aiSummary: "Looking for a 3BHK in Whitefield. Budget ₹1.4Cr. Requested callback tomorrow.", aiReasons: ["Asked for site visit", "Opened brochure twice", "Replied within 4 min"], needsYou: true, needsYouReason: "Ready for callback" },
  { id: "2", name: "Priya Sharma", confidence: 87, narrative: "Ready for site visit", source: "Website Form", pipelineValue: "₹85L", pipelineNumeric: 0.85, status: "qualified", worker: { name: "Marcus", action: "Qualifying lead", time: "15m" }, recommendedAction: "Send Proposal", lastMessage: "Shared requirements via form", aiSummary: "Pre-qualified for 2BHK in Wakad. Budget ₹85L.", aiReasons: ["Requested site visit", "Shared budget details", "High match score"], needsYou: false, needsYouReason: "" },
  { id: "3", name: "Amit Singh", confidence: 45, narrative: "Stalled after first call", source: "Meta Ads", pipelineValue: "₹65L", pipelineNumeric: 0.65, status: "review", worker: { name: "Priya", action: "Checking CRM", time: "1h" }, recommendedAction: "Re-engagement Call", lastMessage: "Asked about ROI projections", aiSummary: "Interested in investment property. Budget ₹65L.", aiReasons: ["Dropped after first call", "Didn't open follow-up"], needsYou: true, needsYouReason: "Waiting approval" },
  { id: "4", name: "Sneha Reddy", confidence: 72, narrative: "In follow-up sequence", source: "WhatsApp", pipelineValue: "₹1.5Cr", pipelineNumeric: 1.5, status: "qualified", worker: { name: "Aria", action: "Following up", time: "3h" }, recommendedAction: "Day 1 Follow-up", lastMessage: "Sent photos of 3 properties", aiSummary: "Looking for commercial space. Budget ₹1.5Cr.", aiReasons: ["Viewed 3 properties", "Asking detailed questions"], needsYou: false, needsYouReason: "" },
  { id: "5", name: "Vikram Joshi", confidence: 34, narrative: "Not responding to outreach", source: "Landing Page", pipelineValue: "₹95L", pipelineNumeric: 0.95, status: "lost", worker: { name: "Recovery", action: "Campaign #18", time: "1d" }, recommendedAction: "Re-engage via WhatsApp", lastMessage: "Not responding to emails", aiSummary: "Visited site 2 weeks ago. Needs re-engagement.", aiReasons: ["Not opening emails", "Last visit 2 weeks ago"], needsYou: true, needsYouReason: "Recoverable" },
  { id: "6", name: "Ananya Gupta", confidence: 95, narrative: "Ready to close today", source: "Google Ads", pipelineValue: "₹2.1Cr", pipelineNumeric: 2.1, status: "ready", worker: { name: "Elena", action: "Typing reply", time: "30m" }, recommendedAction: "Confirm Booking", lastMessage: "Confirmed availability", aiSummary: "Ready to book 4BHK in Viman Nagar. Budget ₹2.1Cr.", aiReasons: ["Confirmed availability", "Pre-approved for loan", "Ready to book"], needsYou: true, needsYouReason: "High-value deal" },
  { id: "7", name: "Deepak Verma", confidence: 12, narrative: "Went with competitor", source: "CRM Import", pipelineValue: "₹0", pipelineNumeric: 0, status: "lost", worker: { name: "Recovery", action: "Campaign #19", time: "5d" }, recommendedAction: "Recovery Callback", lastMessage: "Chose competitor property", aiSummary: "Lost to competitor. Recoverable via callback.", aiReasons: ["Chose competitor", "No engagement in 5 days"], needsYou: false, needsYouReason: "" },
  { id: "8", name: "Neha Kapoor", confidence: 28, narrative: "Recoverable via campaign", source: "Meta Ads", pipelineValue: "₹55L", pipelineNumeric: 0.55, status: "recoverable", worker: { name: "Recovery", action: "Campaign #18", time: "2d" }, recommendedAction: "Re-engage", lastMessage: "Was out of town", aiSummary: "Interested in 1BHK. Budget ₹55L.", aiReasons: ["Was out of town", "Low engagement"], needsYou: false, needsYouReason: "" },
  { id: "9", name: "Rohan Desai", confidence: 88, narrative: "Pre-approved for loan", source: "WhatsApp", pipelineValue: "₹1.8Cr", pipelineNumeric: 1.8, status: "qualified", worker: { name: "Marcus", action: "Qualifying lead", time: "45m" }, recommendedAction: "Schedule Viewing", lastMessage: "Sent loan approval letter", aiSummary: "Looking for 3BHK in Hinjewadi. Budget ₹1.8Cr.", aiReasons: ["Sent loan approval", "Requested specific unit"], needsYou: false, needsYouReason: "" },
  { id: "10", name: "Kavita Iyer", confidence: 55, narrative: "New — needs initial call", source: "Website Form", pipelineValue: "₹72L", pipelineNumeric: 0.72, status: "review", worker: { name: "Elena", action: "Updating record", time: "30m" }, recommendedAction: "Initial Outreach", lastMessage: "Enquired via website form", aiSummary: "Enquired about 2BHK. Budget ₹72L.", aiReasons: ["Just enquired", "No follow-up yet"], needsYou: false, needsYouReason: "" },
]

const filters = ["All", "Qualified", "Review", "Recover", "Lost"]

const searchPlaceholders = [
  "Ask your workforce...",
  "Find buyers above ₹1Cr...",
  "Show stalled leads...",
  "Why did Rahul stop replying?...",
  "Recover lost leads...",
]

function RotatingPlaceholder() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % searchPlaceholders.length), 4000)
    return () => clearInterval(interval)
  }, [])
  return (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="text-muted-foreground/40"
    >
      {searchPlaceholders[index]}
    </motion.span>
  )
}

function WorkerStatus({ worker }: { worker: Lead["worker"] }) {
  const [state, setState] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setState((prev) => (prev + 1) % STATUS_CYCLES.length), 2800)
    return () => clearInterval(interval)
  }, [])
  return (
    <span className="flex items-center gap-1.5">
      <motion.span
        key={STATUS_CYCLES[state]}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.12 }}
        className="text-xs text-muted-foreground/70"
      >
        {STATUS_CYCLES[state]}
      </motion.span>
      <span className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            className="size-0.5 rounded-full bg-muted-foreground/40"
          />
        ))}
      </span>
    </span>
  )
}

function StatusDot({ status, pulse = false }: { status: string; pulse?: boolean }) {
  const colors: Record<string, string> = {
    ready: "bg-success",
    qualified: "bg-primary",
    review: "bg-warning",
    recoverable: "bg-info",
    lost: "bg-muted-foreground/30",
  }
  return <span className={cn("size-1.5 rounded-full shrink-0", colors[status], pulse && "animate-pulse-dot")} />
}

const statusLabel: Record<string, string> = {
  ready: "Ready",
  qualified: "Qualified",
  review: "Review",
  recoverable: "Recoverable",
  lost: "Lost",
}

function getStatusGroup(lead: Lead): string {
  if (lead.status === "ready") return "Qualified"
  if (lead.status === "qualified") return "Qualified"
  if (lead.status === "review") return "Review"
  if (lead.status === "recoverable") return "Recover"
  if (lead.status === "lost") return "Lost"
  return "All"
}

const needsYouOrder: Record<string, number> = {
  ready: 0,
  review: 1,
  recoverable: 2,
  lost: 3,
  qualified: 4,
}

export function LeadTable() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = leads.filter((l) => {
    if (activeFilter !== "All" && getStatusGroup(l) !== activeFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!l.name.toLowerCase().includes(q) && !l.source.toLowerCase().includes(q)) return false
    }
    return true
  })

  const activeCount = leads.filter((l) => l.status === "ready" || l.status === "qualified").length
  const pipelineTotal = leads.reduce((s, l) => s + l.pipelineNumeric, 0)
  const needsYouItems = [...leads.filter((l) => l.needsYou)].sort((a, b) => needsYouOrder[a.status] - needsYouOrder[b.status])

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Leads</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {activeCount} active &middot; ₹{pipelineTotal}Cr pipeline
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="text-xs">Export</Button>
          <Button size="sm" className="text-xs">+ New</Button>
        </div>
      </div>

      {/* AI Brief */}
      <AiBrief />

      {/* Needs Attention */}
      <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card px-4 py-2.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground shrink-0">Needs Attention</span>
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {needsYouItems.map((item) => (
            <button
              key={item.id}
              className="flex items-center gap-1.5 rounded-lg border border-border/30 px-2 py-1 text-xs transition-colors hover:bg-muted/30 hover:border-border/60 shrink-0"
            >
              <StatusDot status={item.status} pulse />
              <span className="text-xs font-medium text-foreground/80">{item.name}</span>
              <span className="text-[10px] text-muted-foreground/60">{item.needsYouReason}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/50" strokeWidth={2} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder=" "
            className="h-8 w-full rounded-lg border border-border bg-card pl-8 pr-3 text-xs text-foreground outline-none transition-colors focus:border-primary/50 placeholder:text-transparent"
          />
          {!search && (
            <div className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 text-xs">
              <RotatingPlaceholder />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-lg bg-muted/50 p-0.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => { setActiveFilter(f); setExpandedId(null) }}
                className={cn(
                  "rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-100",
                  activeFilter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-2">
        {filtered.map((lead, i) => {
          const isHovered = hoveredId === lead.id
          const isExpanded = expandedId === lead.id

          return (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: i * 0.02 }}
            >
              <div
                onMouseEnter={() => setHoveredId(lead.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "group cursor-pointer rounded-xl border transition-all duration-150",
                  isExpanded
                    ? "border-primary/30 bg-primary-light/40 shadow-sm"
                    : isHovered
                    ? "border-primary/20 bg-card shadow-md -translate-y-0.5"
                    : "border-transparent bg-transparent hover:border-border/40 hover:bg-muted/10"
                )}
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                  onKeyDown={(e) => { if (e.key === "Enter") setExpandedId(isExpanded ? null : lead.id) }}
                  tabIndex={0}
                  role="button"
                  className="flex w-full flex-col px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
                >
                  {/* Name + Status dot */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <LeadAvatar name={lead.name} source={lead.source} size="sm" />
                      <span className="text-sm font-semibold text-foreground">{lead.name}</span>
                    </div>
                    <span className="text-[9px] text-muted-foreground/40 font-medium shrink-0 tabular-nums">{lead.source}</span>
                  </div>

                  {/* Narrative */}
                  <div className="flex items-center gap-2 mt-1.5 ml-[36px]">
                    <StatusDot status={lead.status} pulse={lead.status === "ready"} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.04em] text-foreground/70">
                      {lead.narrative}
                    </span>
                  </div>

                  {/* Value */}
                  <div className="ml-[36px] mt-0.5">
                    <span className="text-base font-bold text-foreground tabular-nums">{lead.pipelineValue}</span>
                  </div>

                  {/* Worker */}
                  <div className="flex items-center gap-2 mt-2 ml-[36px]">
                    <StatusDot status="ready" pulse />
                    <span className="text-xs font-medium text-foreground/80">{lead.worker.name}</span>
                    <WorkerStatus worker={lead.worker} />
                    <span className="text-[10px] text-muted-foreground/40 tabular-nums">{lead.worker.time}</span>
                  </div>

                  {/* Why AI thinks this */}
                  <div className="ml-[36px] mt-1.5">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/40">Why AI thinks this</span>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                      {lead.aiReasons.map((reason) => (
                        <span key={reason} className="flex items-center gap-1 text-[11px] text-foreground/70">
                          <span className="text-success/70">✓</span>
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Confidence */}
                  <div className="flex items-center gap-2 mt-2 ml-[36px] pt-1.5 border-t border-border/10">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/50">AI Confidence</span>
                    <div className="flex-1 flex items-center gap-2">
                      <span className={cn(
                        "text-xs font-bold tabular-nums",
                        lead.confidence >= 80 ? "text-success" : lead.confidence >= 50 ? "text-warning" : "text-destructive"
                      )}>
                        {lead.confidence}%
                      </span>
                      <div className="flex-1 max-w-[100px] h-0.5 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${lead.confidence}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className={cn(
                            "h-full rounded-full",
                            lead.confidence >= 80 ? "bg-success" : lead.confidence >= 50 ? "bg-warning" : "bg-destructive"
                          )}
                        />
                      </div>
                      <span className={cn(
                        "text-[10px] font-medium",
                        lead.confidence >= 80 ? "text-success" : lead.confidence >= 50 ? "text-warning" : "text-destructive"
                      )}>
                        {lead.confidence >= 80 ? "Very High" : lead.confidence >= 50 ? "Medium" : "Low"}
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-2 mt-2 ml-[36px] pt-2 border-t border-border/10">
                    <span className="text-xs font-medium text-primary">{lead.recommendedAction}</span>
                    <ChevronDown className="size-3 -rotate-90 text-primary/60" strokeWidth={2} />
                    <div className="flex-1" />
                    <div className={cn(
                      "flex items-center gap-1.5 transition-opacity duration-100",
                      isHovered ? "opacity-100" : "opacity-0"
                    )}>
                      <span className="cursor-pointer rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary transition-colors hover:bg-primary/20">
                        Approve
                      </span>
                      <span className="cursor-pointer rounded-md px-2 py-1 text-[10px] font-medium text-muted-foreground/60 transition-colors hover:bg-muted/30">
                        Dismiss
                      </span>
                    </div>
                  </div>

                  {/* Hover band */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start justify-between gap-4 mt-1.5 ml-[36px] pt-1.5 border-t border-border/10">
                          <p className="text-[11px] text-muted-foreground/70 leading-relaxed flex-1">{lead.aiSummary}</p>
                          <button className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-primary/70 transition-colors hover:text-primary">
                            View Conversation
                            <ExternalLink className="size-2.5" strokeWidth={2} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expanded detail */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-4 mt-2 ml-[36px] pt-3 border-t border-border/20">
                          <div>
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/40">AI Summary</span>
                            <p className="text-xs text-foreground/80 mt-1 leading-relaxed">{lead.aiSummary}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button size="sm" variant="primary">
                                {lead.recommendedAction}
                              </Button>
                              <Button size="sm" variant="secondary">
                                <MessageSquare className="size-3.5" strokeWidth={2} />
                                Message
                              </Button>
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/40">Activity</span>
                            <div className="relative pl-3 mt-2 border-l-2 border-border/20 space-y-2">
                              {[
                                { text: `${lead.worker.name} is ${lead.worker.action.toLowerCase()}...`, time: lead.worker.time },
                                { text: "Lead captured via " + lead.source, time: "Yesterday" },
                              ].map((e, j) => (
                                <div key={j} className="relative">
                                  <span className="absolute -left-[11px] top-1 size-1.5 rounded-full bg-border" />
                                  <p className="text-[11px] text-foreground leading-snug">{e.text}</p>
                                  <span className="text-[9px] text-muted-foreground/50">{e.time}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-muted-foreground/50">
          {filtered.length} of {leads.length} opportunities
        </span>
      </div>
    </div>
  )
}
