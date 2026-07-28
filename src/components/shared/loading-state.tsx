"use client"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

type LoadingStateProps = {
  variant?: "card" | "list" | "table" | "page"
  count?: number
  className?: string
}

const variants = {
  card: ({ i }: { i: number }) => (
    <div key={i} className="flex flex-col gap-3 rounded-xl border border-outline p-5">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  ),
  list: ({ i }: { i: number }) => (
    <div key={i} className="flex items-center gap-3 py-3">
      <Skeleton className="size-8 shrink-0 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ),
  table: ({ i }: { i: number }) => (
    <div key={i} className="flex gap-4 border-b border-outline py-3">
      {[1, 2, 3, 4].map((c) => (
        <Skeleton key={c} className="h-4 flex-1" />
      ))}
    </div>
  ),
  page: ({ i }: { i: number }) => (
    <div key={i} className="space-y-4">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-72" />
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[1, 2, 3].map((c) => (
          <Skeleton key={c} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  ),
}

export function LoadingState({ variant = "card", count = 3, className }: LoadingStateProps) {
  const VariantComponent = variants[variant]
  return (
    <div className={cn("flex flex-col gap-3", className)} role="status" aria-label="Loading">
      {Array.from({ length: count }, (_, i) => (
        <VariantComponent key={i} i={i} />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  )
}
