import { createClient } from "@/lib/supabase"
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js"

type Callback = (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void

export function createWorkerChannel(orgId: string, onUpdate: Callback) {
  const supabase = createClient()
  const channel = supabase
    .channel(`workers:${orgId}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "workers" }, onUpdate)
    .subscribe()

  return () => supabase.removeChannel(channel)
}

export function createWorkerModeChannel(orgId: string, onModeChange: Callback) {
  const supabase = createClient()
  const channel = supabase
    .channel(`workers:mode:${orgId}`)
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "workers", filter: "mode=neq.ignored" }, onModeChange)
    .subscribe()

  return () => supabase.removeChannel(channel)
}
