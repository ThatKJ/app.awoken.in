import type { Lead, LeadStatus, LeadSource } from "@/types"

export type { Lead, LeadStatus, LeadSource }

export type LeadFilters = {
  status?: LeadStatus
  source?: LeadSource
  search?: string
  assignedWorker?: string
}

export type LeadUpdate = {
  status?: LeadStatus
  property_interest?: string
  budget?: string
  assigned_worker?: string | null
}
