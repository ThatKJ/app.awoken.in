"use client"

import { ChevronDown, LogOut, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            aria-label="User menu"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 outline-none transition-all duration-100 hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring"
          />
        }
      >
        <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
          JD
        </div>
        <div className="hidden min-w-0 text-left sm:block">
          <p className="truncate text-xs font-medium text-foreground">John Doe</p>
        </div>
        <ChevronDown className="hidden size-3.5 shrink-0 text-muted-foreground/40 sm:block" strokeWidth={2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6} className="w-56">
        <DropdownMenuSeparator />
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
  )
}
