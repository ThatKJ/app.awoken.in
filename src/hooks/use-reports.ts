"use client"

import { useQuery, useMutation } from "@tanstack/react-query"
import { ReportsService } from "@/services/reports/reports.service"

export function useReportSummary() {
  return useQuery({
    queryKey: ["reports", "summary"],
    queryFn: () => ReportsService.getSummary(),
  })
}

export function useRevenue() {
  return useQuery({
    queryKey: ["reports", "revenue"],
    queryFn: () => ReportsService.getRevenue(),
  })
}

export function useWorkerAnalytics() {
  return useQuery({
    queryKey: ["reports", "worker-analytics"],
    queryFn: () => ReportsService.getWorkerAnalytics(),
  })
}

export function useAttribution() {
  return useQuery({
    queryKey: ["reports", "attribution"],
    queryFn: () => ReportsService.getAttribution(),
  })
}

export function useInsights() {
  return useQuery({
    queryKey: ["reports", "insights"],
    queryFn: () => ReportsService.getInsights(),
  })
}

export function useForecast() {
  return useQuery({
    queryKey: ["reports", "forecast"],
    queryFn: () => ReportsService.getForecast(),
  })
}

export function useExportReport() {
  return useMutation({
    mutationFn: ({ format }: { format: "csv" | "pdf" | "png" }) => {
      if (format === "csv") return ReportsService.exportCsv()
      return Promise.resolve(`Exporting as ${format}...`)
    },
  })
}
