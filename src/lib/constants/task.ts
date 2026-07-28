export const TASK_STATES = {
  QUEUED: "queued",
  IN_PROGRESS: "in_progress",
  AWAITING_APPROVAL: "awaiting_approval",
  ESCALATED: "escalated",
  COMPLETED: "completed",
  REJECTED: "rejected",
  FAILED: "failed",
} as const

export const TASK_LABELS: Record<string, string> = {
  queued: "Queued",
  in_progress: "In Progress",
  awaiting_approval: "Awaiting Approval",
  escalated: "Escalated",
  completed: "Completed",
  rejected: "Rejected",
  failed: "Failed",
}
