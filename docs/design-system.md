# Awoken Design System

## Brand: The Bloomberg Terminal for AI-Powered Businesses

This document defines the concrete design tokens for Awoken. For design principles and identity, see `DESIGN.md`.

## Colors (Light Theme)

### Surface Hierarchy

| Layer | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| Canvas | `--canvas` | `#F7F6F3` | Page background, deepest layer |
| Surface | `--surface` | `#FFFFFF` | Cards, sidebar, modals, dropdowns |
| Elevated | `--elevated` | `#FCFCFC` | Hover states, subtle distinction |
| Border | `--border` | `#E7E5E4` | Default borders |
| Border Hover | `--border-hover` | `#D6D3D1` | Interactive border states |

### Brand Colors

| Token | Hex | Usage Rules |
|-------|-----|-------------|
| Primary (Orange) | `#F97316` | AI actions only — CTAs, AI recommendations, active workers |
| Primary Hover | `#EA580C` | Interactive state for primary elements |
| Primary Light | `#FFF7ED` | AI-thinking backgrounds (sparingly) |
| Primary Foreground | `#FFFFFF` | Text on orange backgrounds |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Success | `#22C55E` | Healthy, active, won deals, positive trends |
| Warning | `#F59E0B` | Attention needed, medium confidence, pending |
| Info | `#3B82F6` | Processing, informational, system events |
| Danger | `#EF4444` | Errors, escalations, critical, lost deals |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| Foreground | `#111111` | Headings, data values, primary labels |
| Muted Foreground | `#6B7280` | Body text, descriptions, secondary info |
| Muted | `#9CA3AF` | Timestamps, metadata, placeholders |

## Typography

| Level | Size | Weight | Tracking | Usage |
|-------|------|--------|----------|-------|
| hero | 36px | 700 | -0.02em | Primary metric on dashboard |
| h1 | 24px | 600 | -0.01em | Page titles |
| h2 | 18px | 600 | normal | Section headers |
| h3 | 16px | 600 | normal | Card titles |
| body | 14px | 400 | normal | Body text |
| body-sm | 13px | 400 | normal | Secondary text |
| meta | 12px | 500 | normal | Labels, metadata |
| tiny | 11px | 500 | 0.02em | Badges, status |
| label | 11px | 600 | 0.04em | Uppercase section labels |

**Rules:**
- All data values use `tabular-nums` for consistent width
- Headings never use letter-spacing tighter than -0.02em
- Never use font-weight below 400 for readable text

## Spacing Scale

| Token | Px | Tailwind |
|-------|----|----------|
| 0.5x | 2px | `0.5` |
| 1x | 4px | `1` |
| 2x | 8px | `2` |
| 3x | 12px | `3` |
| 4x | 16px | `4` |
| 5x | 20px | `5` |
| 6x | 24px | `6` |
| 8x | 32px | `8` |
| 10x | 40px | `10` |

**Density rules:**
- Hero section padding: 40px (`p-10`)
- Standard card padding: 16px (`p-4`)
- Compact card padding: 12px (`p-3`)
- Card spacing in grids: 8–12px (`gap-2` to `gap-3`)
- Page margins: 24px (`p-6`)
- Section spacing: 20–24px (`gap-5` to `gap-6`)
- Table cell padding: 8–10px (`py-2` / `py-2.5`)
- Sidebar item padding: 8px vertical (`py-1.5`)

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-lg` | 8px | Buttons, inputs, badges |
| `rounded-xl` | 12px | Cards, modals, dropdowns — primary radius |
| `rounded-2xl` | 16px | Hero section, AI recommendation card |
| `rounded-full` | 9999px | Badges, avatars, dots |

**Rule:** Cards use `rounded-xl` (12px). Never mix radius values within the same component.

## Elevation & Shadows

- Cards: No default shadow — use 1px border for definition
- Elevated (hover, active): `shadow-sm` — subtle distinction
- Modals/Drawers: `shadow-lg` — significant depth
- Hover lift: `translateY(-1px)` + border hover color, 100ms ease

Never use box-shadow on cards in a grid (only on the AI recommendation card to distinguish it).

## Animation

| Use | Duration | Easing | Property |
|-----|----------|--------|----------|
| Micro (hover, focus) | 100ms | ease-out | color, bg, border |
| State (toggle, expand) | 150ms | ease-out | transform, opacity |
| Page (fade-in section) | 200ms | ease-out | opacity, y |
| Drawer / Modal | 250ms | ease-out | transform, opacity |
| Progress fill | 600ms | ease-in-out | width |
| Counter morph | 400ms | cubic-bezier(0.25, 0.1, 0.25, 1) | number |

**Keyframe animations defined in `globals.css`:**
- `slide-up` — Enter animation from 8px below
- `fade-in` — Simple opacity
- `pulse-dot` — 2s pulse for active indicators
- `progress-fill` — 0→width for progress bars
- `notification-in` — slide + scale for alerts
- `count-up` — enter animation for changing numbers

**Rules:**
- Every animation uses `both` fill-mode
- `prefers-reduced-motion` disables all animations
- No bounce, spring, or elastic easing
- No animation longer than 600ms

## Icons

- Library: Lucide React
- Default stroke: `strokeWidth={2}`
- Size: 14px inline / 16-18px section headers / 20px empty states
- Icons must always have semantic purpose — never decorative

## Components

### Cards
- Radius: `rounded-xl` (12px) or `rounded-2xl` (16px) for hero/AI cards
- Border: 1px solid `var(--color-border)` — no shadow
- Background: `var(--color-card)`
- Padding: `p-4` (16px) standard, `p-3` (12px) compact
- Hover: `hover:border-var(--color-border-hover)` + `hover:-translate-y-px` when interactive
- Never use box-shadow on cards in a grid
- AI Recommendation card: `rounded-2xl`, subtle `shadow-sm`, orange accent

### Buttons
- Primary: `bg-primary text-white rounded-xl px-4 py-2 text-sm font-medium`
- Secondary: `border border-border bg-white text-foreground rounded-xl px-3.5 py-2 text-sm`
- Ghost: `text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl`
- Danger: `bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-xl`
- Icon: `size-8 rounded-lg` with icon
- All: 100ms transitions, active: `translate-y-px`

### Badges
- `rounded-full px-2 py-0.5 text-[11px] font-medium`
- Variants: success/10, warning/10, danger/10, info/10, neutral (bg-muted), ai (primary/10)

### Metric Cards
- No border default (use gap for separation)
- Label: 11px uppercase tracking-wider, text-muted-foreground
- Value: 24px font-semibold tabular-nums text-foreground
- Trend: 12px inline text

### Progress Bars
- Height: `h-1` or `h-1.5` (never thicker)
- Background: `bg-muted/50`
- Fill: semantic color
- Animation: 600ms ease-in-out on width change

### Tables
- Minimal: no outer border, only row borders
- Header: 11px uppercase tracking-wider text-muted-foreground
- Rows: `border-b border-border/50`
- Hover: `hover:bg-muted/30`
- Cell padding: `py-2.5 px-3`
- No alternating row colors

### Drawers
- Width: 480px (standard) / 520px (data-rich) / 380px (compact)
- Animation: slide from right, 250ms ease
- Header: border-bottom, title + close button

## Grid Breakpoints

| Breakpoint | Width | Columns | Gutter |
|------------|-------|---------|--------|
| Mobile | <768px | 1 | 16px |
| Tablet | 768–1024px | 2 | 16px |
| Desktop | 1024–1440px | 3–4 | 20px |
| Wide | >1440px | 4–6 | 24px |

## Focus & Accessibility

- All interactive elements show `focus-visible:ring-2 ring-ring` on keyboard focus
- Reduced motion: `prefers-reduced-motion: reduce` disables all animations
- Tab order follows visual order (left to right, top to bottom)
- All icons have `aria-hidden="true"` when decorative
- All interactive elements have `aria-label` or visible text
- Color is never the only indicator of state (use icons + text + color)
