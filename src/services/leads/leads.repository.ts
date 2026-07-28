import { createClient } from "@/lib/supabase"
import { DatabaseError } from "@/lib/errors"
import type { Lead } from "@/services/leads/leads.types"

export const LeadsRepository = {
  async getAll(): Promise<Lead[]> {
    const supabase = createClient()
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false })
    if (error) throw new DatabaseError("Failed to fetch leads", error)
    return data
  },

  async getById(id: string): Promise<Lead | null> {
    const supabase = createClient()
    const { data, error } = await supabase.from("leads").select("*").eq("id", id).single()
    if (error) throw new DatabaseError(`Failed to fetch lead ${id}`, error)
    return data
  },

  async update(id: string, updates: Partial<Lead>): Promise<Lead> {
    const supabase = createClient()
    const { data, error } = await supabase.from("leads").update(updates).eq("id", id).select().single()
    if (error) throw new DatabaseError(`Failed to update lead ${id}`, error)
    return data
  },
}
