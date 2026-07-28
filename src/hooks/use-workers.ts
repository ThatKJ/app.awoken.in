"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { WorkersService } from "@/services/workers/workers.service"
import type { WorkerFilters } from "@/services/workers/workers.types"
import type { WorkerUpdateInput } from "@/services/workers/workers.schema"

export function useWorkers(filters?: WorkerFilters) {
  return useQuery({
    queryKey: [...queryKeys.workers.all, filters],
    queryFn: () => WorkersService.list(filters),
  })
}

export function useWorker(id: string) {
  return useQuery({
    queryKey: queryKeys.workers.detail(id),
    queryFn: () => WorkersService.getById(id),
    enabled: !!id,
  })
}

export function useUpdateWorker() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: WorkerUpdateInput }) => WorkersService.update(id, data),
    onSuccess: (worker) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workers.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.workers.detail(worker.id) })
    },
  })
}
