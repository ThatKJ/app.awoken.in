"use client"

import { AlertTriangle, TrendingUp, Award, BarChart3, Zap, LineChart, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Insight } from "@/services/reports/reports.service"

const iconMap: Record<string, typeof AlertTriangle> = {
  bottleneck: AlertTriangle,
  opportunity: TrendingUp,
  top_performer: Award,
  campaign: BarChart3,
  automation: Zap,
  forecast: LineChart,
}

const colorMap: Record<string, string> = {
  bottleneck: "border-l-destructive",
  opportunity: "border-l-success",
  top_performer: "border-l-primary",
  campaign: "border-l-warning",
  automation: "border-l-info",
  forecast: "border-l-primary",
}

const iconColorMap: Record<string, string> = {
  bottleneck: "text-destructive",
  opportunity: "text-success",
  top_performer: "text-primary",
  campaign: "text-warning",
  automation: "text-info",
  forecast: "text-primary",
}

type InsightCardProps = {
  insight: Insight
}

export function InsightCard({ insight }: InsightCardProps) {
  const Icon = iconMap[insight.type] || AlertTriangle

  return (
    <div className={cn("rounded-2xl border border-border bg-card border-l-[3px] transition-all hover:shadow-soft", colorMap[insight.type])}>
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={cn("flex size-8 items-center justify-center rounded-lg bg-muted/50", iconColorMap[insight.type])}>
              <Icon className="size-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">{insight.title}</h4>
              <p className="text-xs text-muted-foreground">
                {insight.type === "bottleneck" && "Bottleneck"}
                {insight.type === "opportunity" && "Opportunity"}
                {insight.type === "top_performer" && "Top Performer"}
                {insight.type === "campaign" && "Campaign Analysis"}
                {insight.type === "automation" && "Automation Suggestion"}
                {insight.type === "forecast" && "Forecast"}
              </p>
            </div>
          </div>
          <div className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium", insight.confidence >= 90 ? "bg-success/10 text-success" : insight.confidence >= 80 ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning")}>
            {insight.confidence}% confidence
          </div>
        </div>

        {/* Explanation */}
        <p className="text-xs text-muted-foreground leading-relaxed">{insight.explanation}</p>

        {/* Metric + Change */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-foreground/60">{insight.metric}</span>
          <span className={cn("text-xs font-semibold", insight.positive ? "text-success" : "text-destructive")}>
            {insight.change}
          </span>
        </div>

        {/* Action */}
        <div className="flex items-start gap-2 rounded-lg bg-muted/20 p-2.5">
          <ArrowRight className={cn("size-3.5 mt-0.5 shrink-0", iconColorMap[insight.type])} />
          <p className="text-[11px] text-foreground/80 leading-relaxed">{insight.action}</p>
        </div>
      </div>
    </div>
  )
}
