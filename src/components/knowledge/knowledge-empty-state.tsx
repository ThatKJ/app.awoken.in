"use client"

import { BookOpen, Upload } from "lucide-react"

type Props = {
  onUpload: () => void
}

export function KnowledgeEmptyState({ onUpload }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/30 mb-4">
        <BookOpen className="size-7 text-muted-foreground/40" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">No documents yet</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">
        Upload your first document to start building your AI knowledge base. Workers will use this to generate responses.
      </p>
      <button
        onClick={onUpload}
        className="mt-4 flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <Upload className="size-4" />
        Upload Document
      </button>
    </div>
  )
}
