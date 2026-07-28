# Worker Architecture

## The Five Worker Types

### 1. Lead Response
Trigger: new lead from any source
Action: First contact message (WhatsApp/email/SMS)
Lead status: new → contacted
KPI: Average response time, Contact rate, First response success

### 2. Qualification
Trigger: lead enters in_conversation
Action: Asks qualification questions, evaluates answers
Lead status: in_conversation → qualified OR disqualified
KPI: Qualification rate, Avg qualification time

### 3. Follow-up
Trigger: lead enters contacted_no_reply OR nurturing
Action: Day 1/3/7/14 cadence messages
Lead status: nurturing → contacted (if reply) OR cold (if silence)
KPI: Response rate, Follow-up success, Leads re-engaged

### 4. Recovery
Trigger: lead enters recoverable
Action: Fresh campaign to re-engage
Lead status: recoverable → in_conversation (capped at 2 attempts)
KPI: Recovery rate, Revenue recovered, Conversations restarted

### 5. Appointment
Trigger: lead is qualified with site-visit intent
Action: Schedule/reschedule/cancel appointments
Lead status: booking_in_progress → booked → visited
KPI: Site visits booked, Attendance rate, No-show recovery

## Modes

Off → Observing → Assisted → Autonomous

### Off
Worker does not claim tasks. Tasks stay queued until a human handles them.

### Observing
Worker completes evaluation and produces a recommendation.
Task closes as completed with actioned: false.
No messages sent, no bookings made.
Excluded from revenue-facing KPIs.

### Assisted (default)
Worker proposes action → awaiting_approval → human approves/rejects.
Tasks go through human review.
Collects approval/rejection data.

### Autonomous
Worker goes straight from in_progress → completed.
No human gate.
Safety floor: confidence < 70% forces awaiting_approval regardless.

## Task Lifecycle

```
QUEUED → IN_PROGRESS → AWAITING_APPROVAL → COMPLETED
                                       → REJECTED
                     → ESCALATED → COMPLETED (by human)
                     → FAILED
```

### States
- **QUEUED**: Created, waiting for worker
- **IN_PROGRESS**: Worker actively executing
- **AWAITING_APPROVAL**: Proposed action, needs sign-off
- **ESCALATED**: Worker has no proposed action, needs human
- **COMPLETED**: Action taken, triggers lead status transition
- **REJECTED**: Human declined, no status transition
- **FAILED**: Technical error

## Worker Health (Computed)

Computed on read over rolling 7-day window.

Thresholds:
- escalation_rate > 15% → attention_needed
- rejection_rate > 20% → attention_needed
- failed_rate > 10% → attention_needed

## Per-Worker KPIs

See database.md for SQL queries. Key metrics per worker:

- Lead Response: avg response time, contact rate
- Qualification: qualification rate, avg time
- Follow-up: response rate, re-engagement count
- Recovery: recovery rate, revenue recovered
- Appointment: bookings, attendance rate

## Guardrails

1. One open task per lead (database constraint)
2. Autonomous mode confidence floor: 70%
3. Recovery attempt cap: 2
4. No two workers message same lead simultaneously
