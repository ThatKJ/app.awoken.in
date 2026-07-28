import { z } from "zod"

export const taskUpdateSchema = z.object({
  state: z
    .enum(["queued", "in_progress", "awaiting_approval", "escalated", "completed", "rejected", "failed"])
    .optional(),
  assigned_to: z.string().nullable().optional(),
  description: z.string().max(1000).optional(),
})

export type TaskUpdateInput = z.infer<typeof taskUpdateSchema>
