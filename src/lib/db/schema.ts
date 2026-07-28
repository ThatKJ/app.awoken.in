import { sql } from "drizzle-orm"
import {
  boolean,
  date,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  pgView,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"

// ========== ENUMS ==========

export const workerType = pgEnum("worker_type", [
  "lead_response",
  "qualification",
  "followup",
  "recovery",
  "appointment",
])

export const workerMode = pgEnum("worker_mode", [
  "off",
  "observing",
  "assisted",
  "autonomous",
])

export const leadSource = pgEnum("lead_source", [
  "website_form",
  "google_ads",
  "meta_ads",
  "whatsapp",
  "landing_page",
  "crm_import",
])

export const leadStatus = pgEnum("lead_status", [
  "new",
  "contacted",
  "contacted_no_reply",
  "in_conversation",
  "qualified",
  "disqualified",
  "nurturing",
  "booking_in_progress",
  "booked",
  "visited",
  "cold",
  "recoverable",
  "lost",
  "won",
])

export const taskState = pgEnum("task_state", [
  "queued",
  "in_progress",
  "awaiting_approval",
  "escalated",
  "completed",
  "rejected",
  "failed",
])

export const triggerType = pgEnum("trigger_type", [
  "new_lead",
  "lead_replied",
  "follow_up_day_1",
  "follow_up_day_3",
  "follow_up_day_7",
  "follow_up_day_14",
  "recovery_buffer_elapsed",
  "booking_requested",
  "booking_failed",
  "calendar_cancelled",
  "manual",
])

export const opportunityStage = pgEnum("opportunity_stage", [
  "pipeline",
  "site_visit",
  "negotiation",
  "won",
  "lost",
])

export const valueSource = pgEnum("value_source", [
  "qualification_capture",
  "human_override",
])

export const appointmentStatus = pgEnum("appointment_status", [
  "scheduled",
  "rescheduled",
  "cancelled",
  "attended",
  "no_show",
])

export const messageChannel = pgEnum("message_channel", [
  "whatsapp",
  "email",
  "sms",
])

export const messageDirection = pgEnum("message_direction", [
  "inbound",
  "outbound",
])

export const messageSender = pgEnum("message_sender", [
  "worker",
  "human",
  "lead",
])

export const messageType = pgEnum("message_type", [
  "text",
  "image",
  "file",
  "audio",
  "video",
  "location",
])

export const activityEventType = pgEnum("activity_event_type", [
  "lead_contacted",
  "lead_qualified",
  "lead_disqualified",
  "follow_up_sent",
  "recovery_started",
  "recovery_succeeded",
  "appointment_booked",
  "appointment_rescheduled",
  "appointment_attended",
  "appointment_no_show",
  "task_escalated",
  "task_approved_by_human",
  "task_rejected_by_human",
  "opportunity_won",
  "opportunity_lost",
])

export const integrationType = pgEnum("integration_type", [
  "whatsapp",
  "google_calendar",
  "google_ads",
  "meta_ads",
  "crm_import",
])

export const integrationHealth = pgEnum("integration_health", [
  "healthy",
  "attention_needed",
  "disconnected",
])

export const knowledgeType = pgEnum("knowledge_type", [
  "faq",
  "pricing",
  "brochure",
  "policy",
  "sales_script",
  "project_details",
])

export const reportType = pgEnum("report_type", ["monday_brief"])

// ========== TABLES ==========

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  recoveryBufferDays: integer("recovery_buffer_days").notNull().default(14),
  recoveryAttemptCap: integer("recovery_attempt_cap").notNull().default(2),
  autonomousConfidenceFloor: numeric("autonomous_confidence_floor", {
    precision: 3,
    scale: 2,
  })
    .notNull()
    .default("0.70"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const workers = pgTable(
  "workers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id),
    type: workerType("type").notNull(),
    mode: workerMode("mode").notNull().default("assisted"),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("idx_workers_org_type").on(table.organizationId, table.type)],
)

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id),
    name: text("name"),
    phone: text("phone"),
    email: text("email"),
    source: leadSource("source").notNull(),
    status: leadStatus("status").notNull().default("new"),
    recoveryAttemptCount: integer("recovery_attempt_count").notNull().default(0),
    assignedUserId: uuid("assigned_user_id").references(() => users.id),
    coldSince: timestamp("cold_since", { withTimezone: true }),
    recoverableSince: timestamp("recoverable_since", { withTimezone: true }),
    budgetCaptured: numeric("budget_captured"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("idx_leads_org_status").on(table.organizationId, table.status),
  ],
)

export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  leadId: uuid("lead_id")
    .notNull()
    .unique()
    .references(() => leads.id),
  lastMessageAt: timestamp("last_message_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const tasks = pgTable(
  "tasks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id),
    leadId: uuid("lead_id")
      .notNull()
      .references(() => leads.id),
    conversationId: uuid("conversation_id").references(() => conversations.id),
    workerType: workerType("worker_type").notNull(),
    state: taskState("state").notNull().default("queued"),
    triggerType: triggerType("trigger_type").notNull(),
    triggerMetadata: jsonb("trigger_metadata"),
    proposedAction: jsonb("proposed_action"),
    confidenceScore: numeric("confidence_score", { precision: 3, scale: 2 }),
    actioned: boolean("actioned").notNull().default(true),
    escalationReason: text("escalation_reason"),
    outcome: text("outcome"),
    resolvedBy: uuid("resolved_by").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("idx_one_open_task_per_lead")
      .on(table.leadId)
      .where(
        sql`state IN ('queued', 'in_progress', 'awaiting_approval', 'escalated')`,
      ),
    uniqueIndex("idx_tasks_org_worker_state").on(
      table.organizationId,
      table.workerType,
      table.state,
    ),
  ],
)

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversations.id),
    channel: messageChannel("channel").notNull(),
    direction: messageDirection("direction").notNull(),
    senderType: messageSender("sender_type").notNull(),
    senderUserId: uuid("sender_user_id").references(() => users.id),
    taskId: uuid("task_id").references(() => tasks.id),
    messageType: messageType("message_type").notNull().default("text"),
    content: jsonb("content").notNull(),
    sentAt: timestamp("sent_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("idx_messages_conversation").on(
      table.conversationId,
      table.sentAt,
    ),
  ],
)

export const opportunities = pgTable("opportunities", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  leadId: uuid("lead_id")
    .notNull()
    .unique()
    .references(() => leads.id),
  stage: opportunityStage("stage").notNull().default("pipeline"),
  value: numeric("value"),
  valueSource: valueSource("value_source").notNull().default("qualification_capture"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  closedAt: timestamp("closed_at", { withTimezone: true }),
})

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id),
  opportunityId: uuid("opportunity_id").references(() => opportunities.id),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
  status: appointmentStatus("status").notNull().default("scheduled"),
  createdByTask: uuid("created_by_task").references(() => tasks.id),
  reminderSentAt: timestamp("reminder_sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const knowledgeItems = pgTable("knowledge_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  type: knowledgeType("type").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  fileUrl: text("file_url"),
  version: integer("version").notNull().default(1),
  isPublished: boolean("is_published").notNull().default(true),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const integrations = pgTable(
  "integrations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id),
    type: integrationType("type").notNull(),
    health: integrationHealth("health").notNull().default("disconnected"),
    lastSyncAt: timestamp("last_sync_at", { withTimezone: true }),
    lastError: text("last_error"),
    connectedAt: timestamp("connected_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("idx_integrations_org_type").on(table.organizationId, table.type),
  ],
)

export const activityEvents = pgTable(
  "activity_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id),
    leadId: uuid("lead_id").references(() => leads.id),
    taskId: uuid("task_id").references(() => tasks.id),
    workerType: workerType("worker_type"),
    eventType: activityEventType("event_type").notNull(),
    summary: text("summary").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("idx_activity_org_created").on(
      table.organizationId,
      table.createdAt,
    ),
  ],
)

export const reports = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  type: reportType("type").notNull().default("monday_brief"),
  periodStart: date("period_start").notNull(),
  periodEnd: date("period_end").notNull(),
  content: jsonb("content").notNull(),
  generatedAt: timestamp("generated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

// ========== VIEWS ==========

export const leadsDisplay = pgView("leads_display").as((qb) =>
  qb
    .select({
      id: leads.id,
      organizationId: leads.organizationId,
      name: leads.name,
      phone: leads.phone,
      email: leads.email,
      source: leads.source,
      status: leads.status,
      displayStatus: sql<string>`CASE ${leads.status}
        WHEN 'new' THEN 'New'
        WHEN 'contacted' THEN 'Contacted'
        WHEN 'contacted_no_reply' THEN 'Contacted'
        WHEN 'in_conversation' THEN 'Contacted'
        WHEN 'qualified' THEN 'Qualified'
        WHEN 'nurturing' THEN 'Qualified'
        WHEN 'booking_in_progress' THEN 'Qualified'
        WHEN 'booked' THEN 'Booked'
        WHEN 'visited' THEN 'Visited'
        WHEN 'cold' THEN 'Cold'
        WHEN 'recoverable' THEN 'Cold'
        WHEN 'disqualified' THEN 'Lost'
        WHEN 'lost' THEN 'Lost'
        WHEN 'won' THEN 'Won'
      END`,
      recoveryAttemptCount: leads.recoveryAttemptCount,
      assignedUserId: leads.assignedUserId,
      coldSince: leads.coldSince,
      recoverableSince: leads.recoverableSince,
      budgetCaptured: leads.budgetCaptured,
      createdAt: leads.createdAt,
      updatedAt: leads.updatedAt,
    })
    .from(leads),
)
