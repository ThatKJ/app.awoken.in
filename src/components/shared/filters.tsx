"use client"

import { SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Search } from "@/components/shared/search"

type FilterOption = {
  label: string
  value: string
}

type FiltersProps = {
  options: FilterOption[]
  active: string
  onChange: (value: string) => void
  search?: {
    value: string
    onChange: (value: string) => void
    placeholder?: string
  }
  className?: string
}

export function Filters({ options, active, onChange, search, className }: FiltersProps) {
  return (
    <div className={cn("flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none", className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            active === opt.value
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={active === opt.value}
        >
          {opt.label}
        </button>
      ))}
      <div className="ml-auto flex items-center gap-2">
        {search && <Search {...search} />}
        <Button variant="secondary" size="icon-sm" aria-label="More filters">
          <SlidersHorizontal className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
