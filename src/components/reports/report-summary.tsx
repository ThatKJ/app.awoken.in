"use client"

import { DollarSign, Target, CheckCircle2, Calendar, Clock, TrendingUp, GitPullRequestArrow } from "lucide-react"
import { MetricCard } from "@/components/shared/metric-card"
import type { ReportSummary } from "@/services/reports/reports.service"

type Props = {
  summary: ReportSummary
}

export function ReportSummaryGrid({ summary }: Props) {
  return (
    <div className="grid grid-cols-3 xl:grid-cols-6 gap-3">
      <MetricCard
        label="Revenue Recovered"
        value={`₹${(summary.revenueRecovered / 10000000).toFixed(1)}Cr`}
        icon={DollarSign}
        trend={{ direction: "up", value: "+18% vs last month" }}
        variant="success"
      />
      <MetricCard
        label="Pipeline Created"
        value={`₹${(summary.pipelineCreated / 10000000).toFixed(1)}Cr`}
        icon={GitPullRequestArrow}
        trend={{ direction: "up", value: "+12.5% MoM" }}
        variant="info"
      />
      <MetricCard
        label="Qualified Leads"
        value={String(summary.qualifiedLeads)}
        icon={Target}
        trend={{ direction: "up", value: "+32 this month" }}
        variant="default"
      />
      <MetricCard
        label="Appointments"
        value={String(summary.appointments)}
        icon={Calendar}
        trend={{ direction: "up", value: "+14 vs last month" }}
        variant="default"
      />
      <MetricCard
        label="Avg Response Time"
        value={`${summary.avgResponseTime}min`}
        icon={Clock}
        trend={{ direction: summary.avgResponseTime <= 3 ? "up" : "down", value: "Target: <3min" }}
        variant={summary.avgResponseTime <= 3 ? "success" : "danger"}
      />
      <MetricCard
        label="Conversion Rate"
        value={`${summary.conversionRate}%`}
        icon={TrendingUp}
        trend={{ direction: "up", value: "+2.1pp" }}
        variant="success"
      />
    </div>
  )
}
