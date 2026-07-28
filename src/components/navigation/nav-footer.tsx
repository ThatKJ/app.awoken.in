"use client"

import { useState } from "react"
import { ChevronUp, Building2, Check, LogOut, Settings, User } from "lucide-react"
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
  { id: "1", name: "Sunrise Estates", plan: "Enterprise" },
  { id: "2", name: "Prestige Homes", plan: "Pro" },
  { id: "3", name: "Demo Workspace", plan: "Free" },
]

export function NavFooter() {
  const [activeWorkspace] = useState(workspaces[0])

  return (
    <div className="flex flex-col gap-1.5">
      {/* Workspace */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              aria-label="Switch workspace"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-all duration-100 hover:bg-sidebar-accent/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar"
            />
          }
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-sidebar-accent/40 text-muted-foreground">
            <Building2 className="size-3.5" strokeWidth={2} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col text-left">
            <span className="truncate text-xs font-medium text-foreground/80">{activeWorkspace.name}</span>
            <span className="truncate text-[10px] text-muted-foreground">{activeWorkspace.plan}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="top" sideOffset={8} className="w-56">
          <DropdownMenuLabel className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Workspaces
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {workspaces.map((ws) => (
            <DropdownMenuItem key={ws.id} className="flex items-center gap-3 px-3 py-2 cursor-pointer">
              <div className="flex size-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <Building2 className="size-3.5" strokeWidth={2} />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium text-foreground">{ws.name}</span>
                <span className="text-[11px] text-muted-foreground">{ws.plan}</span>
              </div>
              {ws.id === activeWorkspace.id && <Check className="size-3.5 text-primary" strokeWidth={2} />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User profile */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              aria-label="User menu"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-all duration-100 hover:bg-sidebar-accent/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar"
            />
          }
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-sidebar-accent/40 text-[10px] font-semibold text-foreground/60">
            JD
          </div>
          <div className="flex min-w-0 flex-1 flex-col text-left">
            <span className="truncate text-xs font-medium text-foreground/80">John Doe</span>
            <span className="truncate text-[10px] text-muted-foreground">john@awoken.in</span>
          </div>
          <ChevronUp className="size-3.5 shrink-0 text-muted-foreground/40" strokeWidth={2} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="top" sideOffset={8} className="w-56">
          <DropdownMenuItem className="cursor-pointer">
            <User className="size-4" strokeWidth={2} />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="size-4" strokeWidth={2} />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="size-4" strokeWidth={2} />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
