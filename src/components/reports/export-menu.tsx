"use client"

import { useState } from "react"
import { Download, FileSpreadsheet, FileText, Image, Check } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  onExport: (format: "csv" | "pdf" | "png") => void
  className?: string
}

export function ExportMenu({ onExport, className }: Props) {
  const [open, setOpen] = useState(false)

  const formats: { key: "csv" | "pdf" | "png"; label: string; icon: typeof FileSpreadsheet }[] = [
    { key: "csv", label: "Export CSV", icon: FileSpreadsheet },
    { key: "pdf", label: "Export PDF", icon: FileText },
    { key: "png", label: "Export PNG", icon: Image },
  ]

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground hover:border-primary/30 transition-colors"
      >
        <Download className="size-4 text-muted-foreground" />
        Export
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 w-44 rounded-xl border border-border bg-card shadow-premium p-1.5">
            {formats.map((f) => (
              <button
                key={f.key}
                onClick={() => { onExport(f.key); setOpen(false) }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              >
                <f.icon className="size-4" />
                {f.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
