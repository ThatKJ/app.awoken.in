# Awoken Architecture

## Overview

Awoken is an AI Workforce Operating System — a SaaS platform that manages AI workers
across five roles (Lead Response, Qualification, Follow-up, Recovery, Appointment)
to automate real estate sales operations.

## Tenets

1. **Leads are the source of truth.** Every action is traceable to a lead.
2. **Tasks are the unit of work.** Workers produce Tasks, Tasks mutate Lead status.
3. **One open Task per Lead.** Enforced at the database level — no two workers
   can act on the same lead simultaneously.
4. **No event sourcing.** `activity_events` is a denormalized read-only feed,
   not an event store.
5. **Server Components by default.** Client Components only when interactivity
   is required (state, event handlers, browser APIs).

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Radix primitives) |
| Database | Supabase (PostgreSQL) |
| ORM | Drizzle |
| Forms | React Hook Form + Zod |
| Server State | TanStack Query |
| Icons | Lucide |
| Animations | Framer Motion (minimal) |
| Auth | Supabase SSR |
| Deployment | Vercel |

## Route Structure

```
/                          → Marketing landing page
/login                     → Auth page
/(dashboard)               → Authenticated app shell
  /command-center          → Home dashboard
  /workforce               → Worker management
  /leads                   → Lead table + detail
  /conversations           → Unified inbox
  /opportunities           → Pipeline view
  /knowledge               → Knowledge base
  /reports                 → Analytics
  /settings                → Organization settings
```

## Data Flow

```
Lead created (any source)
  → Response Worker: First contact → CONTACTED
  → Lead replies → IN_CONVERSATION
  → Qualification Worker: Qualified/DISQUALIFIED
  → Appointment Worker: BOOKING_IN_PROGRESS → BOOKED → VISITED
  → Human: WON/LOST

No reply path:
  → CONTACTED_NO_REPLY → Follow-up Worker: Day 1/3/7/14 cadence
  → Silence → COLD → buffer → RECOVERABLE
  → Recovery Worker: New campaign (max 2 attempts)
```

## Key Constraints

- `tasks.lead_id` has a partial unique index where state IN ('queued', 'in_progress', 'awaiting_approval', 'escalated')
- `conversations.lead_id` is UNIQUE (1:1 Lead↔Conversation)
- `opportunities.lead_id` is UNIQUE (1:1 Lead↔Opportunity)
- `workers (organization_id, type)` is UNIQUE (one config per worker type per org)

## File Naming

- Components: `PascalCase.tsx`
- Hooks: `use-camel-case.ts`
- Utils: `camel-case.ts`
- Types: `PascalCase` in `types/`
- Server Actions: `camel-case.ts` in `lib/actions/`
