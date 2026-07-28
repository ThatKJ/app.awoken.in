# Awoken — Design Language

## Identity

Awoken is the Bloomberg Terminal for AI-powered businesses.

Information first. Decisions over decoration. Always live. Trusted. Built for operators, not spectators.

## What This Means

An operating system for your AI workforce. You monitor, configure, and trust. The system is always working — not just displaying data.

The product is for CEOs, sales managers, operations heads, and business owners — people who spend 8+ hours inside dashboards. Every design decision optimizes for long-form scanning, pattern recognition, and rapid decision-making.

## Design Principles

### 1. An executive should understand the business in 5 seconds.

The Command Center is the first thing a CEO sees. It must communicate: pipeline health, workforce status, attention items, and revenue trajectory — all within a single glance. If it takes longer than 5 seconds to understand, it fails.

### 2. Build around a story, not a grid.

The dashboard flows: Business → AI → People → History. Hero Metric → Business Health Strip → AI Recommendation → Workers → Activity → Charts. Everything is narrative, not just a spreadsheet of cards.

### 3. Everything should feel operational, not decorative.

Every component exists because a CEO needs to make a decision. If a card, icon, or animation doesn't help someone understand the state of their business, remove it.

### 4. Orange represents intelligence, nothing else.

Primary orange (#F97316) is reserved exclusively for: AI thinking/acting, AI recommendations, primary CTAs, active worker indicators, and critical alerts. Never use orange for borders, decorative backgrounds, static elements, or any non-AI purpose. When orange appears, it should immediately draw the eye — because the system is telling you something important.

### 5. Light inspires confidence.

The canvas (#F7F6F3) is warm, calm, and professional — like Stripe Dashboard or Arc. Not sterile white (#FFF), not beige (#FAF9F5). Light backgrounds provide stronger contrast for dense business data and are easier to scan for long periods. This is an executive tool, not a developer IDE.

### 6. Use borders 70% less.

Replace borders with background differences, spacing, typography, and subtle shadows. Information should be grouped by proximity and visual weight, not boxes. A card doesn't need a border if there's enough whitespace — use borders only when necessary to define boundaries.

### 7. Typography creates hierarchy, not boxes.

Use type weight, size, and spacing to establish what matters. A hero number at 36px + the label beneath it communicates importance faster than any card border. Never use borders or shadows to create hierarchy.

### 8. Data before visuals.

A number with context is worth more than a chart. A chart with a recommendation is worth more than a number. Always ask: what does this data mean? Never show data without interpretation.

### 9. Every pixel should have purpose.

If a margin, border, or icon doesn't serve a functional purpose, it's noise. The target is high-density information without feeling cluttered.

### 10. Every animation communicates progress.

Animations are not for delight — they're for understanding. A card sliding into a new column tells you the deal moved. A progress bar filling tells you work is being done. Numbers counting up show live updates. If an animation doesn't communicate state change, don't animate.

## Visual Language

### Density

- Target information density: 60–65%
- Large hero metric creates breathing room at the top
- Supporting sections tighten as the eye moves down
- Cards are information containers, not decorative tiles
- Padding: 12–20px depending on card importance
- Card spacing: 8–16px depending on relationship

### Tone

- Professional, precise, calm, confident
- No gradients, no glassmorphism, no decorative flourishes
- Every visual decision serves clarity
- The UI should feel like a control room — quiet, focused, always running

### Personality

If you replaced the Awoken logo with HubSpot, the product should feel wrong.

Awoken is:
- **Alive** — data moves, workers think, status changes, timestamps tick
- **Intelligent** — AI surfaces insights proactively, not on demand
- **Trustworthy** — numbers are precise, timestamps are live, nothing feels fake
- **Fast** — everything responds in <200ms, transitions are 100ms
- **Focused** — no noise, no decoration, every pixel earned

### Hierarchy System

Use three card sizes to establish importance:
- **Large** — Hero metrics, AI recommendations (command attention)
- **Medium** — Worker cards, detail panels (standard reading)
- **Small** — Status badges, trend indicators, metadata (supporting info)

## Colors

### Surface Hierarchy (Light)

| Layer | Hex | Usage |
|-------|-----|-------|
| Canvas | `#F7F6F3` | Page background, deepest layer |
| Surface | `#FFFFFF` | Cards, sidebar, modals, dropdowns |
| Elevated | `#FCFCFC` | Hover states, subtle distinction |
| Border | `#E7E5E4` | Default borders |
| Border Hover | `#D6D3D1` | Interactive border states |

### Brand

- Primary Orange: `#F97316` — AI intelligence, active state, primary CTAs only
- Orange Hover: `#EA580C` — Interactive state
- Orange Light: `#FFF7ED` — AI-thinking backgrounds (use extremely sparingly)

### Text

- Primary: `#111111` — Headings, data values, primary labels
- Secondary: `#6B7280` — Body text, descriptions, secondary info
- Muted: `#9CA3AF` — Timestamps, metadata, placeholders

### Semantic

- Green (`#22C55E`) — Success, healthy, active, won
- Yellow (`#F59E0B`) — Warning, attention, medium confidence
- Blue (`#3B82F6`) — Info, processing, neutral system events
- Red (`#EF4444`) — Error, danger, critical, lost

### Usage Constraints

- Orange must never be used for borders, decorative backgrounds, or static elements
- Semantic colors must only appear in context (green for positive, red for problems)
- Never use color purely for visual interest — every color carries meaning

## Typography

- Font: Inter (body), Geist (UI labels)
- Monospace: For data, metrics, code, timestamps
- Data: Tabular numbers for all metrics (`tabular-nums`)
- Hero numbers: 36px, 700 weight, tight tracking
- Section headers: 13px, 600 weight, uppercase
- Body: 14px, 400 weight

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| 2px | 0.5 | Separators, dividers |
| 4px | 1 | Tight inner padding |
| 8px | 2 | Card padding, gap between related items |
| 12px | 3 | Section spacing, card inner padding |
| 16px | 4 | Standard component padding |
| 20px | 5 | Page section spacing |
| 24px | 6 | Page margins |
| 32px | 8 | Large section breaks |
| 40px | 10 | Hero section padding |

## Elevation

- Cards: No shadow — use borders only
- Elevated: `shadow-sm` — subtle shadow for dropdowns, popovers
- Modals: `shadow-lg` — significant depth for modals, drawers
- Hover: `translateY(-1px)` + border color change, 100ms

## Animation

| Use | Duration | Easing |
|-----|----------|--------|
| Micro-interactions (hover, focus) | 100ms | ease-out |
| State changes (toggle, expand) | 150ms | ease-out |
| Page transitions (section fade-in) | 200ms | ease-out |
| Drawer / Modal open | 250ms | ease-out |
| Progress (bars, spinners) | 600ms | ease-in-out |
| Counter animation | 400ms | cubic-bezier(0.25, 0.1, 0.25, 1) |

All animations use `ease-out` for enter and `ease-in` for exit. No bounce, no spring, no elastic.

## Page Architecture

Every page follows this structure:

```
Header (breadcrumb + actions)
  ↓
Hero / Summary (primary metric + secondary indicators)
  ↓
AI Recommendation (intelligence section — largest card)
  ↓
Primary Content (workers / leads / conversations / etc.)
  ↓
Activity / Secondary Content (live feed, supporting data)
  ↓
Charts / Analytics (trends, forecasts)
```

Exceptions are documented per page.

## Voice & Microcopy

- Professional but not corporate
- Precise but not robotic
- "Revenue recovered" not "Total revenue from won deals"
- "Qualified automatically" not "Leads were qualified"
- Use active voice: "Worker responded" not "Response was sent by worker"
- Dates are relative: "2 min ago", "Yesterday", "15 Jun"
- Numbers are precise: "₹82,431" not "₹82k"
