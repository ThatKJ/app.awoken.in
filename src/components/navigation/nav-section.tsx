"use client"

import { NavItem } from "@/components/navigation/nav-item"
import type { NavSection as NavSectionType } from "@/lib/navigation"

export function NavSection({ section }: { section: NavSectionType }) {
  return (
    <div role="group" aria-label={section.title ?? section.items[0]?.title}>
      {section.title && (
        <div className="px-3 pb-0.5 pt-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
            {section.title}
          </span>
        </div>
      )}
      <nav className="flex flex-col gap-0.5">
        {section.items.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </nav>
    </div>
  )
}
