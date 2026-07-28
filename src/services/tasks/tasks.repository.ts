import { createClient } from "@/lib/supabase"
import { DatabaseError } from "@/lib/errors"
import type { Task } from "@/services/tasks/tasks.types"

export const TasksRepository = {
  async getAll(): Promise<Task[]> {
    const supabase = createClient()
    const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: false })
    if (error) throw new DatabaseError("Failed to fetch tasks", error)
    return data
  },

  async getById(id: string): Promise<Task | null> {
    const supabase = createClient()
    const { data, error } = await supabase.from("tasks").select("*").eq("id", id).single()
    if (error) throw new DatabaseError(`Failed to fetch task ${id}`, error)
    return data
  },

  async getByWorker(workerType: string): Promise<Task[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("worker_type", workerType)
      .order("created_at", { ascending: false })
    if (error) throw new DatabaseError(`Failed to fetch tasks for ${workerType}`, error)
    return data
  },

  async update(id: string, updates: Partial<Task>): Promise<Task> {
    const supabase = createClient()
    const { data, error } = await supabase.from("tasks").update(updates).eq("id", id).select().single()
    if (error) throw new DatabaseError(`Failed to update task ${id}`, error)
    return data
  },
}
