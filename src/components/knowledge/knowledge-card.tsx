"use client"

import { useState } from "react"
import { FileText, FileSpreadsheet, FileCode, File, MoreHorizontal, Trash2, Download, Eye, Archive, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import type { KnowledgeDocument } from "@/services/knowledge/knowledge.service"

const typeIcons: Record<string, typeof FileText> = {
  pdf: FileText,
  docx: FileText,
  txt: FileCode,
  md: FileCode,
  csv: FileSpreadsheet,
}

const typeColors: Record<string, string> = {
  pdf: "text-destructive",
  docx: "text-primary",
  txt: "text-muted-foreground",
  md: "text-info",
  csv: "text-success",
}

const statusColors: Record<string, string> = {
  ready: "bg-success",
  processing: "bg-warning",
  embedding: "bg-info",
  error: "bg-destructive",
}

type Props = {
  document: KnowledgeDocument
  onSelect: (id: string) => void
  onDelete?: (id: string) => void
}

export function KnowledgeCard({ document, onSelect, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const Icon = typeIcons[document.type] || File

  return (
    <div
      onClick={() => onSelect(document.id)}
      className="group relative rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-soft cursor-pointer"
      tabIndex={0}
      role="button"
      aria-label={document.title}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(document.id) } }}
    >
      {/* Status dot */}
      <div className={cn("absolute top-3 right-3 size-2 rounded-full", statusColors[document.status])} />

      {/* Icon + Title */}
      <div className="flex items-start gap-3 mb-3">
        <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted/50", typeColors[document.type])}>
          <Icon className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{document.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {document.folder_name ?? "Uncategorized"}
            {" · "}
            {document.type.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
        <span>{document.pages > 0 ? `${document.pages} pages` : `—`}</span>
        <span>{document.updated_at}</span>
        <span className="ml-auto">{document.usage_count.toLocaleString()} uses</span>
      </div>

      {/* Confidence */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full bg-muted/50 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              document.confidence >= 90 ? "bg-success" : document.confidence >= 75 ? "bg-warning" : "bg-destructive",
            )}
            style={{ width: `${document.confidence}%` }}
          />
        </div>
        <span className={cn(
          "text-[11px] font-semibold tabular-nums",
          document.confidence >= 90 ? "text-success" : document.confidence >= 75 ? "text-warning" : "text-destructive",
        )}>
          {document.confidence}%
        </span>
      </div>

      {/* Workers */}
      {document.workers.length > 0 && (
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/40">
          <span className="text-[10px] text-muted-foreground">Used by</span>
          <div className="flex -space-x-1.5">
            {document.workers.slice(0, 3).map((w) => (
              <div
                key={w.id}
                className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-[7px] font-bold text-primary border border-background"
                title={w.name}
              >
                {w.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
            ))}
            {document.workers.length > 3 && (
              <span className="text-[9px] text-muted-foreground self-center ml-1">+{document.workers.length - 3}</span>
            )}
          </div>
        </div>
      )}

      {/* Context menu */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
          className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <MoreHorizontal className="size-3.5" />
        </button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setMenuOpen(false) }} />
            <div className="absolute bottom-full right-0 mb-1 z-20 w-36 rounded-xl border border-border bg-card shadow-premium p-1">
              {[

                { label: "Preview", icon: Eye, onClick: () => onSelect(document.id) },
                { label: "Download", icon: Download, onClick: () => {} },
                { label: "Duplicate", icon: Copy, onClick: () => {} },
                { label: "Archive", icon: Archive, onClick: () => {} },
                ...(onDelete
                  ? [{ label: "Delete", icon: Trash2, onClick: () => { onDelete(document.id); setMenuOpen(false) }, danger: true as const }]
                  : []),
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={(e) => { e.stopPropagation(); item.onClick(); setMenuOpen(false) }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors",
                    "danger" in item ? "text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                  )}
                >
                  <item.icon className="size-3.5" />
                  {item.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
