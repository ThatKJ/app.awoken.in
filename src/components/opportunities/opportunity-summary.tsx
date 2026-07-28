"use client"

import { TrendingUp, Target, DollarSign, CheckCircle2 } from "lucide-react"
import { MetricCard } from "@/components/shared/metric-card"

type Props = {
  total: number
  open: number
  won: number
  wonValue: number
}

export function OpportunitySummaryMetrics({ total, open, won, wonValue }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <MetricCard
        label="Pipeline Value"
        value={`₹${(total / 10000000).toFixed(1)}Cr`}
        icon={DollarSign}
        trend={{ direction: "up", value: "+12.5%" }}
        variant="info"
      />
      <MetricCard
        label="Open Deals"
        value={String(open)}
        icon={Target}
        trend={{ direction: "up", value: "+2 this week" }}
        variant="default"
      />
      <MetricCard
        label="Won Deals"
        value={String(won)}
        icon={CheckCircle2}
        trend={{ direction: "up", value: "This quarter" }}
        variant="success"
      />
      <MetricCard
        label="Revenue Realized"
        value={`₹${(wonValue / 10000000).toFixed(1)}Cr`}
        icon={TrendingUp}
        trend={{ direction: "up", value: "85% of target" }}
        variant="success"
      />
    </div>
  )
}
