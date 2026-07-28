"use client"

import { cn } from "@/lib/utils"
import { WorkerCard } from "@/components/workers/worker-card"
import { LoadingState } from "@/components/shared/loading-state"
import { EmptyState } from "@/components/shared/empty-state"
import { Users, type LucideIcon } from "lucide-react"

type WorkerItem = {
  id: string
  name: string
  type: string
  icon: LucideIcon
  color: string
  activity: string
  health: "healthy" | "attention" | "issue"
  progress?: { value: number; label: string }
  kpis: { label: string; value: string }[]
}

type WorkerGridProps = {
  workers: WorkerItem[]
  loading?: boolean
  columns?: 1 | 2 | 3 | 4 | 5
  onWorkerClick?: (id: string) => void
  className?: string
}

const colMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
}

export function WorkerGrid({ workers, loading, columns = 4, onWorkerClick, className }: WorkerGridProps) {
  if (loading) return <LoadingState variant="card" count={columns} className={className} />
  if (!workers.length) return <EmptyState icon={Users} title="No workers configured" description="Add your first worker to start automating." />

  return (
    <div className={cn("grid gap-4", colMap[columns], className)}>
      {workers.map((w) => (
        <WorkerCard
          key={w.id}
          name={w.name}
          type={w.type}
          icon={w.icon}
          color={w.color}
          activity={w.activity}
          health={w.health}
          progress={w.progress}
          kpis={w.kpis}
          onClick={onWorkerClick ? () => onWorkerClick(w.id) : undefined}
        />
      ))}
    </div>
  )
}
