import { z } from 'zod'

export const Schema = z.object({
  name: z.string().nonempty('O nome é obrigatório'),
  allowTurismTaxes: z.coerce.boolean().default(false).nullable().optional(),
  noShowEnsurance: z.coerce.boolean().default(false).nullable().optional(),
  costsCenter: z.string().nonempty('O centro de custos é obrigatório'),
  register: z.string().nonempty('A matrícula é obrigatório'),
  area: z.string().nonempty('A área é obrigatório'),

  // Guests Information
  guestId: z.string().optional().nullable().default(null),
  guestEmail: z.string().optional().nullable().default(null),
  guestName: z.string().nonempty('O nome do hóspede é obrigatório'),
  guestSurname: z.string().nonempty('O sobrenome do hóspede é obrigatório'),

  // Payment Information
  paymentMethod: z.string().nonempty('O método de pagamento é obrigatório'),
  creditCardName: z.string().nonempty('Selecione um cartão de crédito'),
  allowedExpenses: z.string().nonempty('O tipo de despesa é obrigatório'),
  creditCard: z.string().nonempty('O cartão de crédito é obrigatório'),
  credtiCardSecurityCode: z
    .string()
    .nonempty('O código de segurança é obrigatório'),

  // Observations
  observations: z.string().optional().nullable().default(null),
})

export type ReservationFormSchema = z.infer<typeof Schema>
