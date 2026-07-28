"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { ConversationsService } from "@/services/conversations/conversations.service"

export function useConversations() {
  return useQuery({
    queryKey: queryKeys.conversations.all,
    queryFn: () => ConversationsService.list(),
  })
}

export function useConversation(id: string | null) {
  return useQuery({
    queryKey: queryKeys.conversations.detail(id ?? ""),
    queryFn: () => ConversationsService.getById(id!),
    enabled: !!id,
  })
}

export function useMessages(conversationId: string | null) {
  return useQuery({
    queryKey: [...queryKeys.conversations.detail(conversationId ?? ""), "messages"],
    queryFn: () => ConversationsService.getMessages(conversationId!),
    enabled: !!conversationId,
  })
}
