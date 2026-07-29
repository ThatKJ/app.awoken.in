"use client"

import Link from "next/link"
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
      <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border/60 px-5">
        <Link
          href="/"
          className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
          aria-label="Awoken Home"
        >
          <img
            src="/awoken-wordmark-black.svg"
            alt="Awoken"
            className="block h-23  w-auto dark:hidden"
          />
          <img
            src="/awoken-wordmark-white.svg"
            alt="Awoken"
            className="hidden h-23 w-auto dark:block"
          />
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
