// // import { Schema } from './schema'
// import { useForm } from 'react-hook-form'
// // import type { ReservationFormSchema } from './schema'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useMasks } from '@/hooks/useMasks'

// export function useReservationForm() {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { isSubmitting, errors },
//     handleSubmit,
//   } = useForm<ReservationFormSchema>({
//     resolver: zodResolver(Schema),
//   })

//   const {
//     createCPFMask,
//     createCreditCardNumberMask,
//     createExpirationDateMask,
//   } = useMasks()

//   const displayCreditCardNameField =
//     watch('payment.method') === 'Cartão de Crédito'

//   const displayCreditCardForm =
//     watch('payment.selectedCreditCard') === 'Informar Manualmente'

//   const creditCardNumberToDisplay = watch('payment.newCreditCard.number')
//     ? createCreditCardNumberMask(watch('payment.newCreditCard.number')) || ''
//     : ''

//   const expirationDateToDisplay = watch('payment.newCreditCard.expirationDate')
//     ? createExpirationDateMask(watch('payment.newCreditCard.expirationDate')) ||
//       ''
//     : ''

//   const guestIdToDisplay = (data: string | null | undefined): string => {
//     return data ? createCPFMask(data) || '' : ''
//   }

//   const nameToDisplay = watch('payment.newCreditCard.name')
//     ? watch('payment.newCreditCard.name')?.toUpperCase()
//     : ''

//   function submitForm(data: ReservationFormSchema) {
//     // console.log(data)
//   }

//   return {
//     watch,
//     errors,
//     register,
//     expirationDateToDisplay,
//     creditCardNumberToDisplay,
//     displayCreditCardForm,
//     displayCreditCardNameField,
//     guestIdToDisplay,
//     nameToDisplay,
//     setValue,
//     handleSubmit,
//     submitForm,
//     isSubmitting,
//   }
// }
