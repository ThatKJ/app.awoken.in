export type IntegrationStatus = "connected" | "disconnected" | "attention" | "syncing" | "error" | "expired"
export type IntegrationHealth = "healthy" | "warning" | "critical"
export type IntegrationCategory = "communication" | "calendar" | "crm" | "forms" | "automation" | "storage" | "payments"

export type WorkerConnection = {
  id: string
  name: string
  type: string
  status: "using" | "idle" | "disabled"
}

export type IntegrationLog = {
  id: string
  timestamp: string
  action: string
  result: "success" | "failure" | "retry"
  duration: number
  details: string
}

export type Integration = {
  id: string
  name: string
  description: string
  category: IntegrationCategory
  logo: string
  status: IntegrationStatus
  health: IntegrationHealth
  connectedSince: string
  lastSync: string
  apiLatency: number
  webhookStatus: "active" | "inactive" | "failing"
  tokenExpiry: string
  version: string
  permissions: string[]
  workers: WorkerConnection[]
  owner: string
  recentActivity: { action: string; time: string }[]
  logs: IntegrationLog[]
}

export type IntegrationSummary = {
  connected: number
  healthy: number
  attention: number
  syncsToday: number
}

const n = (name: string) => name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)

const integrations: Integration[] = [
  {
    id: "i1", name: "WhatsApp", description: "Two-way messaging with leads via WhatsApp Business API.", category: "communication",
    logo: n("WhatsApp"), status: "connected", health: "healthy", connectedSince: "2026-01-15", lastSync: "2 minutes ago",
    apiLatency: 42, webhookStatus: "active", tokenExpiry: "2026-09-15", version: "v18.0", permissions: ["Send messages", "Receive messages", "Read contacts"],
    workers: [
      { id: "w1", name: "Response Worker", type: "lead_response", status: "using" },
      { id: "w2", name: "Follow-up Worker", type: "followup", status: "using" },
      { id: "w3", name: "Recovery Worker", type: "recovery", status: "using" },
      { id: "w4", name: "Qualification Worker", type: "qualification", status: "idle" },
    ], owner: "System", recentActivity: [{ action: "Message sent to lead", time: "2 min ago" }, { action: "Webhook received", time: "4 min ago" }, { action: "Template approved", time: "1 hr ago" }],
    logs: [
      { id: "l1", timestamp: "2026-06-15T10:00:00Z", action: "Message sent", result: "success", duration: 120, details: "Template confirmation sent to +91-98765-43210" },
      { id: "l2", timestamp: "2026-06-15T09:45:00Z", action: "Webhook received", result: "success", duration: 80, details: "Inbound message from lead l3" },
      { id: "l3", timestamp: "2026-06-15T09:30:00Z", action: "Token refreshed", result: "success", duration: 350, details: "Access token refreshed successfully" },
    ],
  },
  {
    id: "i2", name: "SMS", description: "Transactional SMS for appointment reminders and OTPs.", category: "communication",
    logo: n("SMS"), status: "connected", health: "healthy", connectedSince: "2026-01-10", lastSync: "10 minutes ago",
    apiLatency: 85, webhookStatus: "inactive", tokenExpiry: "—", version: "API v2", permissions: ["Send SMS", "Delivery reports"],
    workers: [{ id: "w3", name: "Appointment Worker", type: "appointment", status: "using" }],
    owner: "System", recentActivity: [{ action: "SMS sent (reminder)", time: "10 min ago" }, { action: "SMS sent (OTP)", time: "25 min ago" }],
    logs: [
      { id: "l4", timestamp: "2026-06-15T09:50:00Z", action: "SMS sent", result: "success", duration: 150, details: "Appointment reminder sent to lead l8" },
    ],
  },
  {
    id: "i3", name: "Email", description: "Transactional and campaign emails via SMTP.", category: "communication",
    logo: n("Email"), status: "connected", health: "healthy", connectedSince: "2026-01-08", lastSync: "15 minutes ago",
    apiLatency: 120, webhookStatus: "active", tokenExpiry: "—", version: "SMTP", permissions: ["Send emails", "Track opens", "Track clicks"],
    workers: [{ id: "w1", name: "Response Worker", type: "lead_response", status: "using" }, { id: "w2", name: "Follow-up Worker", type: "followup", status: "using" }, { id: "w5", name: "Recovery Worker", type: "recovery", status: "idle" }],
    owner: "System", recentActivity: [{ action: "Proposal sent via email", time: "15 min ago" }, { action: "Follow-up sequence triggered", time: "45 min ago" }],
    logs: [
      { id: "l5", timestamp: "2026-06-15T09:45:00Z", action: "Email sent", result: "success", duration: 200, details: "Proposal document sent to lead l4" },
    ],
  },
  {
    id: "i4", name: "Voice", description: "AI-powered voice calling for lead qualification and follow-ups.", category: "communication",
    logo: n("Voice"), status: "connected", health: "warning", connectedSince: "2026-02-01", lastSync: "1 hour ago",
    apiLatency: 320, webhookStatus: "active", tokenExpiry: "2026-08-01", version: "API v3", permissions: ["Make calls", "Receive calls", "Voicemail"],
    workers: [{ id: "w2", name: "Qualification Worker", type: "qualification", status: "using" }, { id: "w5", name: "Recovery Worker", type: "recovery", status: "idle" }],
    owner: "System", recentActivity: [{ action: "Call completed (12m 34s)", time: "1 hr ago" }, { action: "Call failed — no answer", time: "2 hrs ago" }],
    logs: [
      { id: "l6", timestamp: "2026-06-15T08:00:00Z", action: "Outbound call", result: "success", duration: 754000, details: "Qualification call with lead l2 — duration 12m 34s" },
      { id: "l7", timestamp: "2026-06-15T07:00:00Z", action: "Outbound call", result: "failure", duration: 30000, details: "No answer from lead l6" },
    ],
  },
  {
    id: "i5", name: "Google Calendar", description: "Sync availability and book appointments automatically.", category: "calendar",
    logo: "GC", status: "connected", health: "healthy", connectedSince: "2026-01-12", lastSync: "5 minutes ago",
    apiLatency: 95, webhookStatus: "active", tokenExpiry: "2026-07-12", version: "Google Calendar API v3", permissions: ["Read events", "Create events", "Update events", "Check availability"],
    workers: [{ id: "w3", name: "Appointment Worker", type: "appointment", status: "using" }, { id: "w2", name: "Qualification Worker", type: "qualification", status: "idle" }],
    owner: "admin@awoken.in", recentActivity: [{ action: "Appointment booked", time: "5 min ago" }, { action: "Availability synced", time: "15 min ago" }],
    logs: [
      { id: "l8", timestamp: "2026-06-15T09:55:00Z", action: "Event created", result: "success", duration: 180, details: "Site visit scheduled for lead l9 on 2026-06-17 11:00 AM" },
    ],
  },
  {
    id: "i6", name: "Outlook Calendar", description: "Microsoft Exchange calendar integration.", category: "calendar",
    logo: "OL", status: "disconnected", health: "critical", connectedSince: "—", lastSync: "3 days ago",
    apiLatency: 0, webhookStatus: "inactive", tokenExpiry: "2026-05-01", version: "Graph API v1.0", permissions: ["Read events", "Create events"],
    workers: [], owner: "—", recentActivity: [{ action: "Token expired — reconnection required", time: "3 days ago" }],
    logs: [
      { id: "l9", timestamp: "2026-06-12T10:00:00Z", action: "Token refresh", result: "failure", duration: 5000, details: "OAuth token expired. Re-authentication required." },
    ],
  },
  {
    id: "i7", name: "HubSpot", description: "Sync leads, deals, and contacts from HubSpot CRM.", category: "crm",
    logo: "HS", status: "connected", health: "healthy", connectedSince: "2026-01-20", lastSync: "30 minutes ago",
    apiLatency: 150, webhookStatus: "active", tokenExpiry: "2026-10-20", version: "CRM API v3", permissions: ["Read contacts", "Read deals", "Update deals", "Create contacts"],
    workers: [{ id: "w1", name: "Response Worker", type: "lead_response", status: "using" }, { id: "w2", name: "Qualification Worker", type: "qualification", status: "using" }],
    owner: "System", recentActivity: [{ action: "Leads synced (12 new)", time: "30 min ago" }, { action: "Deal stage updated", time: "1 hr ago" }],
    logs: [
      { id: "l10", timestamp: "2026-06-15T09:30:00Z", action: "Sync", result: "success", duration: 3200, details: "12 new leads imported, 3 deals updated" },
    ],
  },
  {
    id: "i8", name: "Salesforce", description: "Enterprise CRM with lead and opportunity sync.", category: "crm",
    logo: "SF", status: "connected", health: "warning", connectedSince: "2026-03-01", lastSync: "2 hours ago",
    apiLatency: 450, webhookStatus: "failing", tokenExpiry: "2026-12-01", version: "REST API v58", permissions: ["Read leads", "Update opportunities", "Create tasks"],
    workers: [{ id: "w1", name: "Response Worker", type: "lead_response", status: "idle" }],
    owner: "System", recentActivity: [{ action: "Webhook delivery failed", time: "1 hr ago" }, { action: "Leads synced (5 new)", time: "2 hrs ago" }],
    logs: [
      { id: "l11", timestamp: "2026-06-15T08:00:00Z", action: "Webhook delivery", result: "failure", duration: 10000, details: "Webhook POST to /salesforce/events returned 502" },
      { id: "l12", timestamp: "2026-06-15T07:00:00Z", action: "Sync", result: "success", duration: 4500, details: "5 leads synced, 2 opportunities matched" },
    ],
  },
  {
    id: "i9", name: "Zoho CRM", description: "Small business CRM integration.", category: "crm",
    logo: "ZC", status: "disconnected", health: "critical", connectedSince: "—", lastSync: "2 months ago",
    apiLatency: 0, webhookStatus: "inactive", tokenExpiry: "2026-04-01", version: "API v2", permissions: ["Read leads", "Write leads"],
    workers: [], owner: "—", recentActivity: [{ action: "Credentials revoked", time: "2 months ago" }],
    logs: [],
  },
  {
    id: "i10", name: "Pipedrive", description: "Sales pipeline management.", category: "crm",
    logo: "PD", status: "attention", health: "warning", connectedSince: "2026-04-10", lastSync: "1 day ago",
    apiLatency: 280, webhookStatus: "failing", tokenExpiry: "2026-10-10", version: "API v1", permissions: ["Read deals", "Update deals"],
    workers: [{ id: "w2", name: "Qualification Worker", type: "qualification", status: "idle" }],
    owner: "admin@awoken.in", recentActivity: [{ action: "API rate limit hit", time: "6 hrs ago" }, { action: "Sync paused", time: "1 day ago" }],
    logs: [
      { id: "l13", timestamp: "2026-06-14T15:00:00Z", action: "API call", result: "failure", duration: 3000, details: "Rate limit exceeded. 10s retry backoff applied." },
    ],
  },
  {
    id: "i11", name: "Meta Lead Ads", description: "Capture leads from Facebook and Instagram ads.", category: "forms",
    logo: "ML", status: "connected", health: "healthy", connectedSince: "2026-01-05", lastSync: "5 minutes ago",
    apiLatency: 180, webhookStatus: "active", tokenExpiry: "2026-08-05", version: "Graph API v19", permissions: ["Read leads", "Manage pages"],
    workers: [{ id: "w1", name: "Response Worker", type: "lead_response", status: "using" }],
    owner: "System", recentActivity: [{ action: "Lead captured from Instagram", time: "5 min ago" }, { action: "Lead captured from Facebook", time: "20 min ago" }],
    logs: [
      { id: "l14", timestamp: "2026-06-15T09:55:00Z", action: "Lead received", result: "success", duration: 300, details: "New lead l11 from Instagram ad campaign" },
    ],
  },
  {
    id: "i12", name: "Google Forms", description: "Collect responses from Google Forms submissions.", category: "forms",
    logo: "GF", status: "connected", health: "healthy", connectedSince: "2026-02-10", lastSync: "1 hour ago",
    apiLatency: 110, webhookStatus: "active", tokenExpiry: "2026-08-10", version: "Forms API v1", permissions: ["Read responses"],
    workers: [{ id: "w1", name: "Response Worker", type: "lead_response", status: "using" }],
    owner: "System", recentActivity: [{ action: "New form submission", time: "1 hr ago" }],
    logs: [
      { id: "l15", timestamp: "2026-06-15T08:00:00Z", action: "Response received", result: "success", duration: 200, details: "New inquiry from form 'Contact Us'" },
    ],
  },
  {
    id: "i13", name: "Typeform", description: "Interactive form integration with webhook delivery.", category: "forms",
    logo: "TF", status: "connected", health: "healthy", connectedSince: "2026-03-15", lastSync: "3 hours ago",
    apiLatency: 90, webhookStatus: "active", tokenExpiry: "2027-03-15", version: "API v2", permissions: ["Read responses", "Manage webhooks"],
    workers: [], owner: "System", recentActivity: [{ action: "Webhook payload received", time: "3 hrs ago" }],
    logs: [],
  },
  {
    id: "i14", name: "Jotform", description: "Form builder integration.", category: "forms",
    logo: "JF", status: "expired", health: "critical", connectedSince: "—", lastSync: "5 months ago",
    apiLatency: 0, webhookStatus: "inactive", tokenExpiry: "2026-01-01", version: "API v4", permissions: ["Read submissions"],
    workers: [], owner: "—", recentActivity: [{ action: "API key expired", time: "5 months ago" }],
    logs: [],
  },
  {
    id: "i15", name: "Webhook", description: "Custom webhooks for event-driven automation.", category: "automation",
    logo: "WH", status: "connected", health: "healthy", connectedSince: "2026-01-01", lastSync: "1 minute ago",
    apiLatency: 35, webhookStatus: "active", tokenExpiry: "—", version: "v1", permissions: ["Send events", "Receive events"],
    workers: [{ id: "w1", name: "Response Worker", type: "lead_response", status: "using" }, { id: "w2", name: "Qualification Worker", type: "qualification", status: "using" }, { id: "w3", name: "Appointment Worker", type: "appointment", status: "using" }, { id: "w5", name: "Recovery Worker", type: "recovery", status: "using" }],
    owner: "System", recentActivity: [{ action: "Event sent: lead.qualified", time: "1 min ago" }, { action: "Event received: appointment.booked", time: "5 min ago" }],
    logs: [
      { id: "l16", timestamp: "2026-06-15T09:59:00Z", action: "Webhook dispatched", result: "success", duration: 45, details: "POST to https://hooks.awoken.in/events — 200 OK" },
    ],
  },
  {
    id: "i16", name: "REST API", description: "Programmatic access to all Awoken resources.", category: "automation",
    logo: "RA", status: "connected", health: "healthy", connectedSince: "2026-01-01", lastSync: "30 seconds ago",
    apiLatency: 28, webhookStatus: "active", tokenExpiry: "—", version: "v2", permissions: ["Full access", "Read only", "Scoped"],
    workers: [], owner: "admin@awoken.in", recentActivity: [{ action: "API key created", time: "1 week ago" }, { action: "Rate limit: 82% used", time: "1 min ago" }],
    logs: [
      { id: "l17", timestamp: "2026-06-15T09:59:30Z", action: "API request", result: "success", duration: 28, details: "GET /api/v2/leads — 200 OK" },
    ],
  },
  {
    id: "i17", name: "Zapier", description: "Connect Awoken to 5000+ apps via Zapier.", category: "automation",
    logo: "ZR", status: "connected", health: "healthy", connectedSince: "2026-02-20", lastSync: "30 minutes ago",
    apiLatency: 200, webhookStatus: "active", tokenExpiry: "—", version: "Platform", permissions: ["Triggers", "Actions"],
    workers: [], owner: "admin@awoken.in", recentActivity: [{ action: "Zap triggered: new lead → Slack", time: "30 min ago" }],
    logs: [],
  },
  {
    id: "i18", name: "n8n", description: "Advanced workflow automation with n8n self-hosted.", category: "automation",
    logo: "N8", status: "attention", health: "warning", connectedSince: "2026-04-01", lastSync: "1 day ago",
    apiLatency: 550, webhookStatus: "active", tokenExpiry: "—", version: "v1.30", permissions: ["Execute workflows"],
    workers: [], owner: "admin@awoken.in", recentActivity: [{ action: "Workflow execution failed", time: "2 hrs ago" }, { action: "Webhook received", time: "1 day ago" }],
    logs: [
      { id: "l18", timestamp: "2026-06-15T07:00:00Z", action: "Workflow execution", result: "failure", duration: 12000, details: "Workflow 'Sync Leads' failed at step 4: HubSpot API timeout" },
    ],
  },
  {
    id: "i19", name: "Google Drive", description: "Store and retrieve documents from Google Drive.", category: "storage",
    logo: "GD", status: "connected", health: "healthy", connectedSince: "2026-01-10", lastSync: "1 hour ago",
    apiLatency: 160, webhookStatus: "active", tokenExpiry: "2026-07-10", version: "Drive API v3", permissions: ["Read files", "Upload files", "List folders"],
    workers: [], owner: "System", recentActivity: [{ action: "Document indexed", time: "1 hr ago" }, { action: "Folder created: Contracts 2026", time: "1 day ago" }],
    logs: [
      { id: "l19", timestamp: "2026-06-15T08:00:00Z", action: "File indexed", result: "success", duration: 500, details: "pricing-guide-2026.pdf added to knowledge base" },
    ],
  },
  {
    id: "i20", name: "Razorpay", description: "Payment processing for bookings and deposits.", category: "payments",
    logo: "RZ", status: "connected", health: "healthy", connectedSince: "2026-02-01", lastSync: "1 minute ago",
    apiLatency: 65, webhookStatus: "active", tokenExpiry: "—", version: "API v2", permissions: ["Read payments", "Create payments", "Refunds"],
    workers: [{ id: "w3", name: "Appointment Worker", type: "appointment", status: "using" }],
    owner: "finance@awoken.in", recentActivity: [{ action: "Payment received: ₹25,000", time: "1 min ago" }, { action: "Refund initiated", time: "1 hr ago" }],
    logs: [
      { id: "l20", timestamp: "2026-06-15T09:59:00Z", action: "Payment captured", result: "success", duration: 200, details: "Payment of ₹25,000 for booking BK-2026-0042" },
    ],
  },
]

const logs = integrations.flatMap((i) => i.logs)

export const IntegrationService = {
  async list(): Promise<Integration[]> {
    return integrations
  },

  async getById(id: string): Promise<Integration | null> {
    return integrations.find((i) => i.id === id) ?? null
  },

  async getSummary(): Promise<IntegrationSummary> {
    return {
      connected: integrations.filter((i) => i.status === "connected" || i.status === "syncing").length,
      healthy: integrations.filter((i) => i.health === "healthy").length,
      attention: integrations.filter((i) => i.status === "attention" || i.health === "warning").length,
      syncsToday: 847,
    }
  },

  async getLogs(integrationId: string): Promise<IntegrationLog[]> {
    return logs.filter((l) => integrationId === "" || integrations.find((i) => i.id === integrationId)?.logs.includes(l))
  },

  async connect(id: string): Promise<Integration> {
    const idx = integrations.findIndex((i) => i.id === id)
    if (idx === -1) throw new Error("Integration not found")
    integrations[idx].status = "connected"
    integrations[idx].health = "healthy"
    integrations[idx].connectedSince = new Date().toISOString().slice(0, 10)
    return integrations[idx]
  },

  async disconnect(id: string): Promise<Integration> {
    const idx = integrations.findIndex((i) => i.id === id)
    if (idx === -1) throw new Error("Integration not found")
    integrations[idx].status = "disconnected"
    integrations[idx].health = "critical"
    return integrations[idx]
  },

  async reconnect(id: string): Promise<Integration> {
    const idx = integrations.findIndex((i) => i.id === id)
    if (idx === -1) throw new Error("Integration not found")
    integrations[idx].status = "syncing"
    integrations[idx].health = "healthy"
    setTimeout(() => { integrations[idx].status = "connected" }, 2000)
    return integrations[idx]
  },

  async refresh(): Promise<void> {
    // No-op for mock
  },
}
