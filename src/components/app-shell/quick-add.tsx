"use client"

import { Plus, Target, Bot, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const actions = [
  { icon: Target, label: "Lead", shortcut: "L" },
  { icon: Bot, label: "Worker", shortcut: "W" },
  { icon: CheckSquare, label: "Task", shortcut: "T" },
]

export function QuickAdd() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="primary" size="icon" aria-label="Quick add" className="size-8 rounded-lg" />}
      >
        <Plus className="size-4" strokeWidth={2.5} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-40">
        {actions.map((action, i) => (
          <div key={action.label}>
            {i > 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2 cursor-pointer">
              <div className="flex size-6 items-center justify-center rounded-md bg-muted">
                <action.icon className="size-3.5 text-muted-foreground" strokeWidth={2} />
              </div>
              <span className="text-sm font-medium text-foreground">{action.label}</span>
              {action.shortcut && (
                <kbd className="ml-auto rounded border border-border/40 bg-background px-1 font-mono text-[10px] text-muted-foreground">
                  {action.shortcut}
                </kbd>
              )}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
