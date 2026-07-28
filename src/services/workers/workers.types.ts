import type { Worker, WorkerMode, WorkerHealth, WorkerType, WorkerWithStats } from "@/types"

export type { Worker, WorkerMode, WorkerHealth, WorkerType, WorkerWithStats }

export type WorkerFilters = {
  type?: WorkerType
  mode?: WorkerMode
  health?: WorkerHealth
  status?: "active" | "idle"
  search?: string
}

export type WorkerStats = {
  completed: number
  failed: number
  escalated: number
  avgResponse: string
}

export type WorkerUpdate = {
  mode?: WorkerMode
  is_active?: boolean
  name?: string
  description?: string
}
