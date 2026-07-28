"use client"

import { useState } from "react"
import { X, Wifi, Clock, Activity, Settings, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Unplug } from "lucide-react"
import { cn } from "@/lib/utils"
import { IntegrationService, type Integration, type IntegrationLog } from "@/services/integrations/integrations.service"
import { IntegrationStatusBadge, IntegrationHealthIndicator } from "./integration-status"
import { useQuery } from "@tanstack/react-query"

type Props = {
  integration: Integration | null
  open: boolean
  onClose: () => void
  onConnect?: (id: string) => void
  onDisconnect?: (id: string) => void
}

const tabs = ["Overview", "Workers", "Health", "Activity", "Logs"] as const
type Tab = (typeof tabs)[number]

const categoryLabels: Record<string, string> = {
  communication: "Communication",
  calendar: "Calendar",
  crm: "CRM",
  forms: "Forms",
  automation: "Automation",
  storage: "Storage",
  payments: "Payments",
}

export function IntegrationDrawer({ integration, open, onClose, onConnect, onDisconnect }: Props) {
  const [tab, setTab] = useState<Tab>("Overview")

  const { data: logs } = useQuery({
    queryKey: ["integrations", "logs", integration?.id ?? ""],
    queryFn: () => IntegrationService.getLogs(integration!.id),
    enabled: !!integration && tab === "Logs",
  })

  if (!integration) return null

  const i = integration

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 h-full w-[520px] border-l border-border bg-card shadow-premium overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4 sticky top-0 bg-card z-10">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex size-10 items-center justify-center rounded-xl font-bold text-sm",
              i.status === "disconnected" || i.status === "expired" ? "bg-muted/30 text-muted-foreground" : "bg-primary/10 text-primary",
            )}>
              {i.logo}
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{i.name}</h2>
              <p className="text-xs text-muted-foreground">{categoryLabels[i.category]} · v{i.version}</p>
            </div>
          </div>
          <button onClick={onClose} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <X className="size-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border/50 px-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-3 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap",
                tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === "Overview" && <OverviewTab integration={i} onConnect={onConnect} onDisconnect={onDisconnect} />}
          {tab === "Workers" && <WorkersTab integration={i} />}
          {tab === "Health" && <HealthTab integration={i} />}
          {tab === "Activity" && <ActivityTab integration={i} />}
          {tab === "Logs" && <LogsTab integration={i} logs={logs ?? []} />}
        </div>
      </div>
    </>
  )
}

function OverviewTab({ integration: i, onConnect, onDisconnect }: { integration: Integration; onConnect?: (id: string) => void; onDisconnect?: (id: string) => void }) {
  return (
    <div className="space-y-5">
      {/* Status row */}
      <div className="flex items-center gap-3">
        <IntegrationStatusBadge status={i.status} size="md" />
        <IntegrationHealthIndicator health={i.health} size="md" />
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-3">
        <MetaCard label="Connected Since" value={i.connectedSince !== "—" ? i.connectedSince : "Never"} />
        <MetaCard label="Last Sync" value={i.lastSync} />
        <MetaCard label="API Latency" value={`${i.apiLatency}ms`} />
        <MetaCard label="Webhook" value={i.webhookStatus === "active" ? "Active" : i.webhookStatus === "failing" ? "Failing" : "Inactive"} valueClass={i.webhookStatus === "active" ? "text-success" : i.webhookStatus === "failing" ? "text-destructive" : "text-muted-foreground"} />
        <MetaCard label="Token Expiry" value={i.tokenExpiry} />
        <MetaCard label="Owner" value={i.owner} />
      </div>

      <div className="h-px bg-border/50" />

      {/* Permissions */}
      <Section icon={Settings} label="Permissions">
        <div className="space-y-1.5">
          {i.permissions.map((p) => (
            <div key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="size-3 text-success shrink-0" />
              {p}
            </div>
          ))}
        </div>
      </Section>

      {/* Description */}
      <Section icon={Activity} label="Description">
        <p className="text-sm text-muted-foreground leading-relaxed">{i.description}</p>
      </Section>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        {i.status === "disconnected" || i.status === "expired" ? (
          <button onClick={() => onConnect?.(i.id)} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Wifi className="size-4" />
            Connect
          </button>
        ) : (
          <>
            <button onClick={() => onConnect?.(i.id)} className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-primary/30 transition-colors">
              <RefreshCw className="size-4" />
              Reconnect
            </button>
            <button onClick={() => onDisconnect?.(i.id)} className="flex items-center gap-2 rounded-xl border border-destructive/20 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors">
              <Unplug className="size-4" />
              Disconnect
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function WorkersTab({ integration: i }: { integration: Integration }) {
  return (
    <div className="space-y-2">
      {i.workers.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">No workers connected to this integration.</p>
      )}
      {i.workers.map((w) => (
        <div key={w.id} className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/15 p-3">
          <div className={cn(
            "flex size-9 items-center justify-center rounded-full text-[9px] font-bold",
            w.status === "using" ? "bg-primary/15 text-primary" : w.status === "idle" ? "bg-muted/30 text-muted-foreground" : "bg-muted/10 text-muted-foreground/30",
          )}>
            {w.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{w.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{w.type.replace("_", " ")}</p>
          </div>
          <span className={cn(
            "text-[10px] font-medium px-2 py-0.5 rounded-full",
            w.status === "using" ? "bg-success/10 text-success" : w.status === "idle" ? "bg-muted/20 text-muted-foreground" : "bg-muted/10 text-muted-foreground/40",
          )}>
            {w.status}
          </span>
        </div>
      ))}
    </div>
  )
}

function HealthTab({ integration: i }: { integration: Integration }) {
  const metrics = [
    { label: "API Response Time", value: `${i.apiLatency}ms`, status: i.apiLatency < 100 ? "good" : i.apiLatency < 300 ? "warn" : "bad" },
    { label: "Webhook Delivery", value: i.webhookStatus, status: i.webhookStatus === "active" ? "good" : i.webhookStatus === "failing" ? "bad" : "warn" },
    { label: "Last Success", value: "2 minutes ago", status: "good" },
    { label: "Last Failure", value: i.id === "i8" ? "1 hour ago" : i.id === "i4" ? "2 hours ago" : "None", status: i.id === "i8" || i.id === "i4" ? "bad" : "good" },
    { label: "Token Status", value: i.tokenExpiry === "—" ? "No token" : new Date(i.tokenExpiry) > new Date() ? "Valid" : "Expired", status: i.tokenExpiry === "—" ? "neutral" : new Date(i.tokenExpiry) > new Date() ? "good" : "bad" },
  ]

  return (
    <div className="space-y-2">
      {metrics.map((m) => (
        <div key={m.label} className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/15 px-4 py-3">
          <span className="text-sm text-muted-foreground">{m.label}</span>
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-sm font-medium",
              m.status === "good" ? "text-success" : m.status === "warn" ? "text-warning" : m.status === "bad" ? "text-destructive" : "text-muted-foreground",
            )}>
              {m.value}
            </span>
            {m.status === "good" ? <CheckCircle2 className="size-3.5 text-success" /> :
             m.status === "bad" ? <XCircle className="size-3.5 text-destructive" /> :
             <AlertTriangle className="size-3.5 text-warning" />}
          </div>
        </div>
      ))}
    </div>
  )
}

function ActivityTab({ integration: i }: { integration: Integration }) {
  return (
    <div className="space-y-0">
      {i.recentActivity.map((a, idx) => (
        <div key={idx} className="relative flex gap-3 pb-4 last:pb-0">
          {idx < i.recentActivity.length - 1 && <div className="absolute left-[7px] top-3 bottom-0 w-px bg-border" />}
          <div className="relative mt-1.5 size-[14px] shrink-0 rounded-full border-2 border-background bg-primary/20" />
          <div className="flex-1 min-w-0 -mt-0.5">
            <p className="text-xs font-medium text-foreground">{a.action}</p>
            <p className="text-[11px] text-muted-foreground/60">{a.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function LogsTab({ integration: i, logs }: { integration: Integration; logs: IntegrationLog[] }) {
  return (
    <div className="space-y-1">
      {logs.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">No logs available.</p>
      )}
      {logs.map((log) => (
        <div key={log.id} className="rounded-xl border border-border/50 bg-muted/10 p-3 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={cn(
                "size-1.5 rounded-full",
                log.result === "success" ? "bg-success" : log.result === "failure" ? "bg-destructive" : "bg-warning",
              )} />
              <span className="font-medium text-foreground">{log.action}</span>
            </div>
            <span className="text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <p className="text-muted-foreground">{log.details}</p>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span>{log.result.charAt(0).toUpperCase() + log.result.slice(1)}</span>
            <span>{log.duration >= 1000 ? `${(log.duration / 1000).toFixed(1)}s` : `${log.duration}ms`}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function MetaCard({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-muted/15 px-3.5 py-2.5">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
      <p className={cn("text-sm font-semibold text-foreground", valueClass)}>{value}</p>
    </div>
  )
}

function Section({ icon: Icon, label, children }: { icon: typeof Settings; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2.5">
        <Icon className="size-3.5 text-muted-foreground" />
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</h3>
      </div>
      {children}
    </div>
  )
}
