"use client"

import { usePathname } from "next/navigation"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { getBreadcrumb } from "@/lib/navigation"
import { CommandSearch } from "@/components/app-shell/command-search"
import { QuickAdd } from "@/components/app-shell/quick-add"
import { Notifications } from "@/components/app-shell/notifications"
import { UserMenu } from "@/components/app-shell/user-menu"

type TopbarProps = {
  onMobileMenuToggle: () => void
}

export function Topbar({ onMobileMenuToggle }: TopbarProps) {
  const pathname = usePathname()
  const breadcrumb = getBreadcrumb(pathname)

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-border/60 bg-background px-4 md:px-6">
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 md:hidden"
        onClick={onMobileMenuToggle}
        aria-label="Open sidebar"
      >
        <PanelLeft className="size-4" strokeWidth={2} />
      </Button>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="hidden items-center gap-1.5 md:flex">
        {breadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-muted-foreground/30 text-xs">/</span>}
            <span
              className={cn(
                "text-sm transition-colors duration-100",
                crumb.isCurrent
                  ? "font-medium text-foreground"
                  : "text-muted-foreground/60",
              )}
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1 min-w-0" />

      {/* Search trigger */}
      <div className="hidden sm:block w-44 lg:w-52">
        <CommandSearch />
      </div>

      {/* Quick Add */}
      <div className="hidden sm:block">
        <QuickAdd />
      </div>

      {/* Notifications */}
      <Notifications />

      {/* User menu */}
      <UserMenu />
    </header>
  )
}
