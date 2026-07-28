"use client"

import { useState, useCallback, useRef } from "react"
import { Upload, FileText, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const MAX_SIZE = 20 * 1024 * 1024
const ACCEPTED = [".pdf", ".docx", ".txt", ".md", ".csv"]

type UploadItem = {
  filename: string
  progress: number
  status: "uploading" | "processing" | "complete" | "error"
  error?: string
}

type Props = {
  open: boolean
  onClose: () => void
  onUpload: (file: File) => void
}

export function KnowledgeUploader({ open, onClose, onUpload }: Props) {
  const [dragOver, setDragOver] = useState(false)
  const [uploads, setUploads] = useState<UploadItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback((files: FileList | File[]) => {
    const items: UploadItem[] = []
    for (const file of Array.from(files)) {
      const ext = "." + file.name.split(".").pop()?.toLowerCase()
      if (!ACCEPTED.includes(ext)) {
        items.push({ filename: file.name, progress: 0, status: "error", error: "Unsupported format" })
        continue
      }
      if (file.size > MAX_SIZE) {
        items.push({ filename: file.name, progress: 0, status: "error", error: "Exceeds 20MB limit" })
        continue
      }
      items.push({ filename: file.name, progress: 0, status: "uploading" })
      onUpload(file)
    }
    setUploads((prev) => [...prev, ...items])

    // Simulate progress
    items.forEach((item, i) => {
      if (item.status !== "error") {
        setTimeout(() => {
          setUploads((prev) => prev.map((u) => u.filename === item.filename ? { ...u, progress: 50, status: "processing" as const } : u))
        }, 500 + i * 200)
        setTimeout(() => {
          setUploads((prev) => prev.map((u) => u.filename === item.filename ? { ...u, progress: 100, status: "complete" as const } : u))
        }, 2000 + i * 300)
      }
    })
  }, [onUpload])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files)
  }, [addFiles])

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true) }
  const handleDragLeave = () => setDragOver(false)

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-premium p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Upload Documents</h2>
            <button onClick={onClose} className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <X className="size-4" />
            </button>
          </div>

          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 transition-colors",
              dragOver ? "border-primary bg-primary/[0.03]" : "border-border hover:border-muted-foreground/30",
            )}
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <Upload className="size-5 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Drag and drop files here</p>
              <p className="text-xs text-muted-foreground mt-1">or</p>
            </div>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={ACCEPTED.join(",")}
              className="hidden"
              onChange={(e) => { if (e.target.files) addFiles(e.target.files) }}
            />
            <button
              onClick={() => inputRef.current?.click()}
              className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Browse Files
            </button>
            <p className="text-[10px] text-muted-foreground/50 text-center">
              PDF, DOCX, TXT, MD, CSV · Max 20MB per file
            </p>
          </div>

          {/* Upload queue */}
          {uploads.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {uploads.map((item) => (
                <div key={item.filename} className="flex items-center gap-3 rounded-xl bg-muted/20 p-3">
                  <div className={cn(
                    "flex size-8 items-center justify-center rounded-lg",
                    item.status === "complete" ? "bg-success/10" : item.status === "error" ? "bg-destructive/10" : "bg-muted/50",
                  )}>
                    {item.status === "complete" ? <CheckCircle2 className="size-4 text-success" /> :
                     item.status === "error" ? <AlertCircle className="size-4 text-destructive" /> :
                     <Loader2 className="size-4 text-muted-foreground animate-spin" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{item.filename}</p>
                    {item.error ? (
                      <p className="text-[10px] text-destructive">{item.error}</p>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1 rounded-full bg-muted/50 overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              item.status === "complete" ? "bg-success" : "bg-primary",
                            )}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground tabular-nums">{item.progress}%</span>
                      </div>
                    )}
                  </div>
                  {item.status === "complete" && <CheckCircle2 className="size-3.5 text-success shrink-0" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
