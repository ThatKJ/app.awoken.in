# Database Schema

## Tables

### organizations
Column | Type | Default | Notes
id | UUID | gen_random_uuid() | PK
name | TEXT | — |
recovery_buffer_days | INT | 14 | Days before COLD→RECOVERABLE
recovery_attempt_cap | INT | 2 | Max recovery cycles before LOST
autonomous_confidence_floor | NUMERIC(3,2) | 0.70 | Min confidence for autonomous mode
created_at | TIMESTAMPTZ | now() |

### users
Column | Type | Default | Notes
id | UUID | gen_random_uuid() | PK
organization_id | UUID | — | FK→organizations
name | TEXT | — |
email | TEXT | — | UNIQUE
password_hash | TEXT | — |
created_at | TIMESTAMPTZ | now() |

### workers
One row per organization per worker type (5 fixed types).

Column | Type | Default | Notes
id | UUID | gen_random_uuid() | PK
organization_id | UUID | — | FK→organizations
type | worker_type | — | ENUM
mode | worker_mode | 'assisted' | ENUM
updated_at | TIMESTAMPTZ | now() |
UNIQUE(organization_id, type)

worker_type: lead_response, qualification, followup, recovery, appointment
worker_mode: off, observing, assisted, autonomous

### leads
Column | Type | Default | Notes
id | UUID | gen_random_uuid() | PK
organization_id | UUID | — | FK→organizations
name | TEXT | — |
phone | TEXT | — |
email | TEXT | — |
source | lead_source | — | ENUM
status | lead_status | 'new' | ENUM (14 values)
recovery_attempt_count | INT | 0 |
assigned_user_id | UUID | — | FK→users (nullable)
cold_since | TIMESTAMPTZ | — | Set when entering COLD
recoverable_since | TIMESTAMPTZ | — | Set when entering RECOVERABLE
budget_captured | NUMERIC | — | Feeds Opportunity.value
created_at | TIMESTAMPTZ | now() |
updated_at | TIMESTAMPTZ | now() |

Index: idx_leads_org_status ON leads(organization_id, status)

### View: leads_display
Computes display_status from the 14-value status enum into 8 human-readable buckets:
New, Contacted, Qualified, Booked, Visited, Cold, Lost, Won.

### conversations
Column | Type | Default | Notes
id | UUID | gen_random_uuid() | PK
organization_id | UUID | — | FK→organizations
lead_id | UUID | — | FK→leads (UNIQUE)
last_message_at | TIMESTAMPTZ | — |
created_at | TIMESTAMPTZ | now() |

### messages
Column | Type | Default | Notes
id | UUID | gen_random_uuid() | PK
conversation_id | UUID | — | FK→conversations
channel | message_channel | — | ENUM
direction | message_direction | — | ENUM
sender_type | message_sender | — | ENUM
sender_user_id | UUID | — | FK→users (nullable)
task_id | UUID | — | FK→tasks (nullable)
message_type | message_type | 'text' | ENUM
content | JSONB | — | {"text": "..."} or {"image_url": "...", ...}
sent_at | TIMESTAMPTZ | now() |

Index: idx_messages_conversation ON messages(conversation_id, sent_at)

### tasks
Column | Type | Default | Notes
id | UUID | gen_random_uuid() | PK
organization_id | UUID | — | FK→organizations
lead_id | UUID | — | FK→leads
conversation_id | UUID | — | FK→conversations (nullable)
worker_type | worker_type | — | ENUM
state | task_state | 'queued' | ENUM
trigger_type | trigger_type | — | ENUM
trigger_metadata | JSONB | — | e.g. {"cancelled_by": "lead"}
proposed_action | JSONB | — | What the worker intends to do
confidence_score | NUMERIC(3,2) | — |
actioned | BOOLEAN | true | False when mode=observing
escalation_reason | TEXT | — | Set when state=escalated
outcome | TEXT | — | Human-readable result
resolved_by | UUID | — | FK→users (nullable)
created_at | TIMESTAMPTZ | now() |
resolved_at | TIMESTAMPTZ | — |

Partial Unique Index: idx_one_open_task_per_lead ON tasks(lead_id)
  WHERE state IN ('queued','in_progress','awaiting_approval','escalated')

Index: idx_tasks_org_worker_state ON tasks(organization_id, worker_type, state)

### opportunities
Column | Type | Default | Notes
id | UUID | gen_random_uuid() | PK
organization_id | UUID | — | FK→organizations
lead_id | UUID | — | FK→leads (UNIQUE, 1:1)
stage | opportunity_stage | 'pipeline' | ENUM
value | NUMERIC | — |
value_source | value_source | 'qualification_capture' | ENUM
created_at | TIMESTAMPTZ | now() | Set when lead.status→qualified
closed_at | TIMESTAMPTZ | — |

### appointments
Column | Type | Default | Notes
id | UUID | gen_random_uuid() | PK
organization_id | UUID | — | FK→organizations
lead_id | UUID | — | FK→leads
opportunity_id | UUID | — | FK→opportunities (nullable)
scheduled_at | TIMESTAMPTZ | — |
status | appointment_status | 'scheduled' | ENUM
created_by_task | UUID | — | FK→tasks (nullable)
reminder_sent_at | TIMESTAMPTZ | — |
created_at | TIMESTAMPTZ | now() |

### knowledge_items
Column | Type | Default | Notes
id | UUID | gen_random_uuid() | PK
organization_id | UUID | — | FK→organizations
type | knowledge_type | — | ENUM
title | TEXT | — |
content | TEXT | — |
file_url | TEXT | — |
version | INT | 1 |
is_published | BOOLEAN | true |
archived_at | TIMESTAMPTZ | — |
created_at | TIMESTAMPTZ | now() |

### integrations
Column | Type | Default | Notes
id | UUID | gen_random_uuid() | PK
organization_id | UUID | — | FK→organizations
type | integration_type | — | ENUM
health | integration_health | 'disconnected' | ENUM
last_sync_at | TIMESTAMPTZ | — |
last_error | TEXT | — |
connected_at | TIMESTAMPTZ | — |
UNIQUE(organization_id, type)

### activity_events
Append-only feed table. Never read to reconstruct state.

Column | Type | Default | Notes
id | UUID | gen_random_uuid() | PK
organization_id | UUID | — | FK→organizations
lead_id | UUID | — | FK→leads (nullable)
task_id | UUID | — | FK→tasks (nullable)
worker_type | worker_type | — | ENUM (nullable)
event_type | activity_event_type | — | ENUM
summary | TEXT | — | Pre-rendered human-readable
created_at | TIMESTAMPTZ | now() |

Index: idx_activity_org_created ON activity_events(organization_id, created_at DESC)

### reports
Column | Type | Default | Notes
id | UUID | gen_random_uuid() | PK
organization_id | UUID | — | FK→organizations
type | report_type | 'monday_brief' | ENUM
period_start | DATE | — |
period_end | DATE | — |
content | JSONB | — | Weekly summary, KPIs, recommendations
generated_at | TIMESTAMPTZ | now() |

## Computed: Worker Health

Not stored — computed on read over rolling 7-day window:

```
escalation_rate = escalated_tasks / total_tasks
rejection_rate  = rejected_tasks / (rejected_tasks + completed_from_approval)
failed_rate     = failed_tasks / total_tasks

status = 'attention_needed' if escalation_rate > 0.15
                            or rejection_rate  > 0.20
                            or failed_rate     > 0.10
         else 'healthy'
```

## ENUMs

worker_type: lead_response, qualification, followup, recovery, appointment
worker_mode: off, observing, assisted, autonomous
lead_source: website_form, google_ads, meta_ads, whatsapp, landing_page, crm_import
lead_status: new, contacted, contacted_no_reply, in_conversation, qualified, disqualified, nurturing, booking_in_progress, booked, visited, cold, recoverable, lost, won
task_state: queued, in_progress, awaiting_approval, escalated, completed, rejected, failed
trigger_type: new_lead, lead_replied, follow_up_day_1, follow_up_day_3, follow_up_day_7, follow_up_day_14, recovery_buffer_elapsed, booking_requested, booking_failed, calendar_cancelled, manual
opportunity_stage: pipeline, site_visit, negotiation, won, lost
value_source: qualification_capture, human_override
appointment_status: scheduled, rescheduled, cancelled, attended, no_show
message_channel: whatsapp, email, sms
message_direction: inbound, outbound
message_sender: worker, human, lead
message_type: text, image, file, audio, video, location
activity_event_type: lead_contacted, lead_qualified, lead_disqualified, follow_up_sent, recovery_started, recovery_succeeded, appointment_booked, appointment_rescheduled, appointment_attended, appointment_no_show, task_escalated, task_approved_by_human, task_rejected_by_human, opportunity_won, opportunity_lost
integration_type: whatsapp, google_calendar, google_ads, meta_ads, crm_import
integration_health: healthy, attention_needed, disconnected
knowledge_type: faq, pricing, brochure, policy, sales_script, project_details
report_type: monday_brief
