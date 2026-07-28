"use client"

import { useState } from "react"
import { SectionHeader } from "@/components/shared/section-header"
import { MetricCard } from "@/components/shared/metric-card"
import { Search } from "@/components/shared/search"
import { Filters } from "@/components/shared/filters"
import { DataTable } from "@/components/shared/data-table"
import type { Column } from "@/components/shared/data-table"
import { Pagination } from "@/components/shared/pagination"
import { Button } from "@/components/ui/button"
import { LeadAvatar } from "@/components/leads/lead-avatar"
import { LeadStatus } from "@/components/leads/lead-status"
import { LeadConfidence } from "@/components/leads/lead-confidence"
import { Users, Download, Plus, Target, DollarSign, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { LeadTimeline } from "@/components/leads/lead-timeline"

type Lead = {
  id: string
  name: string
  company: string
  phone: string
  email: string
  status: string
  source: string
  assignedWorker: { name: string; initials: string }
  pipelineValue: string
  lastActivity: string
  confidence: number
  nextAction: string
  updatedAt: string
}

const leads: Lead[] = [
  { id: "1", name: "Rahul Patel", company: "Self-employed", phone: "+91 98765 43210", email: "rahul@email.com", status: "in_conversation", source: "Google Ads", assignedWorker: { name: "Response Worker", initials: "RW" }, pipelineValue: "₹1.2Cr", lastActivity: "2 min ago", confidence: 92, nextAction: "Schedule site visit", updatedAt: "2 min ago" },
  { id: "2", name: "Priya Sharma", company: "TCS", phone: "+91 98765 43211", email: "priya@email.com", status: "qualified", source: "Website Form", assignedWorker: { name: "Qualification Worker", initials: "QW" }, pipelineValue: "₹85L", lastActivity: "15 min ago", confidence: 87, nextAction: "Send proposals", updatedAt: "15 min ago" },
  { id: "3", name: "Amit Singh", company: "Infosys", phone: "+91 98765 43212", email: "amit@email.com", status: "new", source: "Meta Ads", assignedWorker: { name: "Response Worker", initials: "RW" }, pipelineValue: "₹65L", lastActivity: "1 hour ago", confidence: 45, nextAction: "Initial outreach", updatedAt: "1 hour ago" },
  { id: "4", name: "Sneha Reddy", company: "Dental Clinic", phone: "+91 98765 43213", email: "sneha@email.com", status: "contacted", source: "WhatsApp", assignedWorker: { name: "Follow-up Worker", initials: "FW" }, pipelineValue: "₹1.5Cr", lastActivity: "3 hours ago", confidence: 72, nextAction: "Day 1 follow-up", updatedAt: "3 hours ago" },
  { id: "5", name: "Vikram Joshi", company: "Wipro", phone: "+91 98765 43214", email: "vikram@email.com", status: "nurturing", source: "Landing Page", assignedWorker: { name: "Follow-up Worker", initials: "FW" }, pipelineValue: "₹95L", lastActivity: "1 day ago", confidence: 34, nextAction: "Re-engagement", updatedAt: "1 day ago" },
  { id: "6", name: "Ananya Gupta", company: "Startup", phone: "+91 98765 43215", email: "ananya@email.com", status: "booking_in_progress", source: "Google Ads", assignedWorker: { name: "Appointment Worker", initials: "AW" }, pipelineValue: "₹2.1Cr", lastActivity: "30 min ago", confidence: 95, nextAction: "Confirm visit time", updatedAt: "30 min ago" },
  { id: "7", name: "Deepak Verma", company: "HDFC Bank", phone: "+91 98765 43216", email: "deepak@email.com", status: "lost", source: "CRM Import", assignedWorker: { name: "Recovery Worker", initials: "Rec" }, pipelineValue: "₹0", lastActivity: "5 days ago", confidence: 12, nextAction: "—", updatedAt: "5 days ago" },
  { id: "8", name: "Neha Kapoor", company: "Freelancer", phone: "+91 98765 43217", email: "neha@email.com", status: "recoverable", source: "Meta Ads", assignedWorker: { name: "Recovery Worker", initials: "Rec" }, pipelineValue: "₹55L", lastActivity: "2 days ago", confidence: 28, nextAction: "Campaign #18", updatedAt: "2 days ago" },
  { id: "9", name: "Rohan Desai", company: "Deloitte", phone: "+91 98765 43218", email: "rohan@email.com", status: "qualified", source: "WhatsApp", assignedWorker: { name: "Qualification Worker", initials: "QW" }, pipelineValue: "₹1.8Cr", lastActivity: "45 min ago", confidence: 88, nextAction: "Schedule viewing", updatedAt: "45 min ago" },
  { id: "10", name: "Kavita Iyer", company: "Doctor", phone: "+91 98765 43219", email: "kavita@email.com", status: "new", source: "Website Form", assignedWorker: { name: "Response Worker", initials: "RW" }, pipelineValue: "₹72L", lastActivity: "30 min ago", confidence: 55, nextAction: "Initial outreach", updatedAt: "30 min ago" },
]

const statusFilterOptions = [
  { label: "All Status", value: "All" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "In Conversation", value: "in_conversation" },
  { label: "Qualified", value: "qualified" },
  { label: "Nurturing", value: "nurturing" },
  { label: "Booked", value: "booked" },
  { label: "Lost", value: "lost" },
  { label: "Recoverable", value: "recoverable" },
]

const sourceFilterOptions = [
  { label: "All Sources", value: "All" },
  { label: "Google Ads", value: "Google Ads" },
  { label: "Meta Ads", value: "Meta Ads" },
  { label: "WhatsApp", value: "WhatsApp" },
  { label: "Website Form", value: "Website Form" },
  { label: "Landing Page", value: "Landing Page" },
  { label: "CRM Import", value: "CRM Import" },
]

const summaryMetrics = [
  { icon: Users, label: "New Leads", value: "18", trend: { direction: "up" as const, value: "+23%" } },
  { icon: Target, label: "Qualified", value: "6", trend: { direction: "up" as const, value: "+2" } },
  { icon: DollarSign, label: "Pipeline Value", value: "₹12.4Cr", trend: { direction: "up" as const, value: "+8%" } },
  { icon: TrendingUp, label: "Conversion Rate", value: "24%", trend: { direction: "up" as const, value: "+3%" } },
]

const columns = [
  {
    key: "lead",
    label: "Lead",
    sortable: true,
    className: "sticky left-0 bg-card z-10 min-w-[200px]",
    render: (l: Lead) => (
      <div className="flex items-center gap-3">
        <LeadAvatar name={l.name} size="md" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{l.name}</p>
          <p className="text-xs text-muted-foreground truncate">{l.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    hideOnMobile: true,
    render: (l: Lead) => <LeadStatus status={l.status} />,
  },
  {
    key: "source",
    label: "Source",
    sortable: true,
    hideOnMobile: true,
    render: (l: Lead) => <span className="text-sm text-muted-foreground">{l.source}</span>,
  },
  {
    key: "assignedWorker",
    label: "Worker",
    sortable: true,
    hideOnMobile: true,
    render: (l: Lead) => (
      <div className="flex items-center gap-2">
        <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-[9px] font-semibold text-primary">
          {l.assignedWorker.initials}
        </div>
        <span className="text-sm text-muted-foreground truncate max-w-[100px]">{l.assignedWorker.name}</span>
      </div>
    ),
  },
  {
    key: "pipelineValue",
    label: "Pipeline Value",
    sortable: true,
    hideOnMobile: true,
    render: (l: Lead) => <span className="text-sm font-medium text-foreground">{l.pipelineValue}</span>,
  },
  {
    key: "confidence",
    label: "AI Confidence",
    sortable: true,
    hideOnMobile: true,
    render: (l: Lead) => <LeadConfidence value={l.confidence} />,
  },
  {
    key: "nextAction",
    label: "Next Action",
    hideOnMobile: true,
    render: (l: Lead) => <span className="text-sm text-muted-foreground">{l.nextAction}</span>,
  },
  {
    key: "updatedAt",
    label: "Updated",
    sortable: true,
    hideOnMobile: true,
    render: (l: Lead) => <span className="text-sm text-muted-foreground">{l.updatedAt}</span>,
  },
]

const ITEMS_PER_PAGE = 8

export function LeadTable() {
  const [activeStatus, setActiveStatus] = useState("All")
  const [activeSource, setActiveSource] = useState("All")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const filtered = leads.filter((l) => {
    if (activeStatus !== "All" && l.status !== activeStatus) return false
    if (activeSource !== "All" && l.source !== activeSource) return false
    if (search) {
      const q = search.toLowerCase()
      if (!l.name.toLowerCase().includes(q) && !l.email.toLowerCase().includes(q) && !l.phone.includes(q)) return false
    }
    return true
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <SectionHeader
        title="Leads"
        description={`${filtered.length} leads · ${leads.filter((l) => l.status === "new" || l.status === "in_conversation").length} active`}
        action={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm"><Download className="size-4" />Export</Button>
            <Button size="sm"><Plus className="size-4" />New Lead</Button>
          </div>
        }
      />

      {/* Pipeline Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {summaryMetrics.map((m) => (
          <MetricCard key={m.label} label={m.label} value={m.value} icon={m.icon} trend={m.trend} />
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Filters
            options={statusFilterOptions}
            active={activeStatus}
            onChange={(v) => { setActiveStatus(v); setPage(1) }}
          />
          <Filters
            options={sourceFilterOptions}
            active={activeSource}
            onChange={(v) => { setActiveSource(v); setPage(1) }}
          />
        </div>
        <Search
          value={search}
          onChange={(v) => { setSearch(v); setPage(1) }}
          placeholder="Search leads..."
          className="w-full sm:w-64"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns as Column<Record<string, unknown>>[]}
        data={paginated as Record<string, unknown>[]}
        keyExtractor={(item: Record<string, unknown>) => (item as unknown as Lead).id}
        onRowClick={(item: Record<string, unknown>) => setSelectedLead(item as unknown as Lead)}
      />

      {/* Pagination */}
      <Pagination current={page} total={totalPages} onPageChange={setPage} />

      {/* Detail Drawer */}
      <LeadDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  )
}

function LeadDrawer({ lead, onClose }: { lead: Lead | null; onClose: () => void }) {
  return (
    <SidePanel open={!!lead} onOpenChange={(open) => { if (!open) onClose() }} title={lead?.name ?? ""} description={lead?.company}>
      {lead && (
        <div className="flex flex-col gap-6">
          {/* Profile */}
          <div className="flex items-center gap-4">
            <LeadAvatar name={lead.name} size="lg" />
            <div>
              <p className="text-lg font-semibold text-foreground">{lead.name}</p>
              <p className="text-sm text-muted-foreground">{lead.company}</p>
            </div>
          </div>
          {/* Contact */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact</p>
            <p className="text-sm text-foreground">{lead.phone}</p>
            <p className="text-sm text-foreground">{lead.email}</p>
          </div>
          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</p>
              <div className="mt-1"><LeadStatus status={lead.status} /></div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Source</p>
              <p className="mt-1 text-sm text-foreground">{lead.source}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Assigned Worker</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-[9px] font-semibold text-primary">{lead.assignedWorker.initials}</div>
                <span className="text-sm text-foreground">{lead.assignedWorker.name}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">AI Confidence</p>
              <div className="mt-1"><LeadConfidence value={lead.confidence} size="md" /></div>
            </div>
          </div>
          {/* Timeline */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Activity</p>
            <LeadTimeline />
          </div>
        </div>
      )}
    </SidePanel>
  )
}

function SidePanel({ open, onOpenChange, title, description, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; description?: string; children: React.ReactNode }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      )}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full border-l border-border bg-card shadow-xl transition-transform duration-200 ease-out sm:max-w-lg",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-foreground truncate">{title}</h2>
            {description && <p className="text-xs text-muted-foreground truncate">{description}</p>}
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="ml-4 flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close panel"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="h-[calc(100vh-4rem)] overflow-y-auto px-5 py-5">
          {children}
        </div>
      </div>
    </>
  )
}
