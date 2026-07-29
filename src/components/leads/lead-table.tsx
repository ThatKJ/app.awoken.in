"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Search, Sparkles, Calendar, Clock, MessageSquare, Phone, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { LeadAvatar } from "@/components/leads/lead-avatar"
import { LeadConfidence } from "@/components/leads/lead-confidence"
import { Button } from "@/components/ui/button"

type Lead = {
  id: string
  name: string
  company: string
  aiSummary: string
  aiScore: number
  confidence: number
  source: string
  pipelineValue: string
  pipelineNumeric: number
  status: string
  worker: { name: string; action: string; time: string }
  nextAction: string
  nextActionTime: string
  nextActionAI: boolean
}

const leads: Lead[] = [
  {
    id: "1", name: "Rahul Patel", company: "Self-employed", aiSummary: "Looking for a 3BHK in Whitefield. Budget ₹1.4Cr. Requested callback tomorrow.",
    aiScore: 92, confidence: 92, source: "Google Ads", pipelineValue: "₹1.2Cr", pipelineNumeric: 1.2,
    status: "ready", worker: { name: "Elena", action: "Responding", time: "2m ago" },
    nextAction: "Schedule Visit", nextActionTime: "Tomorrow 11AM", nextActionAI: true,
  },
  {
    id: "2", name: "Priya Sharma", company: "TCS", aiSummary: "Pre-qualified for 2BHK in Wakad. Budget ₹85L. Ready for site visit.",
    aiScore: 87, confidence: 87, source: "Website Form", pipelineValue: "₹85L", pipelineNumeric: 0.85,
    status: "qualified", worker: { name: "Marcus", action: "Qualifying", time: "15m ago" },
    nextAction: "Send Proposals", nextActionTime: "Today", nextActionAI: false,
  },
  {
    id: "3", name: "Amit Singh", company: "Infosys", aiSummary: "Interested in investment property. Budget ₹65L. Needs follow-up.",
    aiScore: 45, confidence: 45, source: "Meta Ads", pipelineValue: "₹65L", pipelineNumeric: 0.65,
    status: "review", worker: { name: "Priya", action: "Analyzing", time: "1h ago" },
    nextAction: "Initial Outreach", nextActionTime: "Tomorrow", nextActionAI: true,
  },
  {
    id: "4", name: "Sneha Reddy", company: "Dental Clinic", aiSummary: "Looking for commercial space. Budget ₹1.5Cr. Has seen 3 properties.",
    aiScore: 72, confidence: 72, source: "WhatsApp", pipelineValue: "₹1.5Cr", pipelineNumeric: 1.5,
    status: "qualified", worker: { name: "Aria", action: "Follow-up", time: "3h ago" },
    nextAction: "Day 1 Follow-up", nextActionTime: "Today", nextActionAI: false,
  },
  {
    id: "5", name: "Vikram Joshi", company: "Wipro", aiSummary: "Nurturing — visited site 2 weeks ago. Needs re-engagement.",
    aiScore: 34, confidence: 34, source: "Landing Page", pipelineValue: "₹95L", pipelineNumeric: 0.95,
    status: "lost", worker: { name: "Recovery", action: "Campaign #18", time: "1d ago" },
    nextAction: "Re-engagement", nextActionTime: "This week", nextActionAI: true,
  },
  {
    id: "6", name: "Ananya Gupta", company: "Startup", aiSummary: "Ready to book 4BHK in Viman Nagar. Budget ₹2.1Cr. Awaiting confirmation.",
    aiScore: 95, confidence: 95, source: "Google Ads", pipelineValue: "₹2.1Cr", pipelineNumeric: 2.1,
    status: "ready", worker: { name: "Elena", action: "Confirming", time: "30m ago" },
    nextAction: "Confirm Visit", nextActionTime: "Tomorrow 11AM", nextActionAI: true,
  },
  {
    id: "7", name: "Deepak Verma", company: "HDFC Bank", aiSummary: "Lost — went with competitor. Recoverable via callback campaign.",
    aiScore: 12, confidence: 12, source: "CRM Import", pipelineValue: "₹0", pipelineNumeric: 0,
    status: "lost", worker: { name: "Recovery", action: "Campaign #19", time: "5d ago" },
    nextAction: "Recovery Callback", nextActionTime: "Next week", nextActionAI: false,
  },
  {
    id: "8", name: "Neha Kapoor", company: "Freelancer", aiSummary: "Was interested in 1BHK. Budget ₹55L. Recoverable.",
    aiScore: 28, confidence: 28, source: "Meta Ads", pipelineValue: "₹55L", pipelineNumeric: 0.55,
    status: "recoverable", worker: { name: "Recovery", action: "Campaign #18", time: "2d ago" },
    nextAction: "Campaign #18", nextActionTime: "In progress", nextActionAI: true,
  },
  {
    id: "9", name: "Rohan Desai", company: "Deloitte", aiSummary: "High intent — looking for 3BHK in Hinjewadi. Budget ₹1.8Cr. Pre-approved for loan.",
    aiScore: 88, confidence: 88, source: "WhatsApp", pipelineValue: "₹1.8Cr", pipelineNumeric: 1.8,
    status: "qualified", worker: { name: "Marcus", action: "Qualifying", time: "45m ago" },
    nextAction: "Schedule Viewing", nextActionTime: "Friday 4PM", nextActionAI: true,
  },
  {
    id: "10", name: "Kavita Iyer", company: "Doctor", aiSummary: "New — enquired about 2BHK. Budget ₹72L. Needs initial call.",
    aiScore: 55, confidence: 55, source: "Website Form", pipelineValue: "₹72L", pipelineNumeric: 0.72,
    status: "review", worker: { name: "Elena", action: "Drafting", time: "30m ago" },
    nextAction: "Initial Outreach", nextActionTime: "Today", nextActionAI: false,
  },
]

const filters = ["All", "Qualified", "Needs Review", "Recoverable", "Lost"]

function getStatusGroup(status: string): string {
  if (status === "qualified" || status === "ready") return "Qualified"
  if (status === "review") return "Needs Review"
  if (status === "recoverable") return "Recoverable"
  if (status === "lost") return "Lost"
  return "All"
}

function AiScore({ value }: { value: number }) {
  const stars = Math.round(value / 20)
  return (
    <span className="text-[11px] tabular-nums text-muted-foreground">
      {"★".repeat(stars)}{"☆".repeat(5 - stars)} {value}
    </span>
  )
}

function StatusDot({ status }: { status: string }) {
  const color =
    status === "ready" ? "bg-success" :
    status === "qualified" ? "bg-primary" :
    status === "review" ? "bg-warning" :
    status === "recoverable" ? "bg-info" :
    "bg-muted-foreground/30"
  return <span className={cn("size-2 rounded-full shrink-0", color)} />
}

function LeadExpanded({ lead }: { lead: Lead }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="border-t border-border/30 px-5 py-4">
        <div className="grid grid-cols-3 gap-6">
          {/* AI Summary */}
          <div className="col-span-2">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="size-3 text-primary" strokeWidth={2} />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">AI Summary</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{lead.aiSummary}</p>
            <div className="mt-3 flex items-center gap-3">
              <Button size="sm" variant="primary">
                {lead.nextActionAI && <Sparkles className="size-3" strokeWidth={2} />}
                {lead.nextAction}
              </Button>
              <Button size="sm" variant="secondary">
                <MessageSquare className="size-3.5" strokeWidth={2} />
                Message
              </Button>
              <Button size="sm" variant="ghost">
                <Phone className="size-3.5" strokeWidth={2} />
                Call
              </Button>
            </div>
          </div>

          {/* Timeline preview */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Clock className="size-3 text-muted-foreground/60" strokeWidth={2} />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Recent</span>
            </div>
            <div className="relative pl-3 border-l-2 border-border/30 space-y-2.5">
              {[
                { text: `${lead.worker.name} ${lead.worker.action.toLowerCase()}`, time: lead.worker.time },
                { text: "Lead captured via " + lead.source, time: "Yesterday" },
              ].map((e, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[11px] top-1 size-1.5 rounded-full bg-border" />
                  <p className="text-[12px] text-foreground leading-snug">{e.text}</p>
                  <span className="text-[10px] text-muted-foreground/50">{e.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function LeadTable() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = leads.filter((l) => {
    if (activeFilter !== "All" && getStatusGroup(l.status) !== activeFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!l.name.toLowerCase().includes(q) && !l.company.toLowerCase().includes(q) && !l.source.toLowerCase().includes(q)) return false
    }
    return true
  })

  const activeCount = leads.filter((l) => l.status === "ready" || l.status === "qualified").length
  const pipelineTotal = leads.reduce((s, l) => s + l.pipelineNumeric, 0)

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
          <Button size="sm" className="text-xs">+ New Lead</Button>
        </div>
      </div>

      {/* AI Brief */}
      <div className="relative overflow-hidden rounded-xl border border-primary/15 bg-primary-light/80 p-4 transition-all duration-150 hover:border-primary/25">
        <div className="flex items-start gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="size-4 text-primary" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">
              <span className="text-primary">Elena</span> found <span className="font-semibold">3 leads worth ₹45L</span> ready to close today.
            </p>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              High intent, pre-qualified, awaiting your review.
            </p>
          </div>
          <button className="group/btn flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-primary transition-all duration-100 hover:bg-primary/10">
            Review now
            <ChevronDown className="size-3 rotate-[-90deg]" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Toolbar: Search + Views + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/50" strokeWidth={2} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="h-8 w-full rounded-lg border border-border bg-card pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none transition-colors focus:border-primary/50"
          />
        </div>

        {/* Views + Gmail Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 rounded-lg bg-muted/50 p-0.5">
            {["All", "Qualified", "Needs Review", "Recoverable", "Lost"].map((f) => (
              <button
                key={f}
                onClick={() => { setActiveFilter(f); setExpandedId(null) }}
                className={cn(
                  "rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-100",
                  activeFilter === f
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f === "Needs Review" ? "Review" : f === "Recoverable" ? "Recover" : f}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-colors",
              showFilters ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <MoreHorizontal className="size-3" strokeWidth={2} />
            Filters
          </button>
        </div>
      </div>

      {/* Lead list */}
      <div className="flex flex-col rounded-xl border border-border/50 bg-card overflow-hidden">
        {filtered.map((lead, i) => {
          const isExpanded = expandedId === lead.id
          return (
            <div key={lead.id} className={cn("border-b border-border/30 last:border-0")}>
              {/* Row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/20"
              >
                {/* Expand chevron */}
                <ChevronDown
                  className={cn(
                    "size-3 shrink-0 text-muted-foreground/40 transition-transform duration-100",
                    isExpanded && "rotate-180"
                  )}
                  strokeWidth={2}
                />

                {/* Name + Summary */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <LeadAvatar name={lead.name} size="sm" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{lead.name}</span>
                      <AiScore value={lead.aiScore} />
                    </div>
                    <p className="truncate text-[12px] text-muted-foreground">{lead.aiSummary}</p>
                  </div>
                </div>

                {/* Source + Value */}
                <div className="hidden xl:block min-w-[120px]">
                  <p className="text-xs text-muted-foreground">{lead.source}</p>
                  <p className="text-sm font-semibold text-foreground tabular-nums">{lead.pipelineValue}</p>
                </div>

                {/* Status */}
                <div className="hidden lg:flex items-center gap-1.5 min-w-[90px]">
                  <StatusDot status={lead.status} />
                  <span className="text-xs text-muted-foreground capitalize">{lead.status.replace("_", " ")}</span>
                </div>

                {/* Worker */}
                <div className="hidden lg:block min-w-[120px]">
                  <p className="text-xs font-medium text-foreground">{lead.worker.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted-foreground/60">{lead.worker.action}</span>
                    <span className="text-[10px] text-muted-foreground/40">&middot;</span>
                    <span className="text-[10px] text-muted-foreground/40 tabular-nums">{lead.worker.time}</span>
                  </div>
                </div>

                {/* Next Action */}
                <div className="hidden 2xl:block min-w-[140px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-foreground">{lead.nextAction}</span>
                    {lead.nextActionAI && (
                      <span className="rounded bg-primary/10 px-1 py-0.5 text-[9px] font-semibold text-primary">AI</span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground/60 tabular-nums">{lead.nextActionTime}</span>
                </div>

                {/* Confidence */}
                <div className="hidden sm:block min-w-[130px]">
                  <LeadConfidence value={lead.confidence} size="sm" />
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && <LeadExpanded lead={lead} />}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground/60">
          {filtered.length} of {leads.length} leads
        </span>
      </div>
    </div>
  )
}
