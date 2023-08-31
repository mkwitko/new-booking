import { z } from "zod"

export const Schema = z.object({
  name: z.string().nullable().default(null).optional(),
  onlyWithGateway: z.boolean().nullable().default(false).optional(),
  priceRange: z.object({
    min: z.number().nullable().default(null).optional(),
    max: z.number().nullable().default(null).optional(),
  }).default({ min: null, max: null }).optional(),
  onlyAvailable: z.boolean().nullable().default(false).optional(),
  distanceRange: z.number().nullable().default(null).optional(),
  address: z.string().nullable().default(null).optional(),
  paymentMethods: z.object({
    directPayment: z.boolean().nullable().default(false).optional(),
    billed: z.boolean().nullable().default(false).optional(),
    virtualCard: z.boolean().nullable().default(false).optional(),
  }),
  freeCancellation: z.boolean().nullable().default(false).optional(),
  neighborhoods: z.array(z.record(z.string(), z.boolean().nullable().default(false).optional()))
})

export type FilterForm = z.infer<typeof Schema>
