import { createClient } from "@/lib/supabase"
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js"

type Callback = (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void

export function createTaskChannel(orgId: string, onUpdate: Callback) {
  const supabase = createClient()
  const channel = supabase
    .channel(`tasks:${orgId}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, onUpdate)
    .subscribe()

  return () => supabase.removeChannel(channel)
}

export function createTaskStateChannel(orgId: string, onStateChange: Callback) {
  const supabase = createClient()
  const channel = supabase
    .channel(`tasks:state:${orgId}`)
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "tasks", filter: "state=neq.ignored" }, onStateChange)
    .subscribe()

  return () => supabase.removeChannel(channel)
}
