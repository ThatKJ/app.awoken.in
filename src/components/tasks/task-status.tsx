"use client"

import { StatusBadge } from "@/components/shared/status-badge"

const taskStatusMap: Record<string, "active" | "idle" | "paused" | "off" | "healthy" | "attention" | "issue" | "completed" | "failed" | "pending" | "queued"> = {
  queued: "queued",
  in_progress: "active",
  awaiting_approval: "attention",
  completed: "completed",
  rejected: "failed",
  escalated: "issue",
  failed: "failed",
}

type TaskStatusProps = {
  status: string
}

export function TaskStatus({ status }: TaskStatusProps) {
  return <StatusBadge variant={taskStatusMap[status] ?? "idle"} label={status.replace(/_/g, " ")} />
}
