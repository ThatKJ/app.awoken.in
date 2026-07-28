"use client"

import { StatusBadge } from "@/components/shared/status-badge"

const leadStatusMap: Record<string, "active" | "idle" | "paused" | "off" | "healthy" | "attention" | "issue" | "completed" | "failed" | "pending" | "queued"> = {
  new: "pending",
  contacted: "active",
  in_conversation: "active",
  qualified: "completed",
  disqualified: "failed",
  nurturing: "paused",
  booked: "completed",
  lost: "failed",
}

type LeadStatusProps = {
  status: string
}

export function LeadStatus({ status }: LeadStatusProps) {
  return <StatusBadge variant={leadStatusMap[status] ?? "idle"} label={status.replace(/_/g, " ")} />
}
