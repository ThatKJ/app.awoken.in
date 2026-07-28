"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { OpportunitiesService } from "@/services/opportunities/opportunities.service"
import type { OpportunityStage } from "@/types"

export function useOpportunities() {
  return useQuery({
    queryKey: queryKeys.opportunities.all,
    queryFn: () => OpportunitiesService.list(),
  })
}

export function useOpportunity(id: string | null) {
  return useQuery({
    queryKey: queryKeys.opportunities.detail(id ?? ""),
    queryFn: () => OpportunitiesService.getById(id!),
    enabled: !!id,
  })
}

export function useOpportunityAnalytics() {
  return useQuery({
    queryKey: [...queryKeys.opportunities.all, "analytics"],
    queryFn: () => OpportunitiesService.getSummary(),
  })
}

export function useMoveOpportunity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: OpportunityStage }) =>
      OpportunitiesService.updateStage(id, stage),
    onMutate: async ({ id, stage }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.opportunities.all })
      const previous = queryClient.getQueryData(queryKeys.opportunities.all)

      queryClient.setQueryData(queryKeys.opportunities.all, (old: unknown) => {
        if (!Array.isArray(old)) return old
        return (old as Array<{ id: string } & Record<string, unknown>>).map((o) =>
          o.id === id ? { ...o, stage } : o,
        )
      })

      return { previous }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.opportunities.all, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.all })
    },
  })
}

export function useUpdateOpportunity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: OpportunityStage }) =>
      OpportunitiesService.updateStage(id, stage),
    onSuccess: (opportunity) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.detail(opportunity.id) })
    },
  })
}
