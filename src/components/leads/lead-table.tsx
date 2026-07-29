"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sparkles, ChevronDown, MessageSquare, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { LeadAvatar } from "@/components/leads/lead-avatar"
import { Button } from "@/components/ui/button"
import { AiBrief } from "@/components/leads/ai-brief"

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
  statusLabel: string
  worker: { name: string; action: string; time: string }
  nextAction: string
  nextActionTime: string
  nextActionAI: boolean
  lastMessage: string
}

const leads: Lead[] = [
  {
    id: "1", name: "Rahul Patel", company: "Self-employed", aiSummary: "Looking for a 3BHK in Whitefield. Budget ₹1.4Cr. Requested callback tomorrow.",
    aiScore: 92, confidence: 92, source: "Google Ads", pipelineValue: "₹1.2Cr", pipelineNumeric: 1.2,
    status: "ready", statusLabel: "Ready", worker: { name: "Elena", action: "Responding", time: "2m" },
    nextAction: "Schedule Visit", nextActionTime: "Tomorrow 11AM", nextActionAI: true,
    lastMessage: "Can I visit this weekend?",
  },
  {
    id: "2", name: "Priya Sharma", company: "TCS", aiSummary: "Pre-qualified for 2BHK in Wakad. Budget ₹85L. Ready for site visit.",
    aiScore: 87, confidence: 87, source: "Website Form", pipelineValue: "₹85L", pipelineNumeric: 0.85,
    status: "qualified", statusLabel: "Qualified", worker: { name: "Marcus", action: "Qualifying", time: "15m" },
    nextAction: "Send Proposal", nextActionTime: "Today", nextActionAI: false,
    lastMessage: "Shared requirements via form",
  },
  {
    id: "3", name: "Amit Singh", company: "Infosys", aiSummary: "Interested in investment property. Budget ₹65L. Needs follow-up.",
    aiScore: 45, confidence: 45, source: "Meta Ads", pipelineValue: "₹65L", pipelineNumeric: 0.65,
    status: "review", statusLabel: "Needs Review", worker: { name: "Priya", action: "Analyzing", time: "1h" },
    nextAction: "Initial Outreach", nextActionTime: "Tomorrow", nextActionAI: true,
    lastMessage: "Asked about ROI projections",
  },
  {
    id: "4", name: "Sneha Reddy", company: "Dental Clinic", aiSummary: "Looking for commercial space. Budget ₹1.5Cr. Has seen 3 properties.",
    aiScore: 72, confidence: 72, source: "WhatsApp", pipelineValue: "₹1.5Cr", pipelineNumeric: 1.5,
    status: "qualified", statusLabel: "Qualified", worker: { name: "Aria", action: "Follow-up", time: "3h" },
    nextAction: "Day 1 Follow-up", nextActionTime: "Today", nextActionAI: false,
    lastMessage: "Sent photos of 3 properties",
  },
  {
    id: "5", name: "Vikram Joshi", company: "Wipro", aiSummary: "Nurturing — visited site 2 weeks ago. Needs re-engagement.",
    aiScore: 34, confidence: 34, source: "Landing Page", pipelineValue: "₹95L", pipelineNumeric: 0.95,
    status: "lost", statusLabel: "Lost", worker: { name: "Recovery", action: "Campaign #18", time: "1d" },
    nextAction: "Re-engage", nextActionTime: "This week", nextActionAI: true,
    lastMessage: "Not responding to emails",
  },
  {
    id: "6", name: "Ananya Gupta", company: "Startup", aiSummary: "Ready to book 4BHK in Viman Nagar. Budget ₹2.1Cr. Awaiting confirmation.",
    aiScore: 95, confidence: 95, source: "Google Ads", pipelineValue: "₹2.1Cr", pipelineNumeric: 2.1,
    status: "ready", statusLabel: "Ready", worker: { name: "Elena", action: "Confirming", time: "30m" },
    nextAction: "Confirm Visit", nextActionTime: "Tomorrow 11AM", nextActionAI: true,
    lastMessage: "Confirmed availability",
  },
  {
    id: "7", name: "Deepak Verma", company: "HDFC Bank", aiSummary: "Lost — went with competitor. Recoverable via callback campaign.",
    aiScore: 12, confidence: 12, source: "CRM Import", pipelineValue: "₹0", pipelineNumeric: 0,
    status: "lost", statusLabel: "Lost", worker: { name: "Recovery", action: "Campaign #19", time: "5d" },
    nextAction: "Recovery Callback", nextActionTime: "Next week", nextActionAI: false,
    lastMessage: "Chose competitor property",
  },
  {
    id: "8", name: "Neha Kapoor", company: "Freelancer", aiSummary: "Was interested in 1BHK. Budget ₹55L. Recoverable via campaign.",
    aiScore: 28, confidence: 28, source: "Meta Ads", pipelineValue: "₹55L", pipelineNumeric: 0.55,
    status: "recoverable", statusLabel: "Recoverable", worker: { name: "Recovery", action: "Campaign #18", time: "2d" },
    nextAction: "Re-engage", nextActionTime: "In progress", nextActionAI: true,
    lastMessage: "Was out of town",
  },
  {
    id: "9", name: "Rohan Desai", company: "Deloitte", aiSummary: "High intent — looking for 3BHK in Hinjewadi. Budget ₹1.8Cr. Pre-approved.",
    aiScore: 88, confidence: 88, source: "WhatsApp", pipelineValue: "₹1.8Cr", pipelineNumeric: 1.8,
    status: "qualified", statusLabel: "Qualified", worker: { name: "Marcus", action: "Qualifying", time: "45m" },
    nextAction: "Schedule Viewing", nextActionTime: "Fri 4PM", nextActionAI: true,
    lastMessage: "Sent loan approval letter",
  },
  {
    id: "10", name: "Kavita Iyer", company: "Doctor", aiSummary: "New — enquired about 2BHK. Budget ₹72L. Needs initial call.",
    aiScore: 55, confidence: 55, source: "Website Form", pipelineValue: "₹72L", pipelineNumeric: 0.72,
    status: "review", statusLabel: "Needs Review", worker: { name: "Elena", action: "Drafting", time: "30m" },
    nextAction: "Initial Outreach", nextActionTime: "Today", nextActionAI: false,
    lastMessage: "Enquired via website form",
  },
]

const filters = ["All", "Qualified", "Review", "Recover", "Lost"]

const statusColors: Record<string, string> = {
  ready: "bg-success text-success border-success/20",
  qualified: "bg-primary text-primary border-primary/20",
  review: "bg-warning text-warning border-warning/20",
  recoverable: "bg-info text-info border-info/20",
  lost: "bg-muted-foreground/10 text-muted-foreground/60 border-transparent",
}

function getStatusGroup(lead: Lead): string {
  if (lead.status === "qualified" || lead.status === "ready") return "Qualified"
  if (lead.status === "review") return "Review"
  if (lead.status === "recoverable") return "Recover"
  if (lead.status === "lost") return "Lost"
  return "All"
}

function confidenceLabel(value: number): { label: string; color: string } {
  if (value >= 80) return { label: "High Intent", color: "text-success" }
  if (value >= 50) return { label: "Moderate", color: "text-warning" }
  return { label: "Low", color: "text-muted-foreground/50" }
}

function ActionButton({ lead }: { lead: Lead }) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <span className="text-xs font-medium text-foreground">{lead.nextAction}</span>
      <ChevronDown className="size-3 -rotate-90 text-muted-foreground/40" strokeWidth={2} />
    </div>
  )
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
      <AiBrief />

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/50" strokeWidth={2} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="h-8 w-full rounded-lg border border-border bg-card pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none transition-colors focus:border-primary/50"
          />
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
      <div className="flex flex-col gap-1">
        {filtered.map((lead, i) => {
          const isHovered = hoveredId === lead.id
          const isExpanded = expandedId === lead.id
          const conf = confidenceLabel(lead.confidence)
          const statusStyle = statusColors[lead.status]

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
                  "group cursor-pointer rounded-xl border transition-all duration-100",
                  isExpanded
                    ? "border-primary/20 bg-primary-light/40 shadow-sm"
                    : isHovered
                    ? "border-border-hover bg-card shadow-sm"
                    : "border-transparent bg-transparent hover:border-border/50 hover:bg-muted/10"
                )}
              >
                {/* Main row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                  className="flex w-full items-start gap-4 px-4 py-3 text-left"
                >
                  {/* Identity: Avatar + Name + Score */}
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <LeadAvatar name={lead.name} source={lead.source} size="sm" />
                    <div className="min-w-0 pt-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{lead.name}</span>
                        <span className="text-[10px] tabular-nums font-medium text-muted-foreground/50">{lead.aiScore}</span>
                      </div>
                      <p className="text-[12px] text-muted-foreground leading-snug line-clamp-1">{lead.aiSummary}</p>
                      <span className="text-[10px] text-muted-foreground/40 mt-0.5 block">{lead.pipelineValue}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="hidden md:flex items-center gap-1.5 min-w-[80px] pt-1">
                    <span className={cn("size-2 rounded-full shrink-0", statusColors[lead.status].split(" ")[0])} />
                    <span className={cn("text-[11px] font-medium", statusColors[lead.status].split(" ")[1])}>
                      {lead.statusLabel}
                    </span>
                  </div>

                  {/* Worker */}
                  <div className="hidden lg:block min-w-[100px] pt-1">
                    <p className="text-xs font-medium text-foreground">{lead.worker.name}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-muted-foreground/60">{lead.worker.action}</span>
                      <span className="text-[10px] text-muted-foreground/30">&middot;</span>
                      <span className="text-[10px] text-muted-foreground/40 tabular-nums">{lead.worker.time}</span>
                    </div>
                  </div>

                  {/* AI Confidence */}
                  <div className="hidden sm:flex flex-col items-end min-w-[70px] pt-1">
                    <span className={cn("text-sm font-semibold tabular-nums leading-none", conf.color)}>
                      {lead.confidence}%
                    </span>
                    <span className={cn("text-[10px] font-medium mt-0.5", conf.color)}>{conf.label}</span>
                  </div>

                  {/* Action (always last column) */}
                  <div className="hidden 2xl:flex items-center gap-1.5 pt-1 min-w-fit shrink-0">
                    <span className="text-xs font-medium text-foreground">{lead.nextAction}</span>
                    {lead.nextActionAI && (
                      <span className="rounded bg-primary/10 px-1 py-0.5 text-[9px] font-semibold text-primary leading-none">AI</span>
                    )}
                    <ChevronDown className="size-3 -rotate-90 text-muted-foreground/30" strokeWidth={2} />
                  </div>
                </button>

                {/* Hover band: AI summary + last message */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border/20 px-4 py-2.5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] text-foreground/80 leading-relaxed">{lead.aiSummary}</p>
                            <p className="text-[11px] text-muted-foreground/60 mt-1">
                              Last message: &ldquo;{lead.lastMessage}&rdquo;
                            </p>
                          </div>
                          <button className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-primary transition-colors hover:text-primary/80">
                            View Conversation
                            <ExternalLink className="size-3" strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded band */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border/20 px-4 py-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">AI Summary</span>
                            <p className="text-sm text-foreground mt-1 leading-relaxed">{lead.aiSummary}</p>
                            <div className="flex items-center gap-2 mt-3">
                              <Button size="sm" variant="primary">
                                {lead.nextActionAI && <Sparkles className="size-3" strokeWidth={2} />}
                                {lead.nextAction}
                              </Button>
                              <Button size="sm" variant="secondary">
                                <MessageSquare className="size-3.5" strokeWidth={2} />
                                Message
                              </Button>
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Activity</span>
                            <div className="relative pl-3 mt-2 border-l-2 border-border/30 space-y-2">
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
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground/60">
          {filtered.length} of {leads.length} leads
        </span>
      </div>
    </div>
  )
}
