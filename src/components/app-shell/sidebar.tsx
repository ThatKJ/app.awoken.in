"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { navigation } from "@/lib/navigation"
import { NavSection } from "@/components/navigation/nav-section"
import { NavFooter } from "@/components/navigation/nav-footer"

type SidebarProps = {
  collapsed: boolean
  onToggleCollapse: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ collapsed, onToggleCollapse: _, mobileOpen: __, onMobileClose: ___ }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 hidden w-[240px] flex-col border-r border-sidebar-border/60 bg-sidebar md:flex",
        collapsed && "hidden",
      )}
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-sidebar-border/60 px-5">
        <Link
          href="/"
          className="flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
          aria-label="Awoken Home"
        >
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="size-4 text-primary-foreground" strokeWidth={2} />
          </div>
          <div>
            <span className="text-sm font-bold text-sidebar-foreground">Awoken</span>
            <span className="block text-[10px] font-medium text-sidebar-foreground/40">AI Operating System</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin scrollbar-thumb-border/30 scrollbar-track-transparent">
        {navigation.map((section, i) => (
          <NavSection key={i} section={section} />
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border/60 px-3 py-3">
        <NavFooter />
      </div>
    </aside>
  )
}
