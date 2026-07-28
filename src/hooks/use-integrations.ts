"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { IntegrationService } from "@/services/integrations/integrations.service"

const keys = {
  all: ["integrations"] as const,
  detail: (id: string) => ["integrations", id] as const,
  summary: ["integrations", "summary"] as const,
  logs: (id: string) => ["integrations", "logs", id] as const,
}

export function useIntegrations() {
  return useQuery({ queryKey: keys.all, queryFn: () => IntegrationService.list() })
}

export function useIntegration(id: string | null) {
  return useQuery({ queryKey: keys.detail(id ?? ""), queryFn: () => IntegrationService.getById(id!), enabled: !!id })
}

export function useIntegrationSummary() {
  return useQuery({ queryKey: keys.summary, queryFn: () => IntegrationService.getSummary() })
}

export function useIntegrationLogs(integrationId: string) {
  return useQuery({ queryKey: keys.logs(integrationId), queryFn: () => IntegrationService.getLogs(integrationId), enabled: !!integrationId })
}

export function useConnectIntegration() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => IntegrationService.connect(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["integrations"] }),
  })
}

export function useDisconnectIntegration() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => IntegrationService.disconnect(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["integrations"] }),
  })
}

export function useReconnectIntegration() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => IntegrationService.reconnect(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["integrations"] }),
  })
}

export function useRefreshIntegrations() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => IntegrationService.refresh(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["integrations"] }),
  })
}
