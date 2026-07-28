# Design QA — Definition of Done

Every page must pass this review before it ships. This is not a passive checklist — it is the contract between design and engineering. If a page fails any item, it is not done.

---

## 1. Visual

**Hierarchy**
- [ ] Exactly one hero section (primary metric)
- [ ] Exactly one primary CTA per page
- [ ] Sections ordered by narrative: Business → AI → Issues → People → History
- [ ] Supporting sections visually subordinate to hero (smaller type, less contrast)
- [ ] Information is scannable in 3–5 seconds

**Spacing**
- [ ] Page uses `max-w-[1400px] mx-auto` (exception: Settings uses `max-w-[1200px]`)
- [ ] Page uses `px-5 gap-5` for the outer container
- [ ] Card padding follows approved scale: `p-4` (standard), `p-3` (compact), `p-5` (hero/AI)
- [ ] Section gap uses `gap-5` between top-level sections
- [ ] Inner grid gaps use `gap-3` or `gap-4` (never more than `gap-5`)
- [ ] No element uses a spacing token not in the approved scale (px: 2, 4, 8, 12, 16, 20, 24, 32, 40)

**Radius**
- [ ] Only three radius values are used: `rounded-lg` (8px — buttons, inputs, badges), `rounded-xl` (12px — cards, default), `rounded-2xl` (16px — hero metric, AI recommendation)
- [ ] No component mixes radius values

**Shadows**
- [ ] Cards in grids: no shadow, only 1px border
- [ ] Elevated states (hover, active): `shadow-sm` only
- [ ] Modals, drawers, dropdowns: `shadow-lg` only
- [ ] The AI recommendation card is the only card permitted to use `shadow-sm` by default

**Borders**
- [ ] Cards use 1px `border-border` (no thicker, no thinner)
- [ ] Hover states change border to `border-border-hover` + `-translate-y-px` in 100ms
- [ ] Borders are never used as decorative elements — only to define boundaries
- [ ] Information grouped by whitespace does not need a border

**Forbidden patterns**
- [ ] No decorative gradients (`bg-gradient-to-*`)
- [ ] No glow effects (`shadow-[0_0_*]`, `drop-shadow-[*]`, `blur-*`)
- [ ] No decorative circles, floating shapes, or abstract ornaments
- [ ] No background images used as decoration
- [ ] No floating elements without semantic purpose
- [ ] The single rule: every pixel must convey information or state. If it doesn't, remove it.

---

## 2. Components

**Card primitive**
- [ ] All card-like containers use `rounded-xl border border-border bg-card`
- [ ] Hero/AI cards use `rounded-2xl` (never `rounded-xl`)
- [ ] Metric cards (compact): `rounded-xl border border-border bg-card p-3`
- [ ] Standard cards: `rounded-xl border border-border bg-card p-4`
- [ ] Interactive cards add `hover:border-foreground/20 hover:-translate-y-px transition-all duration-150`

**Icon containers**
- [ ] Inline icon containers: `size-6 rounded-md bg-muted` with `size-3` icon
- [ ] Section icon containers (AI card): `size-8 rounded-lg bg-primary` with `size-4` icon
- [ ] Empty state icons: `size-20` with `text-muted-foreground`
- [ ] All icons use `strokeWidth={2}` (exceptions only for data density)
- [ ] All icons have `aria-hidden="true"` when decorative

**Badges**
- [ ] Only one badge style: `rounded-full px-2 py-0.5 text-[11px] font-medium`
- [ ] Approved variants and their hex: success (`bg-success/10 text-success`), warning (`bg-warning/10 text-warning`), danger (`bg-danger/10 text-danger`), info (`bg-info/10 text-info`), neutral (`bg-muted text-muted-foreground`), AI (`bg-primary/10 text-primary`)
- [ ] No custom badge sizes, no inline `text-[9px]` or `px-1` overrides
- [ ] Badges have semantic meaning — never used for decoration

**Progress bars**
- [ ] Height: `h-1` or `h-1.5` only
- [ ] Track: `bg-muted/50`
- [ ] Fill: semantic color matching data context
- [ ] Animation: 600ms `ease-in-out` on width change
- [ ] Always paired with a percentage label

**Tables**
- [ ] No outer border — only row borders
- [ ] Header: `text-[11px] font-semibold uppercase tracking-wider text-muted-foreground`
- [ ] Rows: `border-b border-border/50`
- [ ] Hover: `hover:bg-muted/30`
- [ ] Cell padding: `py-2.5 px-3`
- [ ] No alternating row colors

**Buttons**
- [ ] Primary: `bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-medium`
- [ ] Secondary: `border border-border bg-card text-foreground rounded-xl px-3.5 py-2 text-sm`
- [ ] Ghost: `text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl`
- [ ] Danger: `bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-xl`
- [ ] Icon: `size-8 rounded-lg`
- [ ] Transition: 100ms `ease-out` on color/bg/border + active `translate-y-px`

**Drawers/Modals**
- [ ] Width follows approved scale: 380px (compact), 480px (standard), 520px (data-rich)
- [ ] Animation: slide from right, 250ms `ease-out`
- [ ] Header includes border-bottom + title + close button
- [ ] Background scrim uses `bg-black/20` with `backdrop-blur-sm`

---

## 3. Operational

**Page states**
- [ ] Loading state: skeleton matching final layout shape, `animate-pulse` on `bg-muted/30` blocks
- [ ] Empty state: centered icon + title + description + action button
- [ ] Error state: centered icon + error message + retry action
- [ ] Success feedback: inline toast or badge, semantic green
- [ ] All states use the same spacing, radius, and typography as the loaded page

**Live indicators**
- [ ] Any frequently updating value shows a `animate-pulse-dot` (2s pulse, `bg-success`)
- [ ] Workers display status dots: `online` (green + pulse), `review` (warning, static), `offline` (muted, static)
- [ ] Relative timestamps on all time values (never absolute dates in primary views)
- [ ] Numbers use `tabular-nums` for consistent alignment

**What is missing**
- [ ] Every page has a clearly defined empty state
- [ ] Every list/fetch has a loading state
- [ ] Every mutation has error handling
- [ ] Empty states include a primary action (not just text)
- [ ] Error states include a retry mechanism

**Accessibility**
- [ ] All interactive elements reachable via keyboard (Tab order follows visual order)
- [ ] All interactive elements show `focus-visible:ring-2 ring-ring` on keyboard focus
- [ ] All icons have `aria-hidden="true"` when decorative
- [ ] All interactive elements have `aria-label` when icon-only
- [ ] Color is never the only indicator of state (paired with icon, text, or pattern)
- [ ] `prefers-reduced-motion: reduce` disables all animations
- [ ] Minimum contrast ratio: 4.5:1 for text, 3:1 for large text

---

## 4. Executive Test

Open the page. **Five seconds.** Can you answer:

| Question | Where to find it |
|----------|-----------------|
| What is happening? | Hero metric — primary KPI for this section |
| What needs attention? | Issues, warnings, errors — surfaced proactively |
| What should I do next? | Primary CTA or AI recommendation — explicit next action |

If the page does not answer all three, it is not finished.

---

## 5. Page-Specific Requirements

These override the general rules where noted.

### Command Center
- [ ] Sections in order: Hero Metric → Status Strip → AI Recommendation → Needs Attention → Workforce → Activity
- [ ] Hero shows: pipeline value, trend %, target progress
- [ ] Status strip shows: 5 operational metrics with pulse indicators
- [ ] AI recommendation is the largest card on the page
- [ ] Needs attention: 3–5 items with severity + relative time + click target
- [ ] Workforce: worker cards with status dots, mode badges, live stats
- [ ] Activity: timeline with today/yesterday sections, relative timestamps

### Workers
- [ ] Hero shows: total workers, active/healthy count
- [ ] Filter + search at top
- [ ] Worker cards show: name, role, status, mode, activity, KPIs
- [ ] Worker card hover reveals detail action
- [ ] Empty state: "No workers configured" with "Add Worker" CTA
- [ ] Detail drawer for individual worker (future)

### Leads
- [ ] Table with sortable columns
- [ ] Inline actions for qualification/status change
- [ ] Bulk selection
- [ ] Empty state

### Conversations
- [ ] Full-height layout (exception to standard spacing)
- [ ] Three-panel: list + active conversation + details
- [ ] Active conversation panel is the primary action area
- [ ] Relative timestamps on all messages

### Opportunities
- [ ] Kanban board with stage columns
- [ ] Drag-to-move between stages
- [ ] Summary metrics above the board
- [ ] Detail drawer for individual opportunity
- [ ] Empty state per column

### Reports
- [ ] Date range filter at top
- [ ] KPI summary grid
- [ ] Charts use theme colors, no decorative gradients
- [ ] AI insights section at bottom
- [ ] Export functionality available

### Knowledge
- [ ] Folder sidebar + document grid + preview panel
- [ ] Search across all documents
- [ ] Stats grid showing document count, size, top sources
- [ ] Upload dialog
- [ ] Empty state for empty folders

### Integrations
- [ ] Grid of integration cards
- [ ] Connection status indicator (connected/disconnected/error)
- [ ] Configure/disconnect actions per card
- [ ] Empty state: "No integrations configured"

### Settings
- [ ] Sidebar navigation with section links
- [ ] Each section is a standalone form
- [ ] Save/Reset actions in header
- [ ] Danger zone at bottom with explicit confirmation
- [ ] Loading skeleton matches sidebar + content layout

---

## 6. Rollout Order

Pages must be reviewed in this order. Each page becomes the canonical reference for the next. If a page introduces a new pattern, the previous page must be updated to match.

1. Command Center (reference) ✅
2. Workers (next)
3. Leads
4. Conversations
5. Opportunities
6. Reports
7. Knowledge
8. Integrations
9. Settings

**Golden rule:** A page is rejected if it introduces a new spacing token, badge variant, radius value, icon size, shadow level, or interaction pattern without a documented reason in the page-specific requirements above.
