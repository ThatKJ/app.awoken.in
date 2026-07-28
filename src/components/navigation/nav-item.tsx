"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { NavItem as NavItemType } from "@/lib/navigation"

export function NavItem({ item }: { item: NavItemType }) {
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <Link
      href={item.disabled ? "#" : item.href}
      data-active={isActive || undefined}
      data-disabled={item.disabled || undefined}
      aria-current={isActive ? "page" : undefined}
      aria-label={item.title}
      tabIndex={item.disabled ? -1 : 0}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium outline-none transition-all duration-100",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
        isActive
          ? "bg-sidebar-accent/60 text-foreground font-semibold"
          : "text-muted-foreground hover:bg-sidebar-accent/40 hover:text-foreground/80",
        item.disabled && "pointer-events-none opacity-30",
      )}
    >
      {isActive && (
        <div className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r-full bg-primary" />
      )}

      <item.icon
        className={cn("size-4 shrink-0", isActive && "text-foreground")}
        strokeWidth={2}
        aria-hidden="true"
      />

      <span className="truncate">{item.title}</span>

      {item.badge !== undefined && (
        <span
          className={cn(
            "ml-auto inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium leading-none",
            typeof item.badge === "string"
              ? "bg-primary/10 text-primary"
              : "bg-sidebar-accent text-sidebar-foreground/60",
          )}
        >
          {item.badge}
        </span>
      )}
    </Link>
  )
}
