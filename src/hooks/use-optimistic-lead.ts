"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { LeadsService } from "@/services/leads/leads.service"
import type { Lead } from "@/services/leads/leads.types"
import type { LeadUpdateInput } from "@/services/leads/leads.schema"

export function useOptimisticLeadStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: LeadUpdateInput }) => LeadsService.update(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.leads.all })
      const previous = queryClient.getQueryData<Lead[]>(queryKeys.leads.all)

      queryClient.setQueryData<Lead[]>(queryKeys.leads.all, (old) =>
        old?.map((l) => (l.id === id ? { ...l, ...(data as Partial<Lead>) } : l)),
      )

      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.leads.all, context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leads.all })
    },
  })
}
