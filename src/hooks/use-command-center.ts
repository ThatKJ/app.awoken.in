"use client"

import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { CommandCenterService } from "@/services/command-center/command-center.service"

export function useCommandCenterSummary() {
  return useQuery({
    queryKey: queryKeys.commandCenter.summary,
    queryFn: () => CommandCenterService.getSummary(),
  })
}

export function useActivityFeed() {
  return useQuery({
    queryKey: queryKeys.commandCenter.activity,
    queryFn: () => CommandCenterService.getActivityFeed(),
  })
}
