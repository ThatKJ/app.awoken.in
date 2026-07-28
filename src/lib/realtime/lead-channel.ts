import { createClient } from "@/lib/supabase"
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js"

type Callback = (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void

export function createLeadChannel(orgId: string, onUpdate: Callback) {
  const supabase = createClient()
  const channel = supabase
    .channel(`leads:${orgId}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, onUpdate)
    .subscribe()

  return () => supabase.removeChannel(channel)
}

export function createLeadStatusChannel(orgId: string, onStatusChange: Callback) {
  const supabase = createClient()
  const channel = supabase
    .channel(`leads:status:${orgId}`)
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "leads", filter: "status=neq.ignored" }, onStatusChange)
    .subscribe()

  return () => supabase.removeChannel(channel)
}
