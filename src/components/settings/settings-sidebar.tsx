"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Building2, Palette, Bot, Zap, Bell, Shield, Users, Key, CreditCard, Code2, AlertTriangle,
} from "lucide-react"

const sections = [
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "workforce", label: "Workforce", icon: Bot },
  { id: "automation", label: "Automation", icon: Zap },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "members", label: "Members", icon: Users },
  { id: "permissions", label: "Permissions", icon: Key },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "api", label: "API", icon: Code2 },
  { id: "danger-zone", label: "Danger Zone", icon: AlertTriangle },
]

export function SettingsSidebar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const active = searchParams.get("section") ?? "organization"

  function navigate(section: string) {
    router.push(`${pathname}?section=${section}`)
  }

  return (
    <nav className="w-[220px] shrink-0 flex flex-col gap-0.5">
      {sections.map((s) => {
        const isActive = active === s.id
        const isDanger = s.id === "danger-zone"
        return (
          <button
            key={s.id}
            onClick={() => navigate(s.id)}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all",
              isActive && !isDanger && "bg-primary/10 text-primary",
              isDanger && isActive && "bg-destructive/10 text-destructive",
              !isActive && "text-muted-foreground hover:text-foreground hover:bg-muted/30",
              isDanger && !isActive && "text-muted-foreground hover:text-destructive hover:bg-destructive/5",
            )}
          >
            <s.icon className="size-4" />
            {s.label}
          </button>
        )
      })}
    </nav>
  )
}
