import { z } from "zod"

export const leadUpdateSchema = z.object({
  status: z
    .enum([
      "new", "contacted", "contacted_no_reply", "in_conversation",
      "qualified", "disqualified", "nurturing", "booking_in_progress",
      "booked", "visited", "cold", "recoverable", "lost", "won",
    ])
    .optional(),
  property_interest: z.string().max(200).optional(),
  budget: z.string().max(100).optional(),
  assigned_worker: z.string().nullable().optional(),
})

export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>
