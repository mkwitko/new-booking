import { z } from 'zod'

const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

export const Schema = z
  .object({
    // Dados do Comprador
    // purchaser: z.object({
    //   name: z.string({ required_error: 'O nome é obrigatório' }),
    //   allowTurismTaxes: z.coerce.boolean().default(false).nullable().optional(),
    //   noShowEnsurance: z.coerce.boolean().default(false).nullable().optional(),
    // }),
    consumer: z.string({ required_error: 'O nome é obrigatório' }),
    chargeNoShow: z.coerce.boolean().default(false).nullable().optional(),
    chargeTurismTaxes: z.coerce.boolean().default(false).nullable().optional(),

    centerCost: z.string().nonempty('O centro de custos é obrigatório'),
    register: z.string().nonempty('A matrícula é obrigatório'),
    area: z.string().nonempty('A área é obrigatório'),

    // Informações Gerenciais
    // managemntInformation: z.object({
    //   costsCenter: z.string().nonempty('O centro de custos é obrigatório'),
    //   register: z.string().nonempty('A matrícula é obrigatório'),
    //   area: z.string().nonempty('A área é obrigatório'),
    // }),

    // Informações dos Hóspedes
    guests: z.array(
      z.object({
        // id: z.string().optional().nullable().default(null),
        email: z.string().optional().nullable().default(null),
        givenName: z.string().nonempty('O nome do hóspede é obrigatório'),
        surname: z.string().nonempty('O sobrenome do hóspede é obrigatório'),
        ageGroup: z.enum(['ADULT', 'CHILDREN']).default('ADULT').nullable().optional(),
      }),
    ),
    
    // Credit Card Info
    creditCard: z.object({
      cardName: z.string().nullable().default(null).optional(),
      cardNumber: z.string().nullable().default(null).optional(),
      expiry: z.string().nullable().default(null).optional(),
      cardCVV: z.string().nullable().default(null).optional(), 
    }).nullable().default(null).optional(),

    // Informações de Pagamento:
    payment: z.object({
      method: z.string({ required_error: 'Você deve informar o método de pagamento' })
        .nonempty('O método de pagamento é obrigatório'),
      allowedExpenses: z.string({ required_error: 'Você deve informar as despesas autorizadas' })
        .nonempty('O tipo de despesa é obrigatório'),
      selectedCreditCard: z.string().nullable().default(null).optional(),
    }),
    //   newCreditCard: z
    //     .object({
    //       name: z.string().nullable().default(null).optional(),
    //       number: z.string().nullable().default(null).optional(),
    //       expirationDate: z.string().nullable().default(null).optional(),
    //       securityCode: z.string().nullable().default(null).optional(),
    //     })
    //     .nullable()
    //     .default(null)
    //     .optional(),
    // }),

    // Observações
    comments: z.string().nullable().default(null).optional(),
  })
  .superRefine((value, context) => {
    value.guests.forEach((guest, index) => {
      // if (guest.id && guest.id !== '' && cpfPattern.test(guest.id) === false) {
      //   context.addIssue({
      //     code: 'custom',
      //     message: `O CPF do hóspede ${index + 1} é inválido`,
      //     path: ['guests', index, 'id'],
      //   })
      // }

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

    // New Credit Card data validation
    // if (value.payment.method === 'Cartão de Crédito') {
    //   if (
    //     !value.payment.selectedCreditCard ||
    //     value.payment.selectedCreditCard === ''
    //   ) {
    //     context.addIssue({
    //       code: 'custom',
    //       message: 'Você deve informar um cartão de crédito',
    //       path: ['payment', 'selectedCreditCard'],
    //     })
    //   }

    //   if (value.payment.selectedCreditCard === 'Informar Manualmente') {
    //     if (
    //       !value.payment.newCreditCard?.name ||
    //       value.payment.newCreditCard?.name === ''
    //     ) {
    //       context.addIssue({
    //         code: 'custom',
    //         message: 'Você deve informar o nome do cartão de crédito',
    //         path: ['payment', 'newCreditCard', 'name'],
    //       })
    //     }
    //     if (
    //       !value.payment.newCreditCard?.number ||
    //       value.payment.newCreditCard?.number === ''
    //     ) {
    //       context.addIssue({
    //         code: 'custom',
    //         message: 'Você deve informar o número do cartão de crédito',
    //         path: ['payment', 'newCreditCard', 'number'],
    //       })
    //     }

    //     if (value.payment.newCreditCard?.number?.length !== 19) {
    //       context.addIssue({
    //         code: 'custom',
    //         message: 'O número do cartão de crédito deve ter 16 dígitos',
    //         path: ['payment', 'newCreditCard', 'number'],
    //       })
    //     }

    //     if (
    //       !value.payment.newCreditCard?.expirationDate ||
    //       value.payment.newCreditCard?.expirationDate === ''
    //     ) {
    //       context.addIssue({
    //         code: 'custom',
    //         message:
    //           'Você deve informar a data de validade do cartão de crédito',
    //         path: ['payment', 'newCreditCard', 'expirationDate'],
    //       })
    //     }

    //     if (value.payment.newCreditCard?.expirationDate) {
    //       const expirationDate = value.payment.newCreditCard?.expirationDate
    //       const [month, year] = expirationDate.split('/')

    //       const isMonthInvalid = Number(month) > 12 || Number(month) < 1

    //       const currentYear = new Date().getFullYear().toString().slice(2)
    //       const currentMonth = new Date().getMonth() + 1

    //       const isCurrentYear = Number(year) === Number(currentYear)
    //       const isYearValid = Number(year) >= Number(currentYear) // PASSOUU UHUUU
    //       const isMonthExpired = Number(month) < currentMonth

    //       if (
    //         !isYearValid ||
    //         (isCurrentYear && isMonthExpired) ||
    //         isMonthInvalid ||
    //         expirationDate.length !== 5
    //       ) {
    //         context.addIssue({
    //           code: 'custom',
    //           message: 'Validade do cartão de crédito expirada',
    //           path: ['payment', 'newCreditCard', 'expirationDate'],
    //         })
    //       }
    //     }

    //     if (
    //       !value.payment.newCreditCard?.securityCode ||
    //       value.payment.newCreditCard?.securityCode === ''
    //     ) {
    //       context.addIssue({
    //         code: 'custom',
    //         message:
    //           'Você deve informar o código de segurança do cartão de crédito',
    //         path: ['payment', 'newCreditCard', 'securityCode'],
    //       })
    //     }

    //     if (value.payment.newCreditCard?.securityCode?.length !== 3) {
    //       context.addIssue({
    //         code: 'custom',
    //         message:
    //           'O código de segurança do cartão de crédito deve ter 3 dígitos',
    //         path: ['payment', 'newCreditCard', 'securityCode'],
    //       })
    //     }
    //   }
    // }
  })

export type ReservationFormSchema = z.infer<typeof Schema>
