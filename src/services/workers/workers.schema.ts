import { z } from "zod"

export const workerUpdateSchema = z.object({
  mode: z.enum(["off", "observing", "assisted", "autonomous"]).optional(),
  is_active: z.boolean().optional(),
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
})

export const workerFilterSchema = z.object({
  type: z.enum(["lead_response", "qualification", "followup", "recovery", "appointment"]).optional(),
  mode: z.enum(["off", "observing", "assisted", "autonomous"]).optional(),
  search: z.string().optional(),
})

export type WorkerUpdateInput = z.infer<typeof workerUpdateSchema>
export type WorkerFilterInput = z.infer<typeof workerFilterSchema>
