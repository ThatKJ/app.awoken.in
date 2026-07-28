"use client"

import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { SectionHeader } from "@/components/shared/section-header"
import { KnowledgeSidebar } from "@/components/knowledge/knowledge-sidebar"
import { KnowledgeCard } from "@/components/knowledge/knowledge-card"
import { KnowledgePreview } from "@/components/knowledge/knowledge-preview"
import { KnowledgeSearch } from "@/components/knowledge/knowledge-search"
import { KnowledgeStatsGrid } from "@/components/knowledge/knowledge-stats"
import { KnowledgeUploader } from "@/components/knowledge/knowledge-uploader"
import { KnowledgeEmptyState } from "@/components/knowledge/knowledge-empty-state"
import { useFolders, useKnowledgeDocuments, useKnowledgeAnalytics, useKnowledgeSearch, useDeleteDocument, useUploadDocument } from "@/hooks/use-knowledge"
import { cn } from "@/lib/utils"
import { Plus, Upload, LayoutGrid, List } from "lucide-react"

const section: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.05 },
  }),
}

export default function KnowledgePage() {
  const [selectedFolderId, setSelectedFolderId] = useState<string>("f-all")
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showUploader, setShowUploader] = useState(false)

  const { data: folders } = useFolders()
  const { data: documents } = useKnowledgeDocuments(selectedFolderId)
  const { data: stats } = useKnowledgeAnalytics()
  const { data: searchResults } = useKnowledgeSearch(searchQuery)
  const deleteMutation = useDeleteDocument()
  const uploadMutation = useUploadDocument()

  const displayDocs = searchQuery
    ? (searchResults ?? []).map((r) => r.document)
    : (documents ?? [])

  const selectedDoc = previewId
    ? displayDocs.find((d) => d.id === previewId) ?? null
    : null

  function handleUpload(file: File) {
    uploadMutation.mutate({ file, folderId: selectedFolderId === "f-all" ? null : selectedFolderId })
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5 py-6 px-5">
      {/* Header */}
      <motion.div custom={0} variants={section} initial="hidden" animate="visible" className="flex items-start justify-between">
        <SectionHeader
          title="Knowledge"
          description="Everything your AI workforce knows."
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUploader(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Upload className="size-4" />
            Upload
          </button>
          <button
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary/30 transition-colors"
          >
            <Plus className="size-4" />
            New Folder
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      {stats && (
        <motion.div custom={1} variants={section} initial="hidden" animate="visible">
          <KnowledgeStatsGrid stats={stats} />
        </motion.div>
      )}

      {/* Search */}
      <motion.div custom={2} variants={section} initial="hidden" animate="visible" className="max-w-md">
        <KnowledgeSearch value={searchQuery} onChange={setSearchQuery} />
      </motion.div>

      {/* Three-panel layout */}
      <div className="flex gap-5">
        {/* Sidebar */}
        <motion.div custom={3} variants={section} initial="hidden" animate="visible" className="shrink-0">
          {folders && (
            <KnowledgeSidebar
              folders={folders}
              selectedFolderId={selectedFolderId}
              onSelectFolder={setSelectedFolderId}
            />
          )}
        </motion.div>

        {/* Document Grid */}
        <motion.div
          custom={4}
          variants={section}
          initial="hidden"
          animate="visible"
          className={cn("flex-1", selectedDoc && "hidden md:block")}
        >
          {displayDocs.length === 0 && !searchQuery && (
            <KnowledgeEmptyState onUpload={() => setShowUploader(true)} />
          )}
          {displayDocs.length === 0 && searchQuery && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-muted-foreground">No results for "{searchQuery}"</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Try a different search term</p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {displayDocs.map((doc) => (
              <KnowledgeCard
                key={doc.id}
                document={doc}
                onSelect={setPreviewId}
                onDelete={(id) => deleteMutation.mutate(id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Preview panel */}
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <KnowledgePreview
              document={selectedDoc}
              open={!!selectedDoc}
              onClose={() => setPreviewId(null)}
            />
          </motion.div>
        )}
      </div>

      {/* Upload dialog */}
      <KnowledgeUploader
        open={showUploader}
        onClose={() => setShowUploader(false)}
        onUpload={handleUpload}
      />
    </div>
  )
}
