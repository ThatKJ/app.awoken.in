"use client"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/shared/avatar"
import { LeadStatus } from "@/components/leads/lead-status"

type LeadCardProps = {
  name: string
  status: string
  source?: string
  assignedTo?: string
  value?: string
  createdAt?: string
  onClick?: () => void
  className?: string
}

export function LeadCard({ name, status, source, assignedTo, value, createdAt, onClick, className }: LeadCardProps) {
  return (
    <Card
      className={cn("flex items-center gap-4 p-4 transition-colors hover:border-outline-hover", onClick && "cursor-pointer", className)}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter") onClick() } : undefined}
      role={onClick ? "button" : undefined}
    >
      <Avatar name={name} size="md" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground truncate">{name}</span>
          <LeadStatus status={status} />
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {source && <span>{source}</span>}
          {assignedTo && <span>Assigned to {assignedTo}</span>}
          {createdAt && <span>{createdAt}</span>}
        </div>
      </div>
      {value && <span className="text-sm font-semibold text-foreground shrink-0">{value}</span>}
    </Card>
  )
}
