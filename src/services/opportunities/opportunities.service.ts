import type { Opportunity, OpportunityStage } from "@/types"

const opportunities: Opportunity[] = [
  { id: "o1", lead_id: "l1", lead_name: "Rahul Patel", company: "Self-employed", value: 12000000, stage: "negotiation", worker_name: "Qualification Worker", worker_type: "qualification", confidence: 92, next_action: "Send final proposal", last_activity: "2 hours ago", expected_close: "2024-02-15", priority: "high", tags: ["hot", "site-visit-done"], notes: "Interested in 3BHK premium floor", created_at: "2024-01-10" },
  { id: "o2", lead_id: "l2", lead_name: "Priya Sharma", company: "TCS", value: 8500000, stage: "qualified", worker_name: "Qualification Worker", worker_type: "qualification", confidence: 87, next_action: "Schedule site visit", last_activity: "1 day ago", expected_close: "2024-02-28", priority: "high", tags: ["qualified", "budget-confirmed"], notes: "Looking for 2BHK in Viman Nagar", created_at: "2024-01-12" },
  { id: "o3", lead_id: "l3", lead_name: "Amit Singh", company: "Infosys", value: 6500000, stage: "new", worker_name: "Response Worker", worker_type: "lead_response", confidence: 45, next_action: "Initial qualification call", last_activity: "3 hours ago", expected_close: "2024-03-01", priority: "medium", tags: ["new"], notes: "Called from Google Ads", created_at: "2024-01-14" },
  { id: "o4", lead_id: "l6", lead_name: "Ananya Gupta", company: "Startup", value: 21000000, stage: "proposal", worker_name: "Appointment Worker", worker_type: "appointment", confidence: 95, next_action: "Confirm visit time", last_activity: "30 min ago", expected_close: "2024-02-10", priority: "high", tags: ["hot", "premium"], notes: "CEO of funded startup, looking for luxury 4BHK", created_at: "2024-01-08" },
  { id: "o5", lead_id: "l9", lead_name: "Rohan Desai", company: "Deloitte", value: 18000000, stage: "qualified", worker_name: "Qualification Worker", worker_type: "qualification", confidence: 88, next_action: "Schedule viewing", last_activity: "45 min ago", expected_close: "2024-02-20", priority: "high", tags: ["qualified", "high-intent"], notes: "Looking for 3BHK in Kharadi", created_at: "2024-01-11" },
  { id: "o6", lead_id: "l4", lead_name: "Sneha Reddy", company: "Dental Clinic", value: 15000000, stage: "new", worker_name: "Response Worker", worker_type: "lead_response", confidence: 72, next_action: "Initial outreach", last_activity: "5 hours ago", expected_close: "2024-03-15", priority: "medium", tags: ["new"], notes: "Inquired via WhatsApp", created_at: "2024-01-15" },
  { id: "o7", lead_id: "l5", lead_name: "Vikram Joshi", company: "Wipro", value: 9500000, stage: "lost", worker_name: "Recovery Worker", worker_type: "recovery", confidence: 12, next_action: "Re-engagement campaign", last_activity: "5 days ago", expected_close: "—", priority: "low", tags: ["lost", "recoverable"], notes: "Budget constraints, but interested in future", created_at: "2024-01-05" },
  { id: "o8", lead_id: "l8", lead_name: "Neha Kapoor", company: "Freelancer", value: 5500000, stage: "negotiation", worker_name: "Recovery Worker", worker_type: "recovery", confidence: 68, next_action: "Close deal", last_activity: "1 day ago", expected_close: "2024-02-25", priority: "medium", tags: ["negotiation"], notes: "Counter-offer submitted", created_at: "2024-01-07" },
  { id: "o9", lead_id: "l10", lead_name: "Kavita Iyer", company: "Doctor", value: 7200000, stage: "proposal", worker_name: "Follow-up Worker", worker_type: "followup", confidence: 55, next_action: "Send proposal document", last_activity: "2 days ago", expected_close: "2024-03-10", priority: "medium", tags: ["proposal-sent"], notes: "Interested in 2BHK near hospital", created_at: "2024-01-13" },
  { id: "o10", lead_id: "l7", lead_name: "Deepak Verma", company: "HDFC Bank", value: 4500000, stage: "won", worker_name: "Appointment Worker", worker_type: "appointment", confidence: 100, next_action: "—", last_activity: "1 week ago", expected_close: "2024-01-30", priority: "low", tags: ["won"], notes: "Deal closed — 1BHK in Wakad", created_at: "2024-01-02" },
]

const stageOrder: OpportunityStage[] = ["new", "qualified", "proposal", "negotiation", "won", "lost"]

export const OpportunitiesService = {
  async list() {
    return opportunities
  },

  async getById(id: string) {
    return opportunities.find((o) => o.id === id) ?? null
  },

  async getByStage(stage: OpportunityStage) {
    return opportunities.filter((o) => o.stage === stage)
  },

  async getSummary() {
    const total = opportunities.reduce((sum, o) => sum + o.value, 0)
    const open = opportunities.filter((o) => o.stage !== "won" && o.stage !== "lost")
    const won = opportunities.filter((o) => o.stage === "won")
    const wonValue = won.reduce((sum, o) => sum + o.value, 0)
    return { total, open: open.length, won: won.length, wonValue }
  },

  async updateStage(id: string, stage: OpportunityStage) {
    const idx = opportunities.findIndex((o) => o.id === id)
    if (idx === -1) throw new Error("Opportunity not found")
    opportunities[idx].stage = stage
    return opportunities[idx]
  },
}
