"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { TasksService } from "@/services/tasks/tasks.service"
import type { TaskFilters } from "@/services/tasks/tasks.types"
import type { TaskUpdateInput } from "@/services/tasks/tasks.schema"

export function useTasks(filters?: TaskFilters) {
  return useQuery({
    queryKey: [...queryKeys.tasks.all, filters],
    queryFn: () => TasksService.list(filters),
  })
}

export function useTask(id: string) {
  return useQuery({
    queryKey: queryKeys.tasks.detail(id),
    queryFn: () => TasksService.getById(id),
    enabled: !!id,
  })
}

export function usePendingApprovals() {
  return useQuery({
    queryKey: queryKeys.tasks.approvals,
    queryFn: () => TasksService.getPendingApprovals(),
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TaskUpdateInput }) => TasksService.update(id, data),
    onSuccess: (task) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.detail(task.id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.approvals })
    },
  })
}
