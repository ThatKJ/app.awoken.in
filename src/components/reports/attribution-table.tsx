"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { ReportsService, type AttributionRow } from "@/services/reports/reports.service"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

type Props = {
  data: AttributionRow[]
  className?: string
}

type SortKey = "revenue" | "leads" | "appointments" | "conversion" | "roi"
type SortDir = "asc" | "desc"

export function AttributionTable({ data, className }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("revenue")
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]
      return sortDir === "desc" ? (valB as number) - (valA as number) : (valA as number) - (valB as number)
    })
  }, [data, sortKey, sortDir])

  const toggle = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "desc" ? "asc" : "desc"))
    else { setSortKey(key); setSortDir("desc") }
  }

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="size-3" />
    return sortDir === "desc" ? <ArrowDown className="size-3" /> : <ArrowUp className="size-3" />
  }

  const headers: { key: SortKey; label: string }[] = [
    { key: "revenue", label: "Revenue" },
    { key: "leads", label: "Leads" },
    { key: "appointments", label: "Appts" },
    { key: "conversion", label: "Conv" },
    { key: "roi", label: "ROI" },
  ]

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sticky left-0 bg-card z-10">
              Worker
            </th>
            {headers.map((h) => (
              <th
                key={h.key}
                onClick={() => toggle(h.key)}
                className="text-right py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                <div className="inline-flex items-center gap-1">
                  {h.label}
                  <SortIcon col={h.key} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={row.id}
              className={cn(
                "border-b border-border/20 transition-colors hover:bg-muted/15",
                i === sorted.length - 1 && "border-b-0",
              )}
            >
              <td className="sticky left-0 bg-card py-2.5 px-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-[9px] font-semibold text-primary shrink-0">
                    {row.worker.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{row.worker}</p>
                    <p className="text-[11px] text-muted-foreground capitalize">{row.workerType.replace("_", " ")}</p>
                  </div>
                </div>
              </td>
              <td className="text-right py-2.5 px-3 text-sm font-semibold text-foreground tabular-nums whitespace-nowrap">
                {ReportsService.formatCurrency(row.revenue)}
              </td>
              <td className="text-right py-2.5 px-3 text-sm text-foreground tabular-nums">{row.leads}</td>
              <td className="text-right py-2.5 px-3 text-sm text-foreground tabular-nums">{row.appointments}</td>
              <td className="text-right py-2.5 px-3 text-sm tabular-nums">
                <span className={cn("font-medium", row.conversion >= 70 ? "text-success" : row.conversion >= 50 ? "text-warning" : "text-destructive")}>
                  {row.conversion}%
                </span>
              </td>
              <td className="text-right py-2.5 px-3 text-sm tabular-nums">
                <span className={cn("font-semibold", row.roi >= 700 ? "text-success" : row.roi >= 400 ? "text-warning" : "text-destructive")}>
                  {row.roi}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
