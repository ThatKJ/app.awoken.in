export const WORKER_TYPES = {
  LEAD_RESPONSE: "lead_response",
  QUALIFICATION: "qualification",
  FOLLOWUP: "followup",
  RECOVERY: "recovery",
  APPOINTMENT: "appointment",
} as const

export const WORKER_MODES = {
  OFF: "off",
  OBSERVING: "observing",
  ASSISTED: "assisted",
  AUTONOMOUS: "autonomous",
} as const

export const WORKER_HEALTH = {
  HEALTHY: "healthy",
  ATTENTION: "attention",
  ISSUE: "issue",
} as const

export const WORKER_LABELS: Record<string, string> = {
  lead_response: "Lead Response",
  qualification: "Qualification",
  followup: "Follow-up",
  recovery: "Recovery",
  appointment: "Appointment",
}

export const WORKER_COLORS: Record<string, string> = {
  lead_response: "#F97316",
  qualification: "#22C55E",
  followup: "#8B5CF6",
  recovery: "#8B5CF6",
  appointment: "#F59E0B",
}
