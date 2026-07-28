import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-app-bg p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-2xl font-bold text-on-surface">awoken</h1>
          <p className="mt-1 text-sm text-on-surface-variant">AI Workforce OS</p>
        </div>
        <div className="rounded-xl border border-outline bg-card-bg p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-on-surface">Welcome back</h2>
          <p className="mt-1 text-sm text-on-surface-variant">Sign in to your workspace</p>
          <LoginForm />
        </div>
        <p className="mt-4 text-center text-sm text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="font-medium text-primary hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  )
}
