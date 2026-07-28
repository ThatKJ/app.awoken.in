"use client"

import { FileText, Building2, DollarSign, Package, Shield, HelpCircle, MessageSquare, TrendingUp, Gavel, GraduationCap, Archive, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import type { KnowledgeFolder } from "@/services/knowledge/knowledge.service"

const iconMap: Record<string, typeof FileText> = {
  book: BookOpen,
  building: Building2,
  dollar: DollarSign,
  package: Package,
  shield: Shield,
  help: HelpCircle,
  message: MessageSquare,
  trending: TrendingUp,
  gavel: Gavel,
  graduation: GraduationCap,
  archive: Archive,
}

type Props = {
  folders: KnowledgeFolder[]
  selectedFolderId: string
  onSelectFolder: (id: string) => void
}

export function KnowledgeSidebar({ folders, selectedFolderId, onSelectFolder }: Props) {
  const mainFolders = folders.filter((f) => f.id !== "f-all")

  return (
    <div className="w-[250px] shrink-0 flex flex-col gap-1">
      {/* All Knowledge button */}
      <button
        onClick={() => onSelectFolder("f-all")}
        className={cn(
          "flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all",
          selectedFolderId === "f-all" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/30",
        )}
      >
        <BookOpen className="size-4" />
        All Knowledge
        <span className="ml-auto text-xs text-muted-foreground">{folders.reduce((s, f) => s + f.document_count, 0)}</span>
      </button>

      <div className="h-px bg-border/50 my-2" />

      {/* Folder list */}
      {mainFolders.map((folder) => {
        const Icon = iconMap[folder.icon] || FileText
        return (
          <button
            key={folder.id}
            onClick={() => onSelectFolder(folder.id)}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-sm transition-all",
              selectedFolderId === folder.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{folder.name}</span>
            <span className="ml-auto text-xs text-muted-foreground tabular-nums">{folder.document_count}</span>
          </button>
        )
      })}
    </div>
  )
}
