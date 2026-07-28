"use client"

import { FileText, BookOpen, FolderSymlink, Archive, TrendingUp } from "lucide-react"
import { MetricCard } from "@/components/shared/metric-card"
import type { KnowledgeStats } from "@/services/knowledge/knowledge.service"

type Props = { stats: KnowledgeStats }

export function KnowledgeStatsGrid({ stats }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <MetricCard label="Documents" value={String(stats.documents)} icon={FileText} trend={{ direction: "up", value: "+3 this month" }} variant="default" />
      <MetricCard label="Folders" value={String(stats.folders)} icon={BookOpen} trend={{ direction: "neutral", value: "8 categories" }} variant="default" />
      <MetricCard label="Last Updated" value={stats.lastUpdated} icon={FolderSymlink} trend={{ direction: "up", value: "Today" }} variant="info" />
      <MetricCard label="Knowledge Coverage" value={`${stats.coverage}%`} icon={TrendingUp} trend={{ direction: stats.coverage >= 90 ? "up" : stats.coverage >= 70 ? "neutral" : "down", value: `${stats.coverage >= 90 ? "Excellent" : stats.coverage >= 70 ? "Good" : "Needs work"}` }} variant={stats.coverage >= 90 ? "success" : stats.coverage >= 70 ? "warning" : "danger"} />
    </div>
  )
}
