import { createClient } from "@/lib/supabase"
import { DatabaseError } from "@/lib/errors"
import type { Worker } from "@/services/workers/workers.types"

export const WorkersRepository = {
  async getAll(): Promise<Worker[]> {
    const supabase = createClient()
    const { data, error } = await supabase.from("workers").select("*")
    if (error) throw new DatabaseError("Failed to fetch workers", error)
    return data
  },

  async getById(id: string): Promise<Worker | null> {
    const supabase = createClient()
    const { data, error } = await supabase.from("workers").select("*").eq("id", id).single()
    if (error) throw new DatabaseError(`Failed to fetch worker ${id}`, error)
    return data
  },

  async update(id: string, updates: Partial<Worker>): Promise<Worker> {
    const supabase = createClient()
    const { data, error } = await supabase.from("workers").update(updates).eq("id", id).select().single()
    if (error) throw new DatabaseError(`Failed to update worker ${id}`, error)
    return data
  },
}
