import type { Task, TaskState } from "@/types"

export type { Task, TaskState }

export type TaskFilters = {
  state?: TaskState
  workerType?: string
  search?: string
}

export type TaskUpdate = {
  state?: TaskState
  assigned_to?: string | null
  description?: string | null
}
