# UI Specification

## Layout

### Sidebar
- Width: 288px (w-72)
- Background: #F8F6F1
- Border-right: 1px solid #DDD7CC
- Active item: orange (#F97316) left border pill (4px), semi-bold text
- Inactive item: text #525252, hover bg #E4E2E2
- Bottom section: settings, organization, user profile

### Top Navigation
- Height: 64px
- Background: #F4F2EC with 80% backdrop-blur
- Breadcrumb on left
- Search bar (⌘K) on right
- Notification bell with dot indicator

### Main Content
- Background: #F4F2EC
- Max width: 1280px centered
- Gutter padding: 24px

## Pages

### Command Center
- Pipeline metric: large number (₹3.2M) with trend
- Status bar: worker count, tasks today, conversations, issues
- 4 metric cards: Recovery ($), Qualification (%), Avg Speed (s), AI Recommendation
- Active Workforce grid: 2x2 cards with worker status
- Live Activity Feed: timeline with events grouped by worker
- Bottom ticker: scrolling updates

### Workforce
- Worker cards grid
- Each card: worker name, agent name, queue count, status, progress bar, last action
- Color-coded by worker type
- Click routes to worker detail

### Leads
- Table with filters (status, source, date)
- Each row: name, source, status badge, assigned to, created date
- Click routes to lead detail
- Bulk actions

### Lead Detail
- Lead info card (name, contact, source, status timeline)
- Conversation thread
- Task history
- Opportunity card (if qualified)
- Appointment card (if booked)

### Conversations
- Split pane: inbox on left, message view on right
- Filter by channel (WhatsApp, email, SMS)
- Message bubbles with sender indicators
- Reply field with channel selector

### Opportunities
- Pipeline kanban board: Pipeline → Site Visit → Negotiation → Won/Lost
- Cards show lead name, value, stage
- Drag to update stage

### Knowledge
- List of knowledge items with type badges
- Search/filter
- Create/edit dialog
- Version history

### Reports
- Monday Brief report card
- KPIs grid (per worker)
- Charts (revenue trend, conversion funnel)

### Settings
- Organization profile (name, logo)
- Worker mode toggles (per worker type)
- Integrations list with health status
- Notification preferences

## Responsive Behavior

- Desktop (≥1024px): Full sidebar + content
- Tablet (768-1023px): Collapsed sidebar + content
- Mobile (<768px): Hidden sidebar, hamburger menu, stacked layouts
