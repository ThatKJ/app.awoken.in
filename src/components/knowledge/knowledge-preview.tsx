"use client"

import { X, FileText, Calendar, Clock, HardDrive, Brain, Users, Tag, Link2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { KnowledgeService, type KnowledgeDocument } from "@/services/knowledge/knowledge.service"

type Props = {
  document: KnowledgeDocument | null
  open: boolean
  onClose: () => void
}

const statusConfig: Record<string, { label: string; color: string }> = {
  ready: { label: "Ready", color: "bg-success/10 text-success" },
  processing: { label: "Processing", color: "bg-warning/10 text-warning" },
  embedding: { label: "Embedding", color: "bg-info/10 text-info" },
  error: { label: "Error", color: "bg-destructive/10 text-destructive" },
}

export function KnowledgePreview({ document, open, onClose }: Props) {
  if (!document) return null

  const status = statusConfig[document.status]

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20 md:bg-transparent md:static" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 h-full w-[380px] border-l border-border bg-card shadow-premium overflow-y-auto md:static md:z-0 md:shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <FileText className="size-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{document.type}</span>
          </div>
          <button onClick={onClose} className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors md:hidden">
            <X className="size-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Title */}
          <div>
            <h2 className="text-base font-bold text-foreground leading-snug">{document.title}</h2>
            <p className="text-xs text-muted-foreground mt-1">{document.folder_name ?? "Uncategorized"}</p>
          </div>

          {/* Status badge */}
          <div className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium", status.color)}>
            <div className={cn("size-1.5 rounded-full", status.color.split(" ")[0].replace("text-", "bg-"))} />
            {status.label}
            {document.status === "embedding" && (
              <span className="ml-1 animate-pulse">Generating vectors…</span>
            )}
          </div>

          {/* Metadata */}
          <div className="space-y-2.5">
            <MetaRow icon={Calendar} label="Created" value={KnowledgeService.formatDate(document.created_at)} />
            <MetaRow icon={Clock} label="Updated" value={KnowledgeService.formatDate(document.updated_at)} />
            <MetaRow icon={HardDrive} label="Size" value={KnowledgeService.formatBytes(document.size)} />
            <MetaRow icon={FileText} label="Pages" value={document.pages > 0 ? String(document.pages) : "—"} />
            <MetaRow icon={Brain} label="Embedding" value={document.embedding_status === "complete" ? "Complete" : document.embedding_status === "pending" ? "Pending" : "Failed"} valueClass={document.embedding_status === "complete" ? "text-success" : document.embedding_status === "pending" ? "text-warning" : "text-destructive"} />
          </div>

          <div className="h-px bg-border/50" />

          {/* Workers */}
          <div>
            <SectionHeader icon={Users} label={`Workers Using This (${document.workers.length})`} />
            <div className="space-y-1.5 mt-2">
              {document.workers.length === 0 ? (
                <p className="text-xs text-muted-foreground/60">Not used by any worker yet</p>
              ) : (
                document.workers.map((w) => (
                  <div key={w.id} className="flex items-center gap-2.5 rounded-lg bg-muted/20 px-3 py-2">
                    <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-[8px] font-bold text-primary shrink-0">
                      {w.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{w.name}</p>
                      <p className="text-[10px] text-muted-foreground capitalize">{w.type.replace("_", " ")}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="h-px bg-border/50" />

          {/* Preview */}
          <div>
            <SectionHeader icon={FileText} label="Preview" />
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-6 bg-muted/20 rounded-xl p-3">{document.preview}</p>
          </div>

          {/* Tags */}
          <div>
            <SectionHeader icon={Tag} label={`Tags (${document.tags.length})`} />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {document.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                  {tag}
                </span>
              ))}
              {document.tags.length === 0 && (
                <p className="text-xs text-muted-foreground/60">No tags</p>
              )}
            </div>
          </div>

          <div className="h-px bg-border/50" />

          {/* Confidence score */}
          <div>
            <SectionHeader icon={Brain} label="Confidence Score" />
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">AI confidence</span>
                <span className={cn("font-semibold", document.confidence >= 90 ? "text-success" : document.confidence >= 75 ? "text-warning" : "text-destructive")}>
                  {document.confidence}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
                <div
                  className={cn("h-full rounded-full", document.confidence >= 90 ? "bg-success" : document.confidence >= 75 ? "bg-warning" : "bg-destructive")}
                  style={{ width: `${document.confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Usage */}
          <div>
            <SectionHeader icon={Users} label="Usage" />
            <p className="mt-1 text-xs text-muted-foreground">{document.usage_count.toLocaleString()} total queries from workers</p>
          </div>
        </div>
      </div>
    </>
  )
}

function MetaRow({ icon: Icon, label, value, valueClass }: { icon: typeof Calendar; label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3" />
        {label}
      </div>
      <span className={cn("font-medium text-foreground", valueClass)}>{value}</span>
    </div>
  )
}

function SectionHeader({ icon: Icon, label }: { icon: typeof FileText; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="size-3 text-muted-foreground" />
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  )
}
