'use client'

import { useRouter } from 'next/navigation'

import { AuthApi } from '@/services/auth/auth-service'

import { useForm } from 'react-hook-form'
import { loginFormSchema, FormSchema } from './schema'

import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'react-toastify'

export default function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(loginFormSchema),
  })

  const { push } = useRouter()

  async function submitForm({ password, username }: FormSchema) {
    const { login } = AuthApi()

    try {
      await login({ username, password })
      push('/')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return {
    errors,
    register,
    submitForm,
    isSubmitting,
    handleSubmit,
    loginFormSchema,
  }
}
