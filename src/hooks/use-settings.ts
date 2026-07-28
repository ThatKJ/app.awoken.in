"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { SettingsService, type SettingsData } from "@/services/settings/settings.service"

const keys = {
  all: ["settings"] as const,
}

export function useSettings() {
  return useQuery({ queryKey: keys.all, queryFn: () => SettingsService.get() })
}

export function useUpdateSettings() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (partial: Partial<SettingsData>) => SettingsService.update(partial),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  })
}

export function useSaveSettings() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => SettingsService.save(),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  })
}

export function useResetSettings() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => SettingsService.reset(),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  })
}
