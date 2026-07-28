import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

const protectedRoutes = [
  "/workers",
  "/leads",
  "/conversations",
  "/opportunities",
  "/knowledge",
  "/reports",
  "/settings",
]

const publicRoutes = ["/login", "/signup"]

export default async function proxy(req: NextRequest) {
  let supabaseResponse = NextResponse.next({ request: req })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            req.cookies.set(name, value)
          }
          supabaseResponse = NextResponse.next({ request: req })
          for (const { name, value, options } of cookiesToSet) {
            supabaseResponse.cookies.set(name, value, options)
          }
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)

  if (path === "/" && !user) {
    return supabaseResponse
  }

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  if (isPublicRoute && user) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
