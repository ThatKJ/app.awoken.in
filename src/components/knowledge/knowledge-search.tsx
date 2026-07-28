"use client"

import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  className?: string
}

export function KnowledgeSearch({ value, onChange, placeholder = "Search knowledge…", className }: Props) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-8 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
      />
      {value && (
        <button onClick={() => onChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
          <X className="size-3.5" />
        </button>
      )}
    </div>
  )
}
