export type RevenuePoint = {
  date: string
  revenue: number
  pipeline: number
  qualified: number
}

export type WorkerAnalytic = {
  id: string
  name: string
  type: string
  revenue: number
  leads: number
  appointments: number
  conversion: number
  roi: number
  trend: "up" | "down" | "neutral"
}

export type Insight = {
  id: string
  type: "bottleneck" | "opportunity" | "top_performer" | "campaign" | "automation" | "forecast"
  title: string
  explanation: string
  confidence: number
  action: string
  metric: string
  change: string
  positive: boolean
}

export type ReportSummary = {
  revenueRecovered: number
  pipelineCreated: number
  qualifiedLeads: number
  appointments: number
  avgResponseTime: number
  conversionRate: number
  totalRevenue: number
  totalLeads: number
  totalOpportunities: number
}

export type ForecastPoint = {
  month: string
  predicted: number
  lower: number
  upper: number
}

export type AttributionRow = {
  id: string
  worker: string
  workerType: string
  revenue: number
  leads: number
  appointments: number
  conversion: number
  roi: number
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const currentMonth = new Date().getMonth()

const revenueData: RevenuePoint[] = months.map((date, i) => ({
  date,
  revenue: Math.round(5000000 + Math.random() * 15000000 + i * 800000),
  pipeline: Math.round(8000000 + Math.random() * 20000000 + i * 500000),
  qualified: Math.round(10 + Math.random() * 30 + i),
}))

const workerAnalytics: WorkerAnalytic[] = [
  { id: "w1", name: "Qualification Worker", type: "qualification", revenue: 28500000, leads: 124, appointments: 89, conversion: 72, roi: 840, trend: "up" },
  { id: "w2", name: "Response Worker", type: "lead_response", revenue: 12500000, leads: 312, appointments: 156, conversion: 50, roi: 620, trend: "up" },
  { id: "w3", name: "Follow-up Worker", type: "followup", revenue: 9800000, leads: 87, appointments: 62, conversion: 71, roi: 510, trend: "neutral" },
  { id: "w4", name: "Appointment Worker", type: "appointment", revenue: 22000000, leads: 98, appointments: 76, conversion: 78, roi: 920, trend: "up" },
  { id: "w5", name: "Recovery Worker", type: "recovery", revenue: 4500000, leads: 34, appointments: 18, conversion: 53, roi: 280, trend: "down" },
  { id: "w6", name: "Qualification Worker 2", type: "qualification", revenue: 15200000, leads: 67, appointments: 48, conversion: 72, roi: 730, trend: "up" },
]

const insights: Insight[] = [
  { id: "i1", type: "bottleneck", title: "Response Worker Overloaded", explanation: "Inbound lead volume increased 40% this month, causing average response time to rise from 2.3 to 5.1 minutes. This bottleneck is reducing qualification rates by 12%.", confidence: 92, action: "Activate an additional Response Worker instance to handle overflow.", metric: "Avg Response Time", change: "+2.8 min", positive: false },
  { id: "i2", type: "opportunity", title: "High-Value Segment Emerging", explanation: "Deals from Viman Nagar are closing 23% faster with 18% higher average value. This micro-market shows strong intent patterns.", confidence: 88, action: "Increase lead generation budget for Viman Nagar by 30%. Focus on 3BHK+ listings.", metric: "Deal Velocity", change: "+23%", positive: true },
  { id: "i3", type: "top_performer", title: "Qualification Worker Leading", explanation: "Qualification Worker has the highest ROI at 840%, converting 72% of assigned leads. It's handling 40% of total pipeline value.", confidence: 95, action: "Route 15% more leads to Qualification Worker. Consider scaling to 2 instances.", metric: "ROI", change: "840%", positive: true },
  { id: "i4", type: "campaign", title: "Google Ads Underperforming", explanation: "Cost per qualified lead from Google Ads has risen 35% while conversion rate dropped to 8%. Budget may be better allocated to WhatsApp campaigns (+22% conversion).", confidence: 85, action: "Shift 25% of Google Ads budget to WhatsApp campaigns. A/B test new ad creatives.", metric: "Cost/Lead", change: "+35%", positive: false },
  { id: "i5", type: "automation", title: "Appointment Scheduling Can Be Automated", explanation: "68% of appointment scheduling calls follow the same pattern. Current manual handling takes 8 min each.", confidence: 91, action: "Deploy an automated scheduling flow for standard 2BHK+ viewings with a one-click calendar picker.", metric: "Time Saved", change: "~40 hrs/month", positive: true },
  { id: "i6", type: "forecast", title: "30-Day Revenue Forecast: ₹6.2Cr", explanation: "Based on current pipeline velocity and historical trends, projected revenue for next 30 days is ₹5.8Cr–₹6.6Cr (80% confidence interval).", confidence: 80, action: "Maintain current qualification velocity. Watch for slowdown during month-end holiday period.", metric: "Forecast", change: "₹6.2Cr", positive: true },
]

const forecastData: ForecastPoint[] = [
  { month: "Next Month", predicted: 62000000, lower: 58000000, upper: 66000000 },
  { month: "Month +1", predicted: 68000000, lower: 62000000, upper: 74000000 },
  { month: "Month +2", predicted: 75000000, lower: 68000000, upper: 82000000 },
  { month: "Month +3", predicted: 82000000, lower: 73000000, upper: 91000000 },
]

function formatCurrency(n: number): string {
  return n >= 10000000 ? `₹${(n / 10000000).toFixed(1)}Cr` : n >= 100000 ? `₹${(n / 100000).toFixed(0)}L` : `₹${n.toLocaleString("en-IN")}`
}

export const ReportsService = {
  async getSummary(): Promise<ReportSummary> {
    return {
      revenueRecovered: 45000000,
      pipelineCreated: 92000000,
      qualifiedLeads: 284,
      appointments: 178,
      avgResponseTime: 3.2,
      conversionRate: 24.8,
      totalRevenue: 92000000,
      totalLeads: 284,
      totalOpportunities: 45,
    }
  },

  async getRevenue(): Promise<RevenuePoint[]> {
    return revenueData
  },

  async getWorkerAnalytics(): Promise<WorkerAnalytic[]> {
    return workerAnalytics
  },

  async getAttribution(): Promise<AttributionRow[]> {
    return workerAnalytics.map((w) => ({
      id: w.id,
      worker: w.name,
      workerType: w.type,
      revenue: w.revenue,
      leads: w.leads,
      appointments: w.appointments,
      conversion: w.conversion,
      roi: w.roi,
    }))
  },

  async getInsights(): Promise<Insight[]> {
    return insights
  },

  async getForecast(): Promise<ForecastPoint[]> {
    return forecastData
  },

  async exportCsv() {
    return "worker,revenue,leads,conversion,roi\n" + workerAnalytics.map((w) => `${w.name},${w.revenue},${w.leads},${w.conversion}%,${w.roi}%`).join("\n")
  },

  formatCurrency,
}
