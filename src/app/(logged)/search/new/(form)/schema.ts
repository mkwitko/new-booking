import { z } from 'zod'

const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

export const Schema = z
  .object({
    customer: z.object({
      id: z.string(),
      name: z.string().nonempty('O nome do cliente é obrigatório'),
    }),

    consumer: z.string().default('others').optional(),
    chargeNoShow: z.coerce.boolean().default(false).nullable().optional(),
    chargeTurismTaxes: z.coerce.boolean().default(false).nullable().optional(),

    centerCost: z.string().nullable().default(null).optional(),

    guests: z.array(
      z.object({
        email: z.string().optional().nullable().default(null),
        givenName: z.string().nonempty('O nome do hóspede é obrigatório'),
        surname: z.string().nonempty('O sobrenome do hóspede é obrigatório'),
        ageGroup: z.enum(['ADULT', 'CHILDREN']).default('ADULT').nullable().optional(),
      }),
    ),

    paymentMethod: z.string({ required_error: 'O método de pagamento é obrigatório' }).nonempty('O método de pagamento é obrigatório'),
    selectCreditCard: z.string({ required_error: 'Selecione um cartão de crédito' }).nullable().default(null).optional(),

    creditCard: z.object({
      cardCVV: z.string().nonempty('O CVV é obrigatório'),
      tokenized: z.string().nullable().default(null).optional(),
      plain: z.object({
        cardHolder: z.string().nullable().default(null).optional(),
        cardNumber: z.string().nullable().default(null).optional(),
        expireDate: z.string().nullable().default(null).optional(),

        cardBrand: z.object({
          code: z.string().nullable().default(null).optional(),
        }).nullable().default(null).optional(),
      }).nullable().default(null).optional(),
    }),

    billing: z.object({
      code: z.string().nonempty('O código da reserva é obrigatório'),
      description: z.string().nonempty('A descrição da reserva é obrigatório'),
      id: z.coerce.number(),
    }),

    comments: z.string().nullable().default(null).optional(),
  })
  .superRefine((value, context) => {
    value.guests.forEach((guest, index) => {
      if (
        guest.email &&
        guest.email !== '' &&
        emailPattern.test(guest.email) === false
      ) {
        context.addIssue({
          code: 'custom',
          message: 'O e-mail do hóspede é inválido',
          path: ['guests', index, 'email'],
        })
      }
    })

    if ((value.paymentMethod === 'Cartão de Crédito' && value.selectCreditCard === 'Informar Manualmente') || value.paymentMethod === 'Direto ao Hotel') {
      if (!value.creditCard?.plain?.cardHolder) {
        context.addIssue({
          code: 'custom',
          message: 'O nome do cartão é obrigatório',
          path: ['creditCard', 'plain', 'cardHolder'],
        })
      }

      if (!value.creditCard?.plain?.cardNumber) {
        context.addIssue({
          code: 'custom',
          message: 'O número do cartão é obrigatório',
          path: ['creditCard', 'plain', 'cardNumber'],
        })
      }

      if (!value.creditCard?.plain?.expireDate) {
        context.addIssue({
          code: 'custom',
          message: 'A data de expiração do cartão é obrigatória',
          path: ['creditCard', 'plain', 'expireDate'],
        })
      }

      if (!value.creditCard.cardCVV) {
        context.addIssue({
          code: 'custom',
          message: 'O CVV do cartão é obrigatório',
          path: ['creditCard', 'cardCVV'],
        })
      }
    }
    if (value.paymentMethod === 'Cartão de Crédito' && value.selectCreditCard !== 'Informar Manualmente') {
      if (!value.creditCard.tokenized) {
        context.addIssue({
          code: 'custom',
          message: 'O cartão de crédito é obrigatório',
          path: ['selectCreditCard'],
        })
      }
    }
  })

export type ReservationFormSchema = z.infer<typeof Schema>
