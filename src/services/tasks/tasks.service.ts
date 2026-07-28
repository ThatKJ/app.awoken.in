import { TasksRepository } from "@/services/tasks/tasks.repository"
import { NotFoundError } from "@/lib/errors"
import { track } from "@/lib/analytics/track"
import { AnalyticsEvents } from "@/lib/analytics/events"
import { taskUpdateSchema, type TaskUpdateInput } from "@/services/tasks/tasks.schema"
import type { Task, TaskFilters } from "@/services/tasks/tasks.types"

export const TasksService = {
  async list(filters?: TaskFilters): Promise<Task[]> {
    const tasks = await TasksRepository.getAll()

    let filtered = tasks
    if (filters?.state) filtered = filtered.filter((t) => t.state === filters.state)
    if (filters?.workerType) filtered = filtered.filter((t) => t.worker_type === filters.workerType)
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      filtered = filtered.filter((t) => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q))
    }

    return filtered
  },

  async getById(id: string): Promise<Task> {
    const task = await TasksRepository.getById(id)
    if (!task) throw new NotFoundError("Task")
    return task
  },

  async update(id: string, input: TaskUpdateInput): Promise<Task> {
    const parsed = taskUpdateSchema.parse(input)
    const updated = await TasksRepository.update(id, parsed)
    if (parsed.state === "completed") track(AnalyticsEvents.TASK_COMPLETED, { taskId: id })
    return updated
  },

  async getPendingApprovals(): Promise<Task[]> {
    const tasks = await TasksRepository.getAll()
    return tasks.filter((t) => t.state === "awaiting_approval")
  },
}
