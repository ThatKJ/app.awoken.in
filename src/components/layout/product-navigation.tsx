"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AppLogo } from "@/components/layout/app-logo"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"

export function ProductNavigation() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        "bg-background/70 backdrop-blur-md border-b border-border",
      )}
    >
      <div className="mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
        <AppLogo />
        <nav className="flex items-center gap-4" aria-label="Main navigation">
          <Link
            href="/login"
            className={cn(
              "rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200",
              pathname === "/login"
                ? "text-text-primary bg-surface"
                : "text-muted-foreground hover:text-text-primary hover:bg-surface",
            )}
          >
            Sign In
          </Link>
          <div className="pl-3 border-l border-border">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
