"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const workspaces = [
  { id: "1", name: "Sunrise Estates", plan: "Enterprise", users: 12 },
  { id: "2", name: "Prestige Homes", plan: "Pro", users: 5 },
  { id: "3", name: "Demo Workspace", plan: "Free", users: 1 },
]

export function WorkspaceSwitcher({ collapsed }: { collapsed?: boolean }) {
  const [active, setActive] = useState(workspaces[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            aria-label="Switch workspace"
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 outline-none",
              "hover:bg-sidebar-accent/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
              collapsed && "justify-center px-2"
            )}
          />
        }
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary/10 text-sidebar-primary shadow-soft">
          <Building2 className="size-4" strokeWidth={2.2} />
        </div>
        {!collapsed && (
          <>
            <div className="flex min-w-0 flex-1 flex-col text-left">
              <span className="truncate text-sm font-semibold text-sidebar-foreground">
                {active.name}
              </span>
              <span className="truncate text-[11px] text-sidebar-foreground/50">
                {active.plan} · {active.users} users
              </span>
            </div>
            <ChevronsUpDown className="size-4 shrink-0 text-sidebar-foreground/40" strokeWidth={2.2} />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right" sideOffset={8} className="w-64">
        <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Workspaces
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map((ws) => (
          <DropdownMenuItem
            key={ws.id}
            onSelect={() => setActive(ws)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 cursor-pointer",
              ws.id === active.id && "bg-accent/50"
            )}
          >
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="size-3.5" strokeWidth={2.2} />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-medium text-foreground">{ws.name}</span>
              <span className="text-[11px] text-muted-foreground">{ws.plan}</span>
            </div>
            {ws.id === active.id && <Check className="size-4 text-primary" strokeWidth={2.2} />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer">
          <Building2 className="size-4" strokeWidth={2.2} />
          <span className="text-sm">Create Workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
