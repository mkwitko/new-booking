import { Schema } from './schema'
import { useForm } from 'react-hook-form'
import type { ReservationFormSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

export function useReservationForm() {
  const {
    register,
    setValue,
    watch,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<ReservationFormSchema>({
    resolver: zodResolver(Schema),
  })

  function submitForm(data: ReservationFormSchema) {
    console.log(data)
  }

  return {
    watch,
    errors,
    register,
    setValue,
    handleSubmit,
    submitForm,
    isSubmitting,
  }
}
