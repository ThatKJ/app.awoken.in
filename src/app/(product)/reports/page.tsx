"use client"

import { useMemo } from "react"
import { motion, type Variants } from "framer-motion"
import { SectionHeader } from "@/components/shared/section-header"
import { ChartCard } from "@/components/reports/chart-card"
import { ReportSummaryGrid } from "@/components/reports/report-summary"
import { RevenueChart } from "@/components/reports/revenue-chart"
import { PerformanceChart } from "@/components/reports/performance-chart"
import { ConversionChart } from "@/components/reports/conversion-chart"
import { AttributionTable } from "@/components/reports/attribution-table"
import { InsightCard } from "@/components/reports/insight-card"
import { ForecastCard } from "@/components/reports/forecast-card"
import { ReportFilters } from "@/components/reports/report-filters"
import { ExportMenu } from "@/components/reports/export-menu"
import { useReportSummary, useRevenue, useWorkerAnalytics, useAttribution, useInsights, useForecast, useExportReport } from "@/hooks/use-reports"

const section: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.05 },
  }),
}

export default function ReportsPage() {
  const { data: summary } = useReportSummary()
  const { data: revenue } = useRevenue()
  const { data: workers } = useWorkerAnalytics()
  const { data: attribution } = useAttribution()
  const { data: insights } = useInsights()
  const { data: forecast } = useForecast()
  const exportMutation = useExportReport()

  const performanceData = useMemo(() => (workers ?? []).map((w) => ({
    name: w.name,
    revenue: w.revenue,
    leads: w.leads,
    conversion: w.conversion,
    roi: w.roi,
  })), [workers])

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5 py-6 px-5">
      {/* Header */}
      <motion.div custom={0} variants={section} initial="hidden" animate="visible" className="flex items-start justify-between">
        <SectionHeader
          title="Reports"
          description="Business performance across your AI workforce."
        />
        <ExportMenu onExport={(format) => exportMutation.mutate({ format })} />
      </motion.div>

      {/* Filters */}
      <motion.div custom={1} variants={section} initial="hidden" animate="visible">
        <ReportFilters />
      </motion.div>

      {/* KPI Summary */}
      {summary && (
        <motion.div custom={2} variants={section} initial="hidden" animate="visible">
          <ReportSummaryGrid summary={summary} />
        </motion.div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <motion.div custom={3} variants={section} initial="hidden" animate="visible">
          <ChartCard title="Revenue Over Time" subtitle="Monthly revenue vs pipeline creation">
            {revenue && <RevenueChart data={revenue} />}
          </ChartCard>
        </motion.div>

        <motion.div custom={4} variants={section} initial="hidden" animate="visible">
          <ChartCard title="Worker Performance" subtitle="Revenue by AI worker">
            {workers && <PerformanceChart data={performanceData} />}
          </ChartCard>
        </motion.div>

        <motion.div custom={5} variants={section} initial="hidden" animate="visible">
          <ChartCard title="Conversion Funnel" subtitle="Lead-to-deal conversion pipeline">
            <ConversionChart />
          </ChartCard>
        </motion.div>

        <motion.div custom={6} variants={section} initial="hidden" animate="visible">
          <ChartCard title="30-Day Forecast" subtitle="Predicted revenue with 80% confidence interval">
            {forecast && <ForecastCard data={forecast} />}
          </ChartCard>
        </motion.div>
      </div>

      {/* Revenue Attribution */}
      <motion.div custom={7} variants={section} initial="hidden" animate="visible">
        <ChartCard title="Revenue Attribution" subtitle="Revenue contribution by worker">
          {attribution && <AttributionTable data={attribution} />}
        </ChartCard>
      </motion.div>

      {/* AI Insights */}
      <motion.div custom={8} variants={section} initial="hidden" animate="visible">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">AI Insights</h2>
              <p className="text-sm text-muted-foreground">What happened, why it happened, and what to do next.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {insights?.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
