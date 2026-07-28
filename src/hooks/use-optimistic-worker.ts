"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { WorkersService } from "@/services/workers/workers.service"
import { WorkersRepository } from "@/services/workers/workers.repository"
import type { WorkerWithStats } from "@/services/workers/workers.types"
import type { WorkerUpdateInput } from "@/services/workers/workers.schema"

export function useOptimisticWorkerMode() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, mode }: { id: string; mode: WorkerUpdateInput["mode"] }) =>
      WorkersService.update(id, { mode }),

    onMutate: async ({ id, mode }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.workers.all })
      const previous = queryClient.getQueryData<WorkerWithStats[]>(queryKeys.workers.all)

      queryClient.setQueryData<WorkerWithStats[]>(queryKeys.workers.all, (old) =>
        old?.map((w) => (w.id === id ? { ...w, mode: mode ?? w.mode } : w)),
      )

      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.workers.all, context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workers.all })
    },
  })
}
