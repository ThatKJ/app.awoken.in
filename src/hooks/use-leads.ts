"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { LeadsService } from "@/services/leads/leads.service"
import type { LeadFilters } from "@/services/leads/leads.types"
import type { LeadUpdateInput } from "@/services/leads/leads.schema"

export function useLeads(filters?: LeadFilters) {
  return useQuery({
    queryKey: [...queryKeys.leads.all, filters],
    queryFn: () => LeadsService.list(filters),
  })
}

export function useLead(id: string) {
  return useQuery({
    queryKey: queryKeys.leads.detail(id),
    queryFn: () => LeadsService.getById(id),
    enabled: !!id,
  })
}

export function useUpdateLead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: LeadUpdateInput }) => LeadsService.update(id, data),
    onSuccess: (lead) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leads.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.leads.detail(lead.id) })
    },
  })
}
