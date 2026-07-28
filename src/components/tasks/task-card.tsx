"use client"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/shared/avatar"
import { TaskStatus } from "@/components/tasks/task-status"

type TaskCardProps = {
  title: string
  status: string
  leadName?: string
  workerType?: string
  assignedTo?: string
  priority?: string
  createdAt?: string
  onClick?: () => void
  className?: string
}

export function TaskCard({ title, status, leadName, workerType, assignedTo, priority, createdAt, onClick, className }: TaskCardProps) {
  return (
    <Card
      className={cn("flex items-center gap-4 p-4 transition-colors hover:border-outline-hover", onClick && "cursor-pointer", className)}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter") onClick() } : undefined}
      role={onClick ? "button" : undefined}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground truncate">{title}</span>
          <TaskStatus status={status} />
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {leadName && <span>{leadName}</span>}
          {workerType && <span className="capitalize">{workerType}</span>}
          {createdAt && <span>{createdAt}</span>}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {priority && <span className="text-xs font-medium uppercase text-muted-foreground">{priority}</span>}
        {assignedTo && <Avatar name={assignedTo} size="sm" />}
      </div>
    </Card>
  )
}
