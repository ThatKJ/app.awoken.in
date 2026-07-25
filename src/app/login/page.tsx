import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { AppLogo } from "@/components/layout/app-logo"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Awoken account.",
}

export default function LoginPage() {
  return (
    <Container as="section" className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <AppLogo />
          <h1 className="mt-6 text-xl font-semibold text-text-primary">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your Awoken account
          </p>
        </div>

        <form className="space-y-4" action="#">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="block w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              className="block w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200"
            />
          </div>

          <div className="flex items-center justify-end">
            <a
              href="#"
              className="text-sm font-medium text-accent hover:underline"
              tabIndex={-1}
            >
              Forgot password?
            </a>
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full">
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-medium text-accent hover:underline" tabIndex={-1}>
            Create one
          </a>
        </p>
      </div>
    </Container>
  )
}
