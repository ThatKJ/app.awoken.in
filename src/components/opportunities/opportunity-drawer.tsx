"use client"

import { X, Calendar, Target, TrendingUp, AlertTriangle, Lightbulb, Activity, ArrowUpRight, Shield, Clock, Bot, MessageSquare, DollarSign } from "lucide-react"
import { OpportunityValue } from "./opportunity-value"
import { OpportunityProbability } from "./opportunity-probability"
import type { Opportunity } from "@/types"

type Props = {
  opportunity: Opportunity | null
  open: boolean
  onClose: () => void
}

export function OpportunityDrawer({ opportunity, open, onClose }: Props) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-[480px] border-l border-border bg-card shadow-premium overflow-y-auto transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">{opportunity?.lead_name}</h2>
            <p className="text-sm text-muted-foreground">{opportunity?.company}</p>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {opportunity && (
          <div className="p-6 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <QuickStat label="Value" value={<OpportunityValue value={opportunity.value} className="text-sm font-bold text-foreground" />} icon={DollarSign} />
              <QuickStat label="Stage" value={<span className="text-sm font-bold capitalize text-foreground">{opportunity.stage}</span>} icon={Target} />
              <QuickStat label="Confidence" value={<OpportunityProbability value={opportunity.confidence} size="md" />} icon={TrendingUp} />
              <QuickStat label="Expected Close" value={<span className="text-sm font-bold text-foreground">{opportunity.expected_close}</span>} icon={Calendar} />
            </div>

            {/* Assigned Worker */}
            <Section title="Assigned To" icon={Bot}>
              <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary shrink-0">
                  {opportunity.worker_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{opportunity.worker_name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{opportunity.worker_type.replace("_", " ")}</p>
                </div>
              </div>
            </Section>

            {/* Next Action */}
            <Section title="Next Action" icon={ArrowUpRight}>
              <div className="rounded-xl border border-primary/20 bg-primary/[0.03] p-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 size-2 rounded-full bg-primary shrink-0" />
                  <p className="text-sm text-foreground">{opportunity.next_action}</p>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">Last activity: {opportunity.last_activity}</p>
              </div>
            </Section>

            {/* Notes */}
            {opportunity.notes && (
              <Section title="Notes" icon={MessageSquare}>
                <p className="rounded-xl bg-muted/20 p-3 text-sm text-foreground">{opportunity.notes}</p>
              </Section>
            )}

            {/* Tags */}
            {opportunity.tags.length > 0 && (
              <Section title="Tags" icon={Shield}>
                <div className="flex flex-wrap gap-1.5">
                  {opportunity.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {/* AI Insights */}
            <Section title="AI Insights" icon={Lightbulb}>
              <div className="space-y-2">
                <InsightCard
                  icon={TrendingUp}
                  label="Win Probability"
                  value={`${opportunity.confidence}%`}
                  note={opportunity.confidence >= 80 ? "High conversion potential" : opportunity.confidence >= 50 ? "Moderate — needs attention" : "Low — consider re-engagement"}
                  color={opportunity.confidence >= 80 ? "text-success" : opportunity.confidence >= 50 ? "text-warning" : "text-destructive"}
                />
                <InsightCard
                  icon={AlertTriangle}
                  label="Risk Factor"
                  value={opportunity.priority === "high" ? "Low Risk" : opportunity.priority === "medium" ? "Medium Risk" : "High Risk"}
                  note={
                    opportunity.priority === "high"
                      ? "Deal progressing well"
                      : opportunity.priority === "medium"
                        ? "Requires follow-up this week"
                        : "Stalled — consider recovery sequence"
                  }
                  color={opportunity.priority === "high" ? "text-success" : opportunity.priority === "medium" ? "text-warning" : "text-destructive"}
                />
                <InsightCard
                  icon={Activity}
                  label="Activity Status"
                  value="Active"
                  note={opportunity.last_activity}
                  color="text-info"
                />
              </div>
            </Section>

            {/* Timeline */}
            <Section title="Activity Timeline" icon={Clock}>
              <Timeline opportunity={opportunity} />
            </Section>
          </div>
        )}
      </div>
    </>
  )
}

function QuickStat({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
        <Icon className="size-3" />
        {label}
      </div>
      {value}
    </div>
  )
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2.5">
        <Icon className="size-3.5 text-muted-foreground" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function InsightCard({
  icon: Icon,
  label,
  value,
  note,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  note: string
  color: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-3">
      <Icon className={`size-4 mt-0.5 ${color}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className={`text-xs font-bold ${color}`}>{value}</span>
        </div>
        <p className="text-xs text-muted-foreground/70 mt-0.5">{note}</p>
      </div>
    </div>
  )
}

function Timeline({ opportunity }: { opportunity: Opportunity }) {
  const events = [
    { time: "2 hours ago", label: "Follow-up call completed", type: "call" as const },
    { time: "1 day ago", label: "Proposal document shared", type: "document" as const },
    { time: "3 days ago", label: "Site visit scheduled", type: "visit" as const },
    { time: "1 week ago", label: "Initial qualification done", type: "qualification" as const },
    { time: "2 weeks ago", label: "Lead captured via WhatsApp", type: "lead" as const },
  ]

  const typeColors: Record<string, string> = {
    call: "bg-primary",
    document: "bg-warning",
    visit: "bg-info",
    qualification: "bg-success",
    lead: "bg-muted-foreground",
  }

  return (
    <div className="space-y-0">
      {events.map((event, i) => (
        <div key={i} className="relative flex gap-3 pb-4 last:pb-0">
          {i < events.length - 1 && (
            <div className="absolute left-[7px] top-3 bottom-0 w-px bg-border" />
          )}
          <div className={`relative mt-1.5 size-[14px] shrink-0 rounded-full border-2 border-background ${typeColors[event.type]}`} />
          <div className="flex-1 min-w-0 -mt-0.5">
            <p className="text-xs font-medium text-foreground">{event.label}</p>
            <p className="text-[11px] text-muted-foreground/60">{event.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
