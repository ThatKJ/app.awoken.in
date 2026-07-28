import type { WORKER_MODES, WORKER_HEALTH, WORKER_TYPES } from "@/lib/constants/worker"
import type { LEAD_STATUS, LEAD_SOURCES } from "@/lib/constants/lead"
import type { TASK_STATES } from "@/lib/constants/task"

export type WorkerType = (typeof WORKER_TYPES)[keyof typeof WORKER_TYPES]
export type WorkerMode = (typeof WORKER_MODES)[keyof typeof WORKER_MODES]
export type WorkerHealth = (typeof WORKER_HEALTH)[keyof typeof WORKER_HEALTH]

export type Worker = {
  id: string
  organization_id: string
  worker_type: WorkerType
  mode: WorkerMode
  name: string
  description: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type WorkerWithStats = Worker & {
  health: WorkerHealth
  queueCount: number
  stats: {
    completed: number
    failed: number
    escalated: number
    avgResponse: string
  }
}

export type LeadStatus = (typeof LEAD_STATUS)[keyof typeof LEAD_STATUS]
export type LeadSource = (typeof LEAD_SOURCES)[keyof typeof LEAD_SOURCES]

export type Lead = {
  id: string
  organization_id: string
  name: string
  phone: string | null
  email: string | null
  source: LeadSource
  status: LeadStatus
  property_interest: string | null
  budget: string | null
  assigned_worker: WorkerType | null
  created_at: string
  updated_at: string
}

export type TaskState = (typeof TASK_STATES)[keyof typeof TASK_STATES]

export type Task = {
  id: string
  organization_id: string
  lead_id: string | null
  worker_type: WorkerType
  state: TaskState
  title: string
  description: string | null
  confidence: number | null
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export type CommandCenterSummary = {
  pipelineValue: string
  tasksCompleted: number
  recoveredLeads: number
  qualified: number
  appointments: number
  activeWorkers: number
  needsAttention: number
}

export type ActivityEvent = {
  id: string
  workerType: WorkerType
  title: string
  description: string | null
  timestamp: string
  metadata?: Record<string, unknown>
}

export type MessageSender = "worker" | "human" | "lead"
export type MessageChannel = "whatsapp" | "email" | "sms"
export type MessageType = "text" | "image" | "file" | "audio" | "video" | "location"

export type Message = {
  id: string
  conversation_id: string
  sender: MessageSender
  channel: MessageChannel
  content: string
  type: MessageType
  metadata?: Record<string, unknown>
  created_at: string
}

export type Conversation = {
  id: string
  lead_id: string
  lead_name: string
  lead_avatar?: string
  channel: MessageChannel
  worker_name: string
  worker_type: string
  last_message: string
  last_timestamp: string
  unread: number
  status: "active" | "waiting" | "escalated" | "resolved"
  ai_confidence: number
  is_escalated: boolean
  is_ai: boolean
}

export type OpportunityStage = "new" | "qualified" | "proposal" | "negotiation" | "won" | "lost"

export type Opportunity = {
  id: string
  lead_id: string
  lead_name: string
  company: string
  value: number
  stage: OpportunityStage
  worker_name: string
  worker_type: string
  confidence: number
  next_action: string
  last_activity: string
  expected_close: string
  priority: "high" | "medium" | "low"
  tags: string[]
  notes: string
  created_at: string
}

// ========== Marketing / Playbook Types ==========

export type TrendDirection = "up" | "down" | "neutral"

export type SeverityLevel = "high" | "medium" | "low"

export type PipelineStatus = "healthy" | "attention" | "opportunity" | "risk"

export type Industry = {
  slug: string
  name: string
  shortDescription: string
  coreProblem: string
  revenueLeak: string
  problemStatement: string
  playbookStages: string[]
  journeySteps: string[]
  demoLabel: string
  dashboardTerminology: { leads: string; conversions: string; revenue: string; dropped: string }
}

export type PlaybookStage = {
  id: string
  title: string
  description: string
  icon: string
}

export type OpportunityPipelineStage = {
  id: string
  order: number
  name: string
  shortLabel: string
  eyebrow: string
  shortDescription: string
  whatHappens: string
  whyItMatters: string
  potentialLeak: string
  businessImpact: string
  whatTheBusinessMayNotSee: string
  awokenAction: string
  signal: string
  status: PipelineStatus
}

export type OpportunityLeak = {
  id: string
  name: string
  shortLabel: string
  category: string
  shortDescription: string
  problem: string
  whatMayHappen: string
  whatTheBusinessMayNotSee: string
  operationalSignal: string
  potentialBusinessImpact: string
  awokenRole: string
  recommendedNextStep: string
  severity: SeverityLevel
}

export type DemoLead = {
  id: string
  name: string
  initials: string
  inquiryType: string
  propertyInterest: string
  location: string
  budget: string
  timeline: string
  source: string
  status: string
  createdAt: string
  demoLabel: string
  isDemo: boolean
}

export type DemoTimelineEvent = {
  id: string
  order: number
  time: string
  label: string
  shortDescription: string
  detailedDescription: string
  eventType: string
  status: string
  isDemo: boolean
}

export type RecoveryScenario = {
  id: string
  leadName: string
  previousInterest: string
  lastInteraction: string
  lastActivity: string
  daysInactive: number
  currentStatus: string
  potentialOpportunity: string
  demoLabel: string
}

export type RecoverySequenceStep = {
  id: string
  order: number
  name: string
  shortDescription: string
  purpose: string
  status: string
}

export type BusinessMetric = {
  id: string
  label: string
  value: number
  unit: string
  change: number
  trend: TrendDirection
  description: string
  sourceLabel: string
  isDemo: boolean
}

export type AwokenSystemStep = {
  id: string
  order: number
  name: string
  shortDescription: string
  purpose: string
  output: string
}
