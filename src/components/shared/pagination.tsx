"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type PaginationProps = {
  current: number
  total: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ current, total, onPageChange, className }: PaginationProps) {
  if (total <= 1) return null

  function range() {
    const pages: number[] = []
    const start = Math.max(1, current - 1)
    const end = Math.min(total, current + 1)
    if (start > 1) pages.push(1)
    if (start > 2) pages.push(-1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < total - 1) pages.push(-2)
    if (end < total) pages.push(total)
    return pages
  }

  return (
    <nav className={cn("flex items-center justify-center gap-1", className)} aria-label="Pagination">
      <Button variant="ghost" size="icon-xs" disabled={current === 1} onClick={() => onPageChange(current - 1)} aria-label="Previous page">
        <ChevronLeft className="size-4" />
      </Button>
      {range().map((p, i) =>
        p < 0 ? (
          <span key={p} className="px-1 text-xs text-muted-foreground">...</span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(p)}
            className={cn(
              "flex size-7 items-center justify-center rounded-md text-xs font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              p === current ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            aria-current={p === current ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}
      <Button variant="ghost" size="icon-xs" disabled={current === total} onClick={() => onPageChange(current + 1)} aria-label="Next page">
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  )
}
