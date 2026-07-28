"use client"

import { useActionState } from "react"
import { signup } from "@/lib/actions/auth"

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action} className="mt-6 space-y-4">
      {state?.error && (
        <div className="rounded-lg border border-danger/20 bg-danger-light px-4 py-3 text-sm text-danger">
          {state.error}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-on-surface">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full rounded-lg border border-outline bg-sidebar-bg px-3.5 py-2.5 text-sm text-on-surface placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Alex Sterling"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-on-surface">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-lg border border-outline bg-sidebar-bg px-3.5 py-2.5 text-sm text-on-surface placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="organization_name" className="block text-sm font-medium text-on-surface">
          Organization name
        </label>
        <input
          id="organization_name"
          name="organization_name"
          type="text"
          required
          className="mt-1 block w-full rounded-lg border border-outline bg-sidebar-bg px-3.5 py-2.5 text-sm text-on-surface placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="My Real Estate Co."
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-on-surface">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="mt-1 block w-full rounded-lg border border-outline bg-sidebar-bg px-3.5 py-2.5 text-sm text-on-surface placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-hover disabled:opacity-50"
      >
        {pending ? "Creating workspace..." : "Create workspace"}
      </button>
    </form>
  )
}
