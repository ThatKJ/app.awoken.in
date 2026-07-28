"use client"

import { Bell, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const unreadCount = 3

export function Notifications() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon" aria-label={`Notifications (${unreadCount} unread)`} className="relative" />
        }
      >
        <Bell className="size-4" strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground tabular-nums">
            {unreadCount}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-72 p-0">
        <div className="flex flex-col items-center gap-3 py-10 px-4 text-center">
          <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
            <Inbox className="size-5 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Notifications</p>
            <p className="text-xs text-muted-foreground mt-1">Coming soon — real-time alerts and updates will appear here.</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
