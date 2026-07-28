import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Target,
  MessageSquare,
  DollarSign,
  BarChart3,
  BookOpen,
  Puzzle,
  Settings,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  badge?: string | number
  disabled?: boolean
}

export type NavSection = {
  title?: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    items: [{ title: "Command Center", href: "/", icon: LayoutDashboard }],
  },
  {
    title: "Workforce",
    items: [
      { title: "Workers", href: "/workers", icon: Users },
      { title: "Tasks", href: "/tasks", icon: CheckSquare, disabled: true },
    ],
  },
  {
    title: "Sales",
    items: [
      { title: "Leads", href: "/leads", icon: Target },
      { title: "Conversations", href: "/conversations", icon: MessageSquare },
      { title: "Opportunities", href: "/opportunities", icon: DollarSign },
    ],
  },
  {
    items: [{ title: "Knowledge", href: "/knowledge", icon: BookOpen }],
  },
  {
    items: [{ title: "Reports", href: "/reports", icon: BarChart3, badge: "New" }],
  },
  {
    items: [{ title: "Integrations", href: "/integrations", icon: Puzzle, badge: 1 }],
  },
  {
    items: [{ title: "Settings", href: "/settings", icon: Settings }],
  },
]

export function getBreadcrumb(pathname: string): { label: string; href: string; isCurrent: boolean }[] {
  for (const section of navigation) {
    for (const item of section.items) {
      if (item.href === pathname) {
        const crumbs: { label: string; href: string; isCurrent: boolean }[] = []
        if (section.title) {
          crumbs.push({ label: section.title, href: item.href, isCurrent: false })
        }
        crumbs.push({ label: item.title, href: item.href, isCurrent: true })
        return crumbs
      }
    }
  }
  return [{ label: "Command Center", href: "/", isCurrent: true }]
}
