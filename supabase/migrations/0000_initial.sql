-- Awoken Database Schema v1
-- Derived from awoken-state-machine.md and database.md

-- ========== ENUMS ==========

CREATE TYPE worker_type AS ENUM (
  'lead_response', 'qualification', 'followup', 'recovery', 'appointment'
);

CREATE TYPE worker_mode AS ENUM (
  'off', 'observing', 'assisted', 'autonomous'
);

CREATE TYPE lead_source AS ENUM (
  'website_form', 'google_ads', 'meta_ads', 'whatsapp', 'landing_page', 'crm_import'
);

CREATE TYPE lead_status AS ENUM (
  'new', 'contacted', 'contacted_no_reply', 'in_conversation',
  'qualified', 'disqualified', 'nurturing',
  'booking_in_progress', 'booked', 'visited',
  'cold', 'recoverable', 'lost', 'won'
);

CREATE TYPE task_state AS ENUM (
  'queued', 'in_progress', 'awaiting_approval', 'escalated',
  'completed', 'rejected', 'failed'
);

CREATE TYPE trigger_type AS ENUM (
  'new_lead', 'lead_replied', 'follow_up_day_1', 'follow_up_day_3',
  'follow_up_day_7', 'follow_up_day_14', 'recovery_buffer_elapsed',
  'booking_requested', 'booking_failed', 'calendar_cancelled', 'manual'
);

CREATE TYPE opportunity_stage AS ENUM (
  'pipeline', 'site_visit', 'negotiation', 'won', 'lost'
);

CREATE TYPE value_source AS ENUM (
  'qualification_capture', 'human_override'
);

CREATE TYPE appointment_status AS ENUM (
  'scheduled', 'rescheduled', 'cancelled', 'attended', 'no_show'
);

CREATE TYPE message_channel AS ENUM (
  'whatsapp', 'email', 'sms'
);

CREATE TYPE message_direction AS ENUM (
  'inbound', 'outbound'
);

CREATE TYPE message_sender AS ENUM (
  'worker', 'human', 'lead'
);

CREATE TYPE message_type AS ENUM (
  'text', 'image', 'file', 'audio', 'video', 'location'
);

CREATE TYPE activity_event_type AS ENUM (
  'lead_contacted', 'lead_qualified', 'lead_disqualified',
  'follow_up_sent', 'recovery_started', 'recovery_succeeded',
  'appointment_booked', 'appointment_rescheduled', 'appointment_attended', 'appointment_no_show',
  'task_escalated', 'task_approved_by_human', 'task_rejected_by_human',
  'opportunity_won', 'opportunity_lost'
);

CREATE TYPE integration_type AS ENUM (
  'whatsapp', 'google_calendar', 'google_ads', 'meta_ads', 'crm_import'
);

CREATE TYPE integration_health AS ENUM (
  'healthy', 'attention_needed', 'disconnected'
);

CREATE TYPE knowledge_type AS ENUM (
  'faq', 'pricing', 'brochure', 'policy', 'sales_script', 'project_details'
);

CREATE TYPE report_type AS ENUM (
  'monday_brief'
);

-- ========== TABLES ==========

CREATE TABLE organizations (
  id                            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                          TEXT NOT NULL,
  recovery_buffer_days          INT NOT NULL DEFAULT 14,
  recovery_attempt_cap          INT NOT NULL DEFAULT 2,
  autonomous_confidence_floor   NUMERIC(3,2) NOT NULL DEFAULT 0.70,
  created_at                    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  name              TEXT NOT NULL,
  email             TEXT NOT NULL UNIQUE,
  password_hash     TEXT NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE workers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  type              worker_type NOT NULL,
  mode              worker_mode NOT NULL DEFAULT 'assisted',
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (organization_id, type)
);

CREATE TABLE leads (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id         UUID NOT NULL REFERENCES organizations(id),
  name                    TEXT,
  phone                   TEXT,
  email                   TEXT,
  source                  lead_source NOT NULL,
  status                  lead_status NOT NULL DEFAULT 'new',
  recovery_attempt_count  INT NOT NULL DEFAULT 0,
  assigned_user_id        UUID REFERENCES users(id),
  cold_since              TIMESTAMPTZ,
  recoverable_since       TIMESTAMPTZ,
  budget_captured         NUMERIC,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_leads_org_status ON leads(organization_id, status);

CREATE TABLE conversations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  lead_id           UUID NOT NULL UNIQUE REFERENCES leads(id),
  last_message_at   TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tasks (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  lead_id           UUID NOT NULL REFERENCES leads(id),
  conversation_id   UUID REFERENCES conversations(id),
  worker_type       worker_type NOT NULL,
  state             task_state NOT NULL DEFAULT 'queued',
  trigger_type      trigger_type NOT NULL,
  trigger_metadata  JSONB,
  proposed_action   JSONB,
  confidence_score  NUMERIC(3,2),
  actioned          BOOLEAN NOT NULL DEFAULT true,
  escalation_reason TEXT,
  outcome           TEXT,
  resolved_by       UUID REFERENCES users(id),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at       TIMESTAMPTZ
);

CREATE UNIQUE INDEX idx_one_open_task_per_lead
  ON tasks(lead_id)
  WHERE state IN ('queued', 'in_progress', 'awaiting_approval', 'escalated');

CREATE INDEX idx_tasks_org_worker_state ON tasks(organization_id, worker_type, state);

CREATE TABLE messages (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id   UUID NOT NULL REFERENCES conversations(id),
  channel           message_channel NOT NULL,
  direction         message_direction NOT NULL,
  sender_type       message_sender NOT NULL,
  sender_user_id    UUID REFERENCES users(id),
  task_id           UUID REFERENCES tasks(id),
  message_type      message_type NOT NULL DEFAULT 'text',
  content           JSONB NOT NULL,
  sent_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id, sent_at);

CREATE TABLE opportunities (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  lead_id           UUID NOT NULL UNIQUE REFERENCES leads(id),
  stage             opportunity_stage NOT NULL DEFAULT 'pipeline',
  value             NUMERIC,
  value_source      value_source NOT NULL DEFAULT 'qualification_capture',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  closed_at         TIMESTAMPTZ
);

CREATE TABLE appointments (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  lead_id           UUID NOT NULL REFERENCES leads(id),
  opportunity_id    UUID REFERENCES opportunities(id),
  scheduled_at      TIMESTAMPTZ NOT NULL,
  status            appointment_status NOT NULL DEFAULT 'scheduled',
  created_by_task   UUID REFERENCES tasks(id),
  reminder_sent_at  TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE knowledge_items (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  type              knowledge_type NOT NULL,
  title             TEXT NOT NULL,
  content           TEXT,
  file_url          TEXT,
  version           INT NOT NULL DEFAULT 1,
  is_published      BOOLEAN NOT NULL DEFAULT true,
  archived_at       TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE integrations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  type              integration_type NOT NULL,
  health            integration_health NOT NULL DEFAULT 'disconnected',
  last_sync_at      TIMESTAMPTZ,
  last_error        TEXT,
  connected_at      TIMESTAMPTZ,
  UNIQUE (organization_id, type)
);

CREATE TABLE activity_events (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  lead_id           UUID REFERENCES leads(id),
  task_id           UUID REFERENCES tasks(id),
  worker_type       worker_type,
  event_type        activity_event_type NOT NULL,
  summary           TEXT NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_activity_org_created ON activity_events(organization_id, created_at DESC);

CREATE TABLE reports (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  type              report_type NOT NULL DEFAULT 'monday_brief',
  period_start      DATE NOT NULL,
  period_end        DATE NOT NULL,
  content           JSONB NOT NULL,
  generated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========== VIEWS ==========

CREATE VIEW leads_display AS
SELECT *,
  CASE status
    WHEN 'new'                  THEN 'New'
    WHEN 'contacted'             THEN 'Contacted'
    WHEN 'contacted_no_reply'    THEN 'Contacted'
    WHEN 'in_conversation'       THEN 'Contacted'
    WHEN 'qualified'             THEN 'Qualified'
    WHEN 'nurturing'             THEN 'Qualified'
    WHEN 'booking_in_progress'   THEN 'Qualified'
    WHEN 'booked'                THEN 'Booked'
    WHEN 'visited'               THEN 'Visited'
    WHEN 'cold'                  THEN 'Cold'
    WHEN 'recoverable'           THEN 'Cold'
    WHEN 'disqualified'          THEN 'Lost'
    WHEN 'lost'                  THEN 'Lost'
    WHEN 'won'                   THEN 'Won'
  END AS display_status
FROM leads;

-- ========== RLS: Row Level Security ==========

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Users can only see their own organization's data
CREATE POLICY org_isolation ON organizations
  FOR ALL USING (id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY org_isolation ON users
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY org_isolation ON workers
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY org_isolation ON leads
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY org_isolation ON conversations
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY org_isolation ON tasks
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY org_isolation ON messages
  FOR ALL USING (conversation_id IN (
    SELECT c.id FROM conversations c
    JOIN users u ON u.organization_id = c.organization_id
    WHERE u.id = auth.uid()
  ));

CREATE POLICY org_isolation ON opportunities
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY org_isolation ON appointments
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY org_isolation ON knowledge_items
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY org_isolation ON integrations
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY org_isolation ON activity_events
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY org_isolation ON reports
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));
