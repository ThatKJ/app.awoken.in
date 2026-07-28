import { createClient } from "@/lib/supabase"

export function createNotificationChannel(userId: string, onNotification: (payload: { title: string; body?: string }) => void) {
  const supabase = createClient()
  const channel = supabase
    .channel(`notifications:${userId}`)
    .on(
      "broadcast",
      { event: "notification" },
      (payload) => onNotification(payload.payload as { title: string; body?: string }),
    )
    .subscribe()

  return () => supabase.removeChannel(channel)
}
