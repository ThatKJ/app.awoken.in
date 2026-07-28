"use client"

import { MetricCard } from "@/components/shared/metric-card"
import { Plug, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react"
import type { IntegrationSummary } from "@/services/integrations/integrations.service"

type Props = { summary: IntegrationSummary }

export function IntegrationSummaryGrid({ summary }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <MetricCard label="Connected" value={String(summary.connected)} icon={Plug} trend={{ direction: "up", value: `${summary.connected} active` }} variant="success" />
      <MetricCard label="Healthy" value={String(summary.healthy)} icon={CheckCircle2} trend={{ direction: summary.healthy >= 15 ? "up" : "neutral", value: `${Math.round((summary.healthy / 20) * 100)}% of total` }} variant="default" />
      <MetricCard label="Attention Needed" value={String(summary.attention)} icon={AlertTriangle} trend={{ direction: summary.attention > 3 ? "up" : "down", value: `${summary.attention} need review` }} variant={summary.attention > 3 ? "danger" : "warning"} />
      <MetricCard label="Syncs Today" value={summary.syncsToday.toLocaleString()} icon={RefreshCw} trend={{ direction: "up", value: "+12% vs yesterday" }} variant="info" />
    </div>
  )
}
