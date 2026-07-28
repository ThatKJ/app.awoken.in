import { LeadsRepository } from "@/services/leads/leads.repository"
import { NotFoundError } from "@/lib/errors"
import { track } from "@/lib/analytics/track"
import { AnalyticsEvents } from "@/lib/analytics/events"
import { leadUpdateSchema, type LeadUpdateInput } from "@/services/leads/leads.schema"
import type { Lead, LeadFilters } from "@/services/leads/leads.types"

export const LeadsService = {
  async list(filters?: LeadFilters): Promise<Lead[]> {
    const leads = await LeadsRepository.getAll()

    let filtered = leads
    if (filters?.status) filtered = filtered.filter((l) => l.status === filters.status)
    if (filters?.source) filtered = filtered.filter((l) => l.source === filters.source)
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      filtered = filtered.filter(
        (l) => l.name.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q) || l.phone?.includes(q),
      )
    }

    return filtered
  },

  async getById(id: string): Promise<Lead> {
    const lead = await LeadsRepository.getById(id)
    if (!lead) throw new NotFoundError("Lead")
    return lead
  },

  async update(id: string, input: LeadUpdateInput): Promise<Lead> {
    const parsed = leadUpdateSchema.parse(input)
    const updated = await LeadsRepository.update(id, parsed as Partial<Lead>)
    track(AnalyticsEvents.LEAD_STATUS_CHANGED, { leadId: id, status: parsed.status })
    return updated
  },
}
