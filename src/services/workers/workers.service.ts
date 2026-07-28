import { WorkersRepository } from "@/services/workers/workers.repository"
import { NotFoundError } from "@/lib/errors"
import { track } from "@/lib/analytics/track"
import { AnalyticsEvents } from "@/lib/analytics/events"
import { workerUpdateSchema, type WorkerUpdateInput } from "@/services/workers/workers.schema"
import type { Worker, WorkerWithStats, WorkerFilters } from "@/services/workers/workers.types"

export const WorkersService = {
  async list(filters?: WorkerFilters): Promise<WorkerWithStats[]> {
    const workers = await WorkersRepository.getAll()

    let filtered = workers
    if (filters?.type) filtered = filtered.filter((w) => w.worker_type === filters.type)
    if (filters?.mode) filtered = filtered.filter((w) => w.mode === filters.mode)
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      filtered = filtered.filter((w) => w.name.toLowerCase().includes(q) || w.description?.toLowerCase().includes(q))
    }

    return filtered.map((w) => ({
      ...w,
      health: ("healthy" as const),
      queueCount: 0,
      stats: { completed: 0, failed: 0, escalated: 0, avgResponse: "0s" },
    }))
  },

  async getById(id: string): Promise<WorkerWithStats> {
    const worker = await WorkersRepository.getById(id)
    if (!worker) throw new NotFoundError("Worker")
    return {
      ...worker,
      health: ("healthy" as const),
      queueCount: 0,
      stats: { completed: 0, failed: 0, escalated: 0, avgResponse: "0s" },
    }
  },

  async update(id: string, input: WorkerUpdateInput): Promise<Worker> {
    const parsed = workerUpdateSchema.parse(input)
    const updated = await WorkersRepository.update(id, parsed)
    track(AnalyticsEvents.WORKER_MODE_CHANGED, { workerId: id, mode: parsed.mode })
    return updated
  },
}
