import "server-only"
import { cache } from "react"
import { redirect } from "next/navigation"
import { createServerSupabase } from "./supabase-server"

export const verifySession = cache(async () => {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  }

  return {
    userId: data.user.id,
    email: data.user.email!,
  }
})

export const getCurrentUser = cache(async () => {
  const session = await verifySession()

  const supabase = await createServerSupabase()
  const { data: user } = await supabase
    .from("users")
    .select("id, name, email, organization_id")
    .eq("id", session.userId)
    .single()

  return user
})
