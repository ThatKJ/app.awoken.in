"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createServerSupabase } from "@/lib/supabase-server"

type AuthState = { error: string } | undefined

export async function signup(prevState: AuthState, formData: FormData) {
  const supabase = await createServerSupabase()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const organizationName = formData.get("organization_name") as string

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { error: authError.message }
  }

  if (!authData.user) {
    return { error: "Failed to create user" }
  }

  const { error: orgError } = await supabase.rpc("create_organization_with_user", {
    user_id: authData.user.id,
    user_name: name,
    user_email: email,
    org_name: organizationName,
  })

  if (orgError) {
    return { error: orgError.message }
  }

  revalidatePath("/command-center")
  redirect("/command-center")
}

export async function login(prevState: AuthState, formData: FormData) {
  const supabase = await createServerSupabase()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/command-center")
  redirect("/command-center")
}

export async function logout() {
  const supabase = await createServerSupabase()
  await supabase.auth.signOut()
  redirect("/login")
}
