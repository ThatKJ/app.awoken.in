"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, LayoutDashboard, Users, Target, MessageSquare, DollarSign, BarChart3, BookOpen, Puzzle, Settings, Bot, Plus, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { eventBus, Events } from "@/lib/event-bus"

const pages = [
  { icon: LayoutDashboard, label: "Command Center", href: "/" },
  { icon: Users, label: "Workers", href: "/workers" },
  { icon: Target, label: "Leads", href: "/leads" },
  { icon: MessageSquare, label: "Conversations", href: "/conversations" },
  { icon: DollarSign, label: "Opportunities", href: "/opportunities" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: BookOpen, label: "Knowledge", href: "/knowledge" },
  { icon: Puzzle, label: "Integrations", href: "/integrations" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

const actions = [
  { icon: Plus, label: "Create Lead", shortcut: "L" },
  { icon: Bot, label: "Add Worker", shortcut: "W" },
  { icon: Plus, label: "Create Task", shortcut: "T" },
  { icon: Link2, label: "Connect Integration" },
]

export function CommandSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const navigate = useCallback((href: string) => {
    setOpen(false)
    router.push(href)
  }, [router])

  const runAction = useCallback((label: string) => {
    setOpen(false)
    eventBus.emit(Events.ACTIVITY_NEW, {
      id: `action-${Date.now()}`,
      icon: "system",
      text: `Action triggered: ${label}`,
      detail: "This action will be wired to the backend soon",
      timestamp: new Date(),
      type: "system",
    })
  }, [])

  return (
    <>
      <Button
        variant="secondary"
        className="relative h-9 w-full justify-start gap-2 rounded-lg border-border/40 bg-muted/30 text-sm font-normal text-muted-foreground/60 sm:w-48 lg:w-56 hover:border-border/60 hover:bg-muted/50 transition-all duration-100"
        onClick={() => setOpen(true)}
        aria-label="Search commands"
      >
        <Search className="size-3.5 shrink-0" strokeWidth={2} />
        <span className="hidden sm:inline">Ask your workforce&hellip;</span>
        <kbd className="pointer-events-none ml-auto hidden select-none items-center gap-0.5 rounded-md border border-border/40 bg-background/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground/40 sm:inline-flex">
          ⌘K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} title="Command Palette">
        <CommandInput placeholder="Ask your workforce..." />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-8">
              <p className="text-sm text-muted-foreground">No results found</p>
            </div>
          </CommandEmpty>

          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem key={page.href} onSelect={() => navigate(page.href)}>
                <page.icon className="size-4" />
                <span>{page.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Actions">
            {actions.map((action) => (
              <CommandItem key={action.label} onSelect={() => runAction(action.label)}>
                <action.icon className="size-4" />
                <span>{action.label}</span>
                {action.shortcut && (
                  <kbd className="ml-auto rounded border border-border/40 bg-background px-1 font-mono text-[10px] text-muted-foreground">
                    {action.shortcut}
                  </kbd>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
