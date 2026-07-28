"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { KnowledgeService } from "@/services/knowledge/knowledge.service"

const queryKeys = {
  documents: (folderId: string | null) => ["knowledge", "documents", folderId] as const,
  document: (id: string) => ["knowledge", "document", id] as const,
  folders: ["knowledge", "folders"] as const,
  stats: ["knowledge", "stats"] as const,
  search: (q: string) => ["knowledge", "search", q] as const,
}

export function useFolders() {
  return useQuery({ queryKey: queryKeys.folders, queryFn: () => KnowledgeService.getFolders() })
}

export function useKnowledgeDocuments(folderId: string | null) {
  return useQuery({ queryKey: queryKeys.documents(folderId), queryFn: () => KnowledgeService.getDocuments(folderId) })
}

export function useKnowledgeDocument(id: string | null) {
  return useQuery({ queryKey: queryKeys.document(id ?? ""), queryFn: () => KnowledgeService.getDocument(id!), enabled: !!id })
}

export function useKnowledgeAnalytics() {
  return useQuery({ queryKey: queryKeys.stats, queryFn: () => KnowledgeService.getStats() })
}

export function useKnowledgeSearch(query: string) {
  return useQuery({
    queryKey: queryKeys.search(query),
    queryFn: () => KnowledgeService.search(query),
    enabled: query.length > 0,
  })
}

export function useDeleteDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => KnowledgeService.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knowledge"] })
    },
  })
}

export function useUploadDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ file, folderId }: { file: File; folderId: string | null }) =>
      KnowledgeService.uploadDocument(file, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knowledge"] })
    },
  })
}
