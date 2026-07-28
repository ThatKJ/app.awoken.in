# API Contracts

## Principles

- Server Functions (`use server`) for mutations
- Server Components with direct database queries for reads
- Route Handlers only for webhooks and external API endpoints
- Every mutation must verify auth + org membership

## Server Functions

### Auth

```
signup(formData)           → creates org + user + session
login(formData)            → validates credentials + session
logout()                   → destroys session
```

### Organizations

```
updateOrganization(formData) → updates name, settings
```

### Workers

```
updateWorkerMode(workerId, mode)   → sets off/observing/assisted/autonomous
getWorkerHealth(workerType)        → computed over 7-day window
```

### Leads

```
createLead(formData)               → creates lead + conversation + task
updateLeadStatus(leadId, status)   → transitions lead (with validation)
assignLead(leadId, userId)         → assigns to human
```

### Tasks

```
approveTask(taskId)       → COMPLETED
rejectTask(taskId, reason) → REJECTED
escalateTask(taskId, reason) → ESCALATED
```

### Conversations

```
sendMessage(conversationId, content, channel)
```

### Opportunities

```
updateOpportunityValue(opportunityId, value)
overrideOpportunityStage(opportunityId, stage)
```

### Appointments

```
bookAppointment(leadId, scheduledAt)
cancelAppointment(appointmentId)
markAttendance(appointmentId, status)  → attended/no_show
```

### Knowledge

```
createKnowledgeItem(formData)
updateKnowledgeItem(id, formData)
publishKnowledgeItem(id)
archiveKnowledgeItem(id)
```

### Integrations

```
connectIntegration(type, credentials)
disconnectIntegration(id)
```

## Webhook Endpoints

```
POST /api/webhooks/whatsapp   → incoming message from WhatsApp
POST /api/webhooks/calendar   → calendar event changes
POST /api/webhooks/ads        → lead from Google/Meta Ads
```

## Query Patterns

### Command Center

```sql
-- Pipeline total
SELECT COALESCE(SUM(value), 0) FROM opportunities
WHERE organization_id = $1 AND stage NOT IN ('won', 'lost');

-- Today's metrics
SELECT COUNT(*) FILTER (WHERE date(created_at) = CURRENT_DATE) as tasks_today
FROM tasks WHERE organization_id = $1;

-- Worker queue sizes
SELECT worker_type, COUNT(*) FROM tasks
WHERE organization_id = $1 AND state IN ('queued', 'in_progress')
GROUP BY worker_type;

-- Activity feed
SELECT * FROM activity_events
WHERE organization_id = $1
ORDER BY created_at DESC LIMIT 50;
```

### Worker Health

```sql
WITH task_stats AS (
  SELECT
    worker_type,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE state = 'escalated') as escalated,
    COUNT(*) FILTER (WHERE state = 'failed') as failed,
    COUNT(*) FILTER (WHERE state = 'rejected') as rejected
  FROM tasks
  WHERE organization_id = $1
    AND created_at > now() - interval '7 days'
  GROUP BY worker_type
)
SELECT *,
  CASE WHEN escalated::float / NULLIF(total, 0) > 0.15 THEN 'attention_needed'
       WHEN rejected::float / NULLIF(total, 0) > 0.20 THEN 'attention_needed'
       WHEN failed::float / NULLIF(total, 0) > 0.10 THEN 'attention_needed'
       ELSE 'healthy'
  END as health_status
FROM task_stats;
```

### Lead Status Transitions

Valid transitions are enforced by the application layer:

```
new → contacted → in_conversation → qualified → booking_in_progress → booked → visited → won
                                                                                  → lost
                                 → disqualified (terminal)
qualified → nurturing → cold → recoverable → in_conversation (recovery)
                                             → lost (attempts exhausted)
```
