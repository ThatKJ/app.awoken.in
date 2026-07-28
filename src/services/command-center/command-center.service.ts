import { WorkersRepository } from "@/services/workers/workers.repository"
import { LeadsRepository } from "@/services/leads/leads.repository"
import { TasksRepository } from "@/services/tasks/tasks.repository"
import type { CommandCenterSummary, ActivityEvent } from "@/types"

export const CommandCenterService = {
  async getSummary(): Promise<CommandCenterSummary> {
    const [workers, leads, tasks] = await Promise.all([
      WorkersRepository.getAll(),
      LeadsRepository.getAll(),
      TasksRepository.getAll(),
    ])

    const activeWorkers = workers.filter((w) => w.is_active).length
    const needsAttention = tasks.filter((t) => t.state === "escalated" || t.state === "failed").length
    const completed = tasks.filter((t) => t.state === "completed").length
    const recovered = leads.filter((l) => l.status === "recoverable").length
    const qualified = leads.filter((l) => l.status === "qualified").length
    const appointments = leads.filter((l) => l.status === "booked" || l.status === "booking_in_progress").length

    return {
      pipelineValue: "₹0",
      tasksCompleted: completed,
      recoveredLeads: recovered,
      qualified,
      appointments,
      activeWorkers,
      needsAttention,
    }
  },

  async getActivityFeed(): Promise<ActivityEvent[]> {
    const tasks = await TasksRepository.getAll()
    const recent = tasks.slice(0, 10)

    return recent.map((t) => ({
      id: t.id,
      workerType: t.worker_type,
      title: t.title,
      description: t.description,
      timestamp: t.created_at,
    }))
  },
}
