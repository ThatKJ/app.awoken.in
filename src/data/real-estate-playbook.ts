import type {
  OpportunityPipelineStage,
  OpportunityLeak,
  DemoLead,
  DemoTimelineEvent,
  RecoveryScenario,
  RecoverySequenceStep,
  BusinessMetric,
  AwokenSystemStep,
} from "@/types"

export const opportunityPipelineStages: readonly OpportunityPipelineStage[] = [
  {
    id: "inquiry",
    order: 1,
    name: "Inquiry Received",
    shortLabel: "Inquiry",
    eyebrow: "THE ENTRY POINT",
    shortDescription:
      "A potential buyer or tenant expresses interest through a call, form, message, or walk-in.",
    whatHappens:
      "An inquiry arrives via phone, website form, WhatsApp, email, or walk-in. The person has expressed interest — a specific property, a location, or a general intent to explore.",
    whyItMatters:
      "This is the first measurable signal of demand. Every inquiry represents someone who has already taken action. The response at this point determines whether the opportunity continues or ends here.",
    potentialLeak:
      "Inquiries are missed, delayed, or mishandled because there is no structured intake. The opportunity ends before it begins.",
    businessImpact:
      "Unstructured intake means opportunities disappear without anyone knowing they existed.",
    whatTheBusinessMayNotSee:
      "How many inquiries arrive. Which channels generate them. Which ones receive a response and which do not.",
    awokenAction:
      "Every inbound signal is captured and acknowledged immediately. Context is preserved and the next action is clear.",
    signal: "Inquiry volume, source breakdown, response time",
    status: "opportunity",
  },
  {
    id: "first-response",
    order: 2,
    name: "First Response",
    shortLabel: "Response",
    eyebrow: "THE FIRST MOMENT",
    shortDescription:
      "The inquiry receives acknowledgment and the initial exchange begins.",
    whatHappens:
      "Someone responds — or does not. A call is returned, a message is sent, or the inquiry sits unattended.",
    whyItMatters:
      "Response time is the strongest predictor of conversion in real estate. A delay of minutes reduces contact probability significantly. The first response sets the tone for everything that follows.",
    potentialLeak:
      "Slow or absent response causes the lead to move on to another agent or agency before a conversation begins.",
    businessImpact:
      "Every hour of delay compounds the likelihood that the opportunity disappears.",
    whatTheBusinessMayNotSee:
      "Actual response time versus optimal response time. Which team members respond fastest. Which channels have the fastest response.",
    awokenAction:
      "Instant, contextual response across the appropriate channel. The prospect receives acknowledgment and knows someone is engaged.",
    signal: "Response time, response rate, channel used",
    status: "risk",
  },
  {
    id: "conversation",
    order: 3,
    name: "Conversation Started",
    shortLabel: "Conversation",
    eyebrow: "UNDERSTANDING BEGINS",
    shortDescription:
      "A meaningful exchange begins. Needs, preferences, and timing start to surface.",
    whatHappens:
      "The conversation moves beyond the initial inquiry. The prospect shares what they are looking for, their timeline, budget, and preferences.",
    whyItMatters:
      "This is where intent becomes specific. Without a structured conversation, needs remain unclear and the follow-up cannot be relevant.",
    potentialLeak:
      "Conversations stall or become generic because there is no system to capture preferences, timeline, and decision criteria.",
    businessImpact:
      "Unstructured conversations lead to irrelevant follow-ups, mismatched properties, and lost trust.",
    whatTheBusinessMayNotSee:
      "What prospects actually care about. Which needs are most common. Where conversations stall.",
    awokenAction:
      "Conversation context is captured and structured. Preferences, timing, and criteria are recorded and accessible.",
    signal: "Conversation depth, preference capture rate, response quality",
    status: "opportunity",
  },
  {
    id: "qualification",
    order: 4,
    name: "Qualification",
    shortLabel: "Qualification",
    eyebrow: "UNDERSTANDING THE OPPORTUNITY",
    shortDescription:
      "The prospect's intent, timing, and capacity are assessed against what is available.",
    whatHappens:
      "The lead is evaluated — budget, timeline, location preference, decision readiness. Serious opportunities begin to separate from exploratory inquiries.",
    whyItMatters:
      "Qualification prevents wasted effort on mismatched opportunities and helps prioritize genuine prospects.",
    potentialLeak:
      "Leads are overqualified too early or underqualified, pursued indefinitely without progress.",
    businessImpact:
      "Poor qualification wastes agent time on low-probability opportunities and misses serious buyers who do not fit a narrow profile.",
    whatTheBusinessMayNotSee:
      "Which criteria genuinely predict conversion. How many qualified opportunities are currently active.",
    awokenAction:
      "Qualification criteria are applied consistently. Every lead has a clear profile and next action based on readiness.",
    signal: "Qualification rate, lead score distribution, time to qualify",
    status: "attention",
  },
  {
    id: "property-match",
    order: 5,
    name: "Property Match",
    shortLabel: "Match",
    eyebrow: "CONNECTING DEMAND TO SUPPLY",
    shortDescription:
      "Available properties are matched against the prospect's stated preferences.",
    whatHappens:
      "Properties that match the prospect's criteria are identified and presented. The listing database meets buyer demand.",
    whyItMatters:
      "The quality of the match determines whether interest progresses to a viewing. A poor match wastes everyone's time.",
    potentialLeak:
      "Relevant properties are not identified because preferences were not captured properly. Generic listings are sent instead of thoughtful matches.",
    businessImpact:
      "Poor matches reduce viewing conversion and erode confidence in the agent's understanding of the client's needs.",
    whatTheBusinessMayNotSee:
      "How many properties matched each lead. Which properties generate interest. How match quality affects viewing rates.",
    awokenAction:
      "Properties are matched against captured preferences automatically. The prospect receives relevant options without manual effort.",
    signal: "Match rate, viewing conversion, property relevance score",
    status: "opportunity",
  },
  {
    id: "viewing",
    order: 6,
    name: "Viewing",
    shortLabel: "Viewing",
    eyebrow: "THE PHYSICAL MOMENT",
    shortDescription:
      "The prospect visits a shortlisted property. Interest becomes tangible.",
    whatHappens:
      "A viewing is scheduled and conducted. The prospect experiences the property first-hand.",
    whyItMatters:
      "Viewings are the highest-intent signal in the journey. Attendance confirms serious interest.",
    potentialLeak:
      "Viewings are not scheduled promptly, are forgotten, or prospects do not attend. Interest cools between booking and the appointment.",
    businessImpact:
      "Unattended viewings waste agent preparation time and properties remain unshown.",
    whatTheBusinessMayNotSee:
      "Viewing attendance rate. Time between match and viewing. Which properties generate the most viewing interest.",
    awokenAction:
      "Viewings are scheduled with confirmation and reminders. Attendance is tracked and no-shows are re-engaged automatically.",
    signal: "Viewing rate, attendance rate, time to viewing",
    status: "healthy",
  },
  {
    id: "follow-up",
    order: 7,
    name: "Follow-Up",
    shortLabel: "Follow-Up",
    eyebrow: "THE CONTINUATION",
    shortDescription:
      "After the viewing, contact is maintained. Feedback is gathered and next steps are established.",
    whatHappens:
      "The prospect is contacted after the viewing. Feedback is collected, questions are answered, and the decision process continues.",
    whyItMatters:
      "Most prospects do not decide immediately after a viewing. The follow-up is where interest is maintained or lost.",
    potentialLeak:
      "Follow-up is delayed, inconsistent, or does not happen at all. Prospects interpret silence as disinterest.",
    businessImpact:
      "Inconsistent follow-up causes prospects to explore other options. The viewing investment is lost.",
    whatTheBusinessMayNotSee:
      "Whether follow-up actually happens. What prospects say after viewings. How many follow-ups lead to next steps.",
    awokenAction:
      "Follow-up is structured and timely. Feedback is captured. The next action is determined based on the prospect's response.",
    signal: "Follow-up rate, feedback capture rate, re-engagement rate",
    status: "attention",
  },
  {
    id: "decision",
    order: 8,
    name: "Decision",
    shortLabel: "Decision",
    eyebrow: "THE OUTCOME",
    shortDescription:
      "The prospect decides to proceed, negotiate, or walk away.",
    whatHappens:
      "The prospect makes a decision — offer, negotiation, further exploration, or withdrawal.",
    whyItMatters:
      "This is the moment all prior effort leads to. The decision reveals whether the opportunity journey was effective.",
    potentialLeak:
      "Prospects withdraw without negotiation because they were not engaged effectively. The reason for withdrawal is not captured.",
    businessImpact:
      "Every withdrawal without captured feedback is a missed learning opportunity for the business.",
    whatTheBusinessMayNotSee:
      "Why prospects withdraw. What factors influence decisions. Which stages most frequently precede a withdrawal.",
    awokenAction:
      "Decision outcomes are tracked. Withdrawal reasons are captured. Lost opportunities are queued for future re-engagement.",
    signal: "Decision rate, withdrawal reason, offer conversion",
    status: "opportunity",
  },
  {
    id: "deal",
    order: 9,
    name: "Deal",
    shortLabel: "Deal",
    eyebrow: "THE RESULT",
    shortDescription:
      "An agreement is reached. The opportunity becomes a closed outcome.",
    whatHappens:
      "Terms are agreed, documentation proceeds, and the deal moves toward closure.",
    whyItMatters:
      "This is the measurable outcome of the entire journey. Every deal represents a preserved opportunity.",
    potentialLeak:
      "Deals stall in negotiation or documentation. Delays create risk of withdrawal.",
    businessImpact:
      "Stalled deals tie up pipeline value. Delays increase the risk of renegotiation or cancellation.",
    whatTheBusinessMayNotSee:
      "How long deals take to close. Where deals stall. What differentiates smooth closures from delayed ones.",
    awokenAction:
      "Deal progress is monitored. Stalled stages trigger attention. Post-deal feedback is captured for future improvement.",
    signal: "Close rate, time to close, deal velocity",
    status: "healthy",
  },
]

export const opportunityLeaks: readonly OpportunityLeak[] = [
  {
    id: "missed-inquiry",
    name: "Missed Inquiry",
    shortLabel: "Missed",
    category: "acquisition",
    shortDescription:
      "An inquiry arrives but is never seen, never answered, or falls through the cracks.",
    problem:
      "Inbound calls go to voicemail. Web forms land in an inbox no one monitors. WhatsApp messages are read but not replied to. The channel exists. The response does not.",
    whatMayHappen:
      "The prospect moves to the next agent or agency. The business never knows a specific opportunity existed.",
    whatTheBusinessMayNotSee:
      "Which channels have unanswered inquiries. How many inquiries arrive outside business hours. How many are never touched.",
    operationalSignal:
      "Inquiries with no recorded response within a defined window.",
    potentialBusinessImpact:
      "Every missed inquiry is demand that reached the business but never entered the pipeline.",
    awokenRole:
      "Monitor all inbound channels. Surface unanswered inquiries. Enable immediate acknowledgment from any device.",
    recommendedNextStep:
      "Review which channels generate the most unanswered inquiries and establish a structured intake process for each one.",
    severity: "high",
  },
  {
    id: "slow-response",
    name: "Slow Response",
    shortLabel: "Slow",
    category: "response",
    shortDescription:
      "The inquiry receives a response, but not within the window where the prospect is still actively engaged.",
    problem:
      "A response arrives hours or days later. By then the prospect has contacted other agents, lost interest, or found a property elsewhere.",
    whatMayHappen:
      "The prospect perceives the business as inattentive or disorganized. The opportunity becomes increasingly difficult to recover with each passing hour.",
    whatTheBusinessMayNotSee:
      "The actual time elapsed between inquiry and response. How response time correlates with follow-through rates.",
    operationalSignal:
      "Response time exceeds a defined threshold for the channel used.",
    potentialBusinessImpact:
      "Each incremental hour of delay reduces the probability of meaningful engagement. The opportunity degrades even if it does not disappear entirely.",
    awokenRole:
      "Trigger immediate acknowledgment upon inquiry detection. Route to the appropriate responder based on channel, time, and context.",
    recommendedNextStep:
      "Define target response times for each channel and measure current performance against them.",
    severity: "high",
  },
  {
    id: "weak-qualification",
    name: "Weak Qualification",
    shortLabel: "Qualification",
    category: "qualification",
    shortDescription:
      "Leads are pursued without understanding their intent, timeline, or fit.",
    problem:
      "Every inquiry receives the same generic follow-up. Budget is not discussed. Timeline is not established. The agent does not know whether the prospect is buying next month or next year.",
    whatMayHappen:
      "Agent time is spent on prospects who are not ready or not suited. Genuine opportunities receive diluted attention.",
    whatTheBusinessMayNotSee:
      "Which leads are worth prioritizing. What each lead actually needs. How many leads are stuck in an unqualified state.",
    operationalSignal:
      "High volume of leads with no recorded qualification data beyond contact information.",
    potentialBusinessImpact:
      "Agents spend time on low-probability opportunities while high-intent prospects receive generic, untargeted follow-up.",
    awokenRole:
      "Capture qualification criteria during the initial exchange. Surface readiness indicators so agents can prioritize appropriately.",
    recommendedNextStep:
      "Define the minimum information needed to qualify a lead — budget, timeline, location, decision criteria — and capture it consistently.",
    severity: "medium",
  },
  {
    id: "inconsistent-follow-up",
    name: "Inconsistent Follow-Up",
    shortLabel: "Follow-Up",
    category: "follow-up",
    shortDescription:
      "Contact with the prospect is irregular or stops entirely after initial engagement.",
    problem:
      "A lead is contacted once, then forgotten. Days pass. Another agent reaches out. The prospect moves on. The original effort produces nothing because it was not sustained.",
    whatMayHappen:
      "Prospects interpret silence as disinterest. Relationships built during initial contact deteriorate. The business loses opportunities it already invested in.",
    whatTheBusinessMayNotSee:
      "How many leads receive more than one follow-up. When follow-up stops. What triggers follow-up to resume.",
    operationalSignal:
      "Leads with no recorded activity beyond the initial interaction within a defined period.",
    potentialBusinessImpact:
      "The cost of acquiring a lead is incurred but the follow-up investment needed to convert it is never made.",
    awokenRole:
      "Maintain structured follow-up sequences based on lead profile and behavior. Ensure no lead is left without a scheduled next action.",
    recommendedNextStep:
      "Establish a follow-up cadence for each stage of the pipeline and measure how consistently it is executed.",
    severity: "high",
  },
  {
    id: "no-property-match",
    name: "No Property Match",
    shortLabel: "No Match",
    category: "matching",
    shortDescription:
      "The prospect's preferences are not translated into relevant property recommendations.",
    problem:
      "Preferences are discussed but not recorded. The agent attempts to match properties from memory. Relevant listings are missed or irrelevant ones are sent.",
    whatMayHappen:
      "The prospect receives generic listings that do not match their criteria. Confidence in the agent declines. The prospect begins searching elsewhere.",
    whatTheBusinessMayNotSee:
      "Whether property recommendations are actually aligned with stated preferences. How many leads receive no property match at all.",
    operationalSignal:
      "Leads with recorded preferences but no record of properties shown or recommended.",
    potentialBusinessImpact:
      "Viewing volume decreases because the connection between buyer demand and available supply is not being made effectively.",
    awokenRole:
      "Match prospect preferences against available inventory automatically. Surface the strongest matches so agents can present relevant options quickly.",
    recommendedNextStep:
      "Review how property matches are currently identified and whether preference data is being captured systematically.",
    severity: "medium",
  },
  {
    id: "viewing-dropoff",
    name: "Viewing Drop-Off",
    shortLabel: "Drop-Off",
    category: "matching",
    shortDescription:
      "Interest does not survive the gap between match confirmation and the scheduled appointment.",
    problem:
      "A viewing is arranged but the prospect does not attend. The gap between booking and appointment is long enough for interest to cool or competing options to appear.",
    whatMayHappen:
      "No-shows waste preparation time. Prospects who do not attend rarely reschedule. The opportunity ends at the point of highest demonstrated intent.",
    whatTheBusinessMayNotSee:
      "No-show rate. Time between booking and appointment. Whether confirmation reminders were sent.",
    operationalSignal:
      "Viewings with no attendance record or where the prospect did not confirm within a defined window.",
    potentialBusinessImpact:
      "Agent hours spent preparing for unattended viewings. Properties remain unshown. Pipeline velocity slows.",
    awokenRole:
      "Send confirmation and reminder sequences automatically. Track attendance. Re-engage no-shows with alternative options.",
    recommendedNextStep:
      "Measure current no-show rates and implement a structured confirmation and reminder process for every viewing.",
    severity: "medium",
  },
  {
    id: "silent-pipeline",
    name: "Silent Pipeline",
    shortLabel: "Silent",
    category: "visibility",
    shortDescription:
      "Opportunities exist in the pipeline but there is no visibility into their status or next action.",
    problem:
      "Leads are scattered across spreadsheets, inboxes, CRM entries, and agent notebooks. No single view shows what is active, what is stalled, and what needs attention.",
    whatMayHappen:
      "Opportunities age without action. No one knows whether a lead is still active. Stalled opportunities are discovered only after they have gone cold.",
    whatTheBusinessMayNotSee:
      "The complete pipeline. Which opportunities are active. Which have stalled. Which need attention. What the next action is for each one.",
    operationalSignal:
      "Leads with no status update or activity recorded beyond a defined period.",
    potentialBusinessImpact:
      "Pipeline value is unknown. Opportunities that could be recovered are discovered only after they are no longer recoverable.",
    awokenRole:
      "Provide a unified view of every opportunity with current status, last activity, and recommended next action. Surface stalled opportunities for review.",
    recommendedNextStep:
      "Establish a single source of truth for pipeline visibility. Define what each status means and how often it should be reviewed.",
    severity: "high",
  },
]

export const demoLead: DemoLead = {
  id: "lead-demo-001",
  name: "Aarav Mehta",
  initials: "AM",
  inquiryType: "Buyer",
  propertyInterest: "3 BHK apartment",
  location: "Dubai Marina",
  budget: "AED 2,800,000 – AED 3,200,000",
  timeline: "30–60 days",
  source: "Website inquiry form",
  status: "New inquiry",
  createdAt: "2026-07-24T09:42:00Z",
  demoLabel: "Demo lead — not a real prospect",
  isDemo: true,
}

export const demoTimelineEvents: readonly DemoTimelineEvent[] = [
  {
    id: "tl-001",
    order: 1,
    time: "09:42",
    label: "Inquiry received",
    shortDescription: "New inquiry arrived via website form.",
    detailedDescription:
      "Aarav Mehta submitted an inquiry through the website form. Property interest: 3 BHK apartment in Dubai Marina. Budget range indicated. Timeline: 30–60 days.",
    eventType: "incoming",
    status: "completed",
    isDemo: true,
  },
  {
    id: "tl-002",
    order: 2,
    time: "09:42",
    label: "Opportunity detected",
    shortDescription: "Inbound signal classified as an active buying opportunity.",
    detailedDescription:
      "The inquiry was classified as a buying opportunity based on budget range, timeline specificity, and property detail provided. Priority level set based on stated readiness.",
    eventType: "detection",
    status: "completed",
    isDemo: true,
  },
  {
    id: "tl-003",
    order: 3,
    time: "09:43",
    label: "Response initiated",
    shortDescription: "Acknowledgment sent automatically within one minute.",
    detailedDescription:
      "An acknowledgment was sent to the prospect confirming receipt. The response included a brief introduction and confirmation that a team member would follow up with relevant property options.",
    eventType: "response",
    status: "completed",
    isDemo: true,
  },
  {
    id: "tl-004",
    order: 4,
    time: "09:45",
    label: "Intent captured",
    shortDescription: "Preferences and requirements were structured from the inquiry.",
    detailedDescription:
      "Key details from the submission were extracted: property type, location, budget range, and timeline. The prospect's intent was recorded and made available to the team.",
    eventType: "understanding",
    status: "active",
    isDemo: true,
  },
  {
    id: "tl-005",
    order: 5,
    time: "09:47",
    label: "Lead qualified",
    shortDescription: "Buyer profile assessed against current inventory.",
    detailedDescription:
      "Budget range and location preferences were matched against available listings. The lead was classified as a qualified opportunity with clear criteria for property matching.",
    eventType: "qualification",
    status: "pending",
    isDemo: true,
  },
  {
    id: "tl-006",
    order: 6,
    time: "09:50",
    label: "Property match suggested",
    shortDescription: "Relevant listings identified based on captured preferences.",
    detailedDescription:
      "Three properties matching the prospect's criteria were identified: two 3 BHK apartments in Dubai Marina and one in Jumeirah Lakes Towers. Recommendations are ready for review.",
    eventType: "recommendation",
    status: "pending",
    isDemo: true,
  },
]

export const recoveryScenario: RecoveryScenario = {
  id: "recovery-demo-001",
  leadName: "Priya Sharma",
  previousInterest: "2 BHK property",
  lastInteraction: "Requested pricing information",
  lastActivity: "2026-06-12",
  daysInactive: 42,
  currentStatus: "Inactive",
  potentialOpportunity:
    "Potential opportunity to re-engage. Previous interest was specific. Timing may have changed since last contact.",
  demoLabel: "Demo scenario — inactive lead review",
}

export const recoverySequenceSteps: readonly RecoverySequenceStep[] = [
  {
    id: "rs-001",
    order: 1,
    name: "Review previous context",
    shortDescription: "Examine the lead's history, preferences, and last interaction.",
    purpose:
      "Understand what the prospect was looking for and what happened during the last engagement.",
    status: "pending",
  },
  {
    id: "rs-002",
    order: 2,
    name: "Understand previous intent",
    shortDescription: "Assess how specific the prospect's requirements were.",
    purpose:
      "Determine whether the previous interest was exploratory or indicated genuine intent.",
    status: "pending",
  },
  {
    id: "rs-003",
    order: 3,
    name: "Determine whether timing has changed",
    shortDescription: "Consider whether the prospect's timeline or circumstances may have shifted.",
    purpose:
      "Decide whether the current moment is appropriate for re-engagement based on elapsed time.",
    status: "pending",
  },
  {
    id: "rs-004",
    order: 4,
    name: "Identify an appropriate next action",
    shortDescription: "Choose a re-engagement approach based on the prospect's profile.",
    purpose:
      "Determine the most suitable channel and message for re-establishing contact.",
    status: "pending",
  },
  {
    id: "rs-005",
    order: 5,
    name: "Track the response",
    shortDescription: "Monitor whether re-engagement leads to renewed interest.",
    purpose:
      "Capture the outcome of the recovery attempt and update the prospect's status accordingly.",
    status: "pending",
  },
]

export const illustrativeMetrics: readonly BusinessMetric[] = [
  {
    id: "metric-inquiries",
    label: "Inquiries",
    value: 28,
    unit: "this week",
    change: 12,
    trend: "up",
    description:
      "Total inbound inquiries received across all channels this week. This is illustrative demo data and does not represent actual business performance.",
    sourceLabel: "All channels",
    isDemo: true,
  },
  {
    id: "metric-response-coverage",
    label: "Response Coverage",
    value: 71,
    unit: "%",
    change: 4,
    trend: "up",
    description:
      "Percentage of inquiries that received a response. This is illustrative demo data and does not represent actual business performance.",
    sourceLabel: "All channels",
    isDemo: true,
  },
  {
    id: "metric-qualified",
    label: "Qualified Opportunities",
    value: 14,
    unit: "active",
    change: 2,
    trend: "up",
    description:
      "Leads that have been qualified and are currently active in the pipeline. This is illustrative demo data and does not represent actual business performance.",
    sourceLabel: "Pipeline",
    isDemo: true,
  },
  {
    id: "metric-inactive",
    label: "Inactive Opportunities",
    value: 9,
    unit: "needs review",
    change: 3,
    trend: "up",
    description:
      "Leads with no recent activity that may benefit from re-engagement. This is illustrative demo data and does not represent actual business performance.",
    sourceLabel: "Pipeline",
    isDemo: true,
  },
  {
    id: "metric-viewings",
    label: "Viewings",
    value: 3,
    unit: "scheduled",
    change: 0,
    trend: "neutral",
    description:
      "Viewings currently scheduled. This is illustrative demo data and does not represent actual business performance.",
    sourceLabel: "Calendar",
    isDemo: true,
  },
  {
    id: "metric-follow-up",
    label: "Follow-Up Activity",
    value: 67,
    unit: "%",
    change: 8,
    trend: "down",
    description:
      "Percentage of qualified leads that received follow-up within the expected timeframe. This is illustrative demo data and does not represent actual business performance.",
    sourceLabel: "Pipeline",
    isDemo: true,
  },
]

export const awokenSystemSteps: readonly AwokenSystemStep[] = [
  {
    id: "sys-detect",
    order: 1,
    name: "Detect",
    shortDescription:
      "Every inbound signal is captured and classified — calls, forms, messages, walk-ins, and referrals.",
    purpose:
      "Ensure no opportunity enters the business unseen, regardless of channel or time.",
    output: "An opportunity becomes visible.",
  },
  {
    id: "sys-respond",
    order: 2,
    name: "Respond",
    shortDescription:
      "Every signal receives immediate acknowledgment. The prospect knows someone is engaged.",
    purpose:
      "Eliminate the gap between inquiry and response. Preserve momentum from the first moment of contact.",
    output: "The opportunity receives an appropriate next action.",
  },
  {
    id: "sys-understand",
    order: 3,
    name: "Understand",
    shortDescription:
      "Preferences, intent, timing, and criteria are captured and structured during the exchange.",
    purpose:
      "Build a clear picture of what the prospect needs so every subsequent action is relevant.",
    output: "Intent and context become clearer.",
  },
  {
    id: "sys-follow-up",
    order: 4,
    name: "Follow Up",
    shortDescription:
      "Structured, timely follow-up is maintained across the entire journey, not just the initial response.",
    purpose:
      "Prevent opportunities from cooling due to inconsistent or absent contact.",
    output: "Engagement is sustained throughout the decision process.",
  },
  {
    id: "sys-prioritize",
    order: 5,
    name: "Prioritize",
    shortDescription:
      "Opportunities are evaluated and ranked so the business knows where to focus attention.",
    purpose:
      "Ensure agent time is directed toward the opportunities most likely to progress.",
    output: "The business knows what deserves attention.",
  },
  {
    id: "sys-recover",
    order: 6,
    name: "Recover",
    shortDescription:
      "Inactive and stalled opportunities are identified and queued for structured re-engagement.",
    purpose:
      "Recognize that timing changes and past interest may signal future opportunity.",
    output: "Lost visibility becomes visible again.",
  },
  {
    id: "sys-measure",
    order: 7,
    name: "Measure",
    shortDescription:
      "Every stage of the journey generates signals that are captured, measured, and actionable.",
    purpose:
      "Close the feedback loop so the business understands what is working and what needs attention.",
    output: "The outcome becomes visible.",
  },
]

export function getPipelineStage(
  id: string,
): OpportunityPipelineStage | undefined {
  return opportunityPipelineStages.find((stage) => stage.id === id)
}

export function getPreviousStage(
  id: string,
): OpportunityPipelineStage | undefined {
  const index = opportunityPipelineStages.findIndex((s) => s.id === id)
  if (index <= 0) return undefined
  return opportunityPipelineStages[index - 1]
}

export function getNextStage(
  id: string,
): OpportunityPipelineStage | undefined {
  const index = opportunityPipelineStages.findIndex((s) => s.id === id)
  if (index === -1 || index >= opportunityPipelineStages.length - 1)
    return undefined
  return opportunityPipelineStages[index + 1]
}

export function getLeak(id: string): OpportunityLeak | undefined {
  return opportunityLeaks.find((leak) => leak.id === id)
}

export function getLeaksByCategory(
  category: string,
): OpportunityLeak[] {
  return opportunityLeaks.filter((leak) => leak.category === category)
}

export function getSystemStep(id: string): AwokenSystemStep | undefined {
  return awokenSystemSteps.find((step) => step.id === id)
}
