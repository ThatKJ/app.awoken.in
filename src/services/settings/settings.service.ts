export type WorkerMode = "autonomous" | "assisted" | "observing" | "off"

export type WorkerConfig = {
  id: string
  name: string
  type: string
  mode: WorkerMode
  confidenceThreshold: number
  approvalThreshold: number
  workingHours: { start: string; end: string }
  allowedChannels: string[]
  responseStyle: "professional" | "friendly" | "formal"
  knowledgeSources: string[]
  escalationRules: string
}

export type Organization = {
  name: string
  industry: string
  timezone: string
  businessHours: { start: string; end: string; days: string[] }
  address: string
  currency: string
  language: string
  dateFormat: string
}

export type Branding = {
  logo: string
  companyName: string
  primaryColor: string
  accentColor: string
  emailSignature: string
}

export type Automation = {
  autoAssign: boolean
  roundRobin: boolean
  retries: number
  cooldownMinutes: number
  followupCadenceHours: number
  recoveryRules: string
  appointmentRules: string
  workingSchedule: { start: string; end: string }
}

export type NotificationPreferences = {
  email: boolean
  sms: boolean
  push: boolean
  inApp: boolean
  approvalAlerts: boolean
  escalations: boolean
  weeklyReports: boolean
  integrationFailures: boolean
}

export type Security = {
  twoFactorEnabled: boolean
  sessionTimeoutMinutes: number
  passwordResetRequired: boolean
}

export type Member = {
  id: string
  name: string
  email: string
  role: "owner" | "admin" | "manager" | "viewer"
  avatar: string
  joined: string
  status: "active" | "suspended" | "pending"
}

export type Permission = {
  resource: string
  actions: ("create" | "read" | "update" | "delete" | "manage")[]
}

export type RolePermissions = {
  role: string
  permissions: Permission[]
}

export type BillingPlan = "starter" | "growth" | "enterprise"
export type BillingInfo = {
  plan: BillingPlan
  seats: number
  usedSeats: number
  monthlyCost: number
  invoices: { id: string; date: string; amount: number; status: "paid" | "pending" | "failed" }[]
  paymentMethod: { type: "card"; last4: string; exp: string }
}

export type ApiKey = {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
  permissions: string[]
}

export type SettingsData = {
  organization: Organization
  branding: Branding
  workers: WorkerConfig[]
  automation: Automation
  notifications: NotificationPreferences
  security: Security
  members: Member[]
  roles: RolePermissions[]
  billing: BillingInfo
  apiKeys: ApiKey[]
}

const defaultData: SettingsData = {
  organization: {
    name: "Awoken Realty",
    industry: "Real Estate",
    timezone: "Asia/Kolkata (IST, UTC+5:30)",
    businessHours: { start: "09:00", end: "18:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    address: "1st Floor, Kharadi Knowledge Park, Pune, Maharashtra 411014",
    currency: "INR (₹)",
    language: "English (US)",
    dateFormat: "DD/MM/YYYY",
  },
  branding: {
    logo: "Awoken",
    companyName: "Awoken Realty Pvt. Ltd.",
    primaryColor: "#F97316",
    accentColor: "#2563EB",
    emailSignature: "Best regards,\nThe Awoken Team\nAI-Powered Real Estate Solutions",
  },
  workers: [
    { id: "w1", name: "Response Worker", type: "lead_response", mode: "autonomous", confidenceThreshold: 85, approvalThreshold: 95, workingHours: { start: "09:00", end: "18:00" }, allowedChannels: ["whatsapp", "email", "website"], responseStyle: "professional", knowledgeSources: ["Pricing", "FAQs", "Products"], escalationRules: "Escalate to human when confidence < 85%" },
    { id: "w2", name: "Qualification Worker", type: "qualification", mode: "autonomous", confidenceThreshold: 80, approvalThreshold: 90, workingHours: { start: "09:00", end: "18:00" }, allowedChannels: ["whatsapp", "voice"], responseStyle: "professional", knowledgeSources: ["Pricing", "Products", "Sales Playbook"], escalationRules: "Escalate when BANT criteria unclear" },
    { id: "w3", name: "Follow-up Worker", type: "followup", mode: "autonomous", confidenceThreshold: 75, approvalThreshold: 85, workingHours: { start: "10:00", end: "19:00" }, allowedChannels: ["whatsapp", "email", "sms"], responseStyle: "friendly", knowledgeSources: ["Follow-up Scripts", "FAQs", "Pricing"], escalationRules: "Escalate after 5 failed follow-ups" },
    { id: "w4", name: "Appointment Worker", type: "appointment", mode: "autonomous", confidenceThreshold: 90, approvalThreshold: 95, workingHours: { start: "09:00", end: "20:00" }, allowedChannels: ["whatsapp", "voice", "calendar"], responseStyle: "professional", knowledgeSources: ["Calendar", "Products", "Pricing"], escalationRules: "Escalate when lead requests off-hours" },
    { id: "w5", name: "Recovery Worker", type: "recovery", mode: "assisted", confidenceThreshold: 70, approvalThreshold: 80, workingHours: { start: "10:00", end: "18:00" }, allowedChannels: ["whatsapp", "email", "voice"], responseStyle: "friendly", knowledgeSources: ["Recovery Scripts", "FAQs", "Pricing"], escalationRules: "Requires manager approval for discounts > 5%" },
  ],
  automation: {
    autoAssign: true,
    roundRobin: true,
    retries: 3,
    cooldownMinutes: 30,
    followupCadenceHours: 24,
    recoveryRules: "Auto-activate after 7 days of inactivity. Send max 3 recovery messages with 48-hour gaps.",
    appointmentRules: "Auto-book slots within business hours. Confirm 24h before. Offer reschedule up to 2 times.",
    workingSchedule: { start: "09:00", end: "18:00" },
  },
  notifications: {
    email: true,
    sms: false,
    push: true,
    inApp: true,
    approvalAlerts: true,
    escalations: true,
    weeklyReports: true,
    integrationFailures: true,
  },
  security: {
    twoFactorEnabled: true,
    sessionTimeoutMinutes: 60,
    passwordResetRequired: false,
  },
  members: [
    { id: "m1", name: "Kirtan Shah", email: "kirtan@awoken.in", role: "owner", avatar: "KS", joined: "2026-01-01", status: "active" },
    { id: "m2", name: "Priya Sharma", email: "priya@awoken.in", role: "admin", avatar: "PS", joined: "2026-02-15", status: "active" },
    { id: "m3", name: "Rahul Verma", email: "rahul@awoken.in", role: "manager", avatar: "RV", joined: "2026-03-01", status: "active" },
    { id: "m4", name: "Ananya Patel", email: "ananya@awoken.in", role: "manager", avatar: "AP", joined: "2026-03-10", status: "active" },
    { id: "m5", name: "Vikram Joshi", email: "vikram@awoken.in", role: "viewer", avatar: "VJ", joined: "2026-04-01", status: "suspended" },
    { id: "m6", name: "Neha Kapoor", email: "neha@awoken.in", role: "viewer", avatar: "NK", joined: "2026-04-15", status: "pending" },
  ],
  roles: [
    {
      role: "Owner", permissions: [
        { resource: "Workers", actions: ["create", "read", "update", "delete", "manage"] },
        { resource: "Leads", actions: ["create", "read", "update", "delete", "manage"] },
        { resource: "Reports", actions: ["create", "read", "update", "delete", "manage"] },
        { resource: "Integrations", actions: ["create", "read", "update", "delete", "manage"] },
        { resource: "Knowledge", actions: ["create", "read", "update", "delete", "manage"] },
        { resource: "Billing", actions: ["create", "read", "update", "delete", "manage"] },
        { resource: "API", actions: ["create", "read", "update", "delete", "manage"] },
        { resource: "Settings", actions: ["create", "read", "update", "delete", "manage"] },
      ],
    },
    {
      role: "Admin", permissions: [
        { resource: "Workers", actions: ["create", "read", "update", "delete"] },
        { resource: "Leads", actions: ["create", "read", "update", "delete"] },
        { resource: "Reports", actions: ["read"] },
        { resource: "Integrations", actions: ["read", "update"] },
        { resource: "Knowledge", actions: ["create", "read", "update", "delete"] },
        { resource: "API", actions: ["read"] },
        { resource: "Settings", actions: ["read", "update"] },
      ],
    },
    {
      role: "Manager", permissions: [
        { resource: "Workers", actions: ["read", "update"] },
        { resource: "Leads", actions: ["create", "read", "update"] },
        { resource: "Reports", actions: ["read"] },
        { resource: "Knowledge", actions: ["read"] },
      ],
    },
    {
      role: "Viewer", permissions: [
        { resource: "Leads", actions: ["read"] },
        { resource: "Reports", actions: ["read"] },
        { resource: "Knowledge", actions: ["read"] },
      ],
    },
  ],
  billing: {
    plan: "growth",
    seats: 10,
    usedSeats: 6,
    monthlyCost: 49999,
    invoices: [
      { id: "INV-001", date: "2026-06-01", amount: 49999, status: "paid" },
      { id: "INV-002", date: "2026-05-01", amount: 49999, status: "paid" },
      { id: "INV-003", date: "2026-04-01", amount: 39999, status: "paid" },
      { id: "INV-004", date: "2026-03-01", amount: 39999, status: "paid" },
    ],
    paymentMethod: { type: "card", last4: "4242", exp: "12/28" },
  },
  apiKeys: [
    { id: "ak1", name: "Production API Key", key: "aw_sk_live_XXXXXXXXXXXXXXXXXXXXXXXX", created: "2026-01-15", lastUsed: "2 minutes ago", permissions: ["Full Access"] },
    { id: "ak2", name: "Development API Key", key: "aw_sk_test_XXXXXXXXXXXXXXXXXXXXXXXX", created: "2026-03-01", lastUsed: "1 hour ago", permissions: ["Read Only"] },
    { id: "ak3", name: "Webhook Secret", key: "whsec_XXXXXXXXXXXXXXXXXXXXXXXXXXXX", created: "2026-01-01", lastUsed: "5 minutes ago", permissions: ["Webhooks"] },
  ],
}

let data: SettingsData = { ...defaultData, workers: defaultData.workers.map((w) => ({ ...w })) }

export const SettingsService = {
  async get(): Promise<SettingsData> {
    return data
  },

  async update(partial: Partial<SettingsData>): Promise<SettingsData> {
    data = { ...data, ...partial }
    return data
  },

  async save(): Promise<void> {
    // no-op for mock
  },

  async reset(): Promise<SettingsData> {
    data = { ...defaultData, workers: defaultData.workers.map((w) => ({ ...w })) }
    return data
  },
}
