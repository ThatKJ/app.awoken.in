export interface Industry {
  slug: string
  name: string
  shortDescription: string
  coreProblem: string
  revenueLeak: string
  problemStatement: string
  playbookStages: string[]
  journeySteps: string[]
  demoLabel: string
  dashboardTerminology: Record<string, string>
}

export interface PlaybookStage {
  id: string
  title: string
  description: string
  icon: string
}

export interface RecoveryStep {
  label: string
  description: string
}

export interface IndustryJourney {
  industry: string
  steps: string[]
}

export type PipelineStatus = "healthy" | "attention" | "opportunity" | "risk"

export interface OpportunityPipelineStage {
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

export type LeakCategory =
  | "acquisition"
  | "response"
  | "qualification"
  | "matching"
  | "follow-up"
  | "visibility"

export type SeverityLevel = "low" | "medium" | "high"

export interface OpportunityLeak {
  id: string
  name: string
  shortLabel: string
  category: LeakCategory
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

export interface DemoLead {
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
  isDemo: true
}

export type TimelineEventType =
  | "incoming"
  | "detection"
  | "response"
  | "understanding"
  | "qualification"
  | "recommendation"

export type TimelineEventStatus = "pending" | "active" | "completed"

export interface DemoTimelineEvent {
  id: string
  order: number
  time: string
  label: string
  shortDescription: string
  detailedDescription: string
  eventType: TimelineEventType
  status: TimelineEventStatus
  isDemo: boolean
}

export interface RecoveryScenario {
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

export interface RecoverySequenceStep {
  id: string
  order: number
  name: string
  shortDescription: string
  purpose: string
  status: TimelineEventStatus
}

export type TrendDirection = "up" | "down" | "neutral"

export interface BusinessMetric {
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

export interface AwokenSystemStep {
  id: string
  order: number
  name: string
  shortDescription: string
  purpose: string
  output: string
}
