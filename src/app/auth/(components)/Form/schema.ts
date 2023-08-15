import { z } from 'zod'

export const loginFormSchema = z.object({
  username: z.string().email('Favor informar um e-mail válido'),
  password: z.string({ required_error: 'A senha é obrigatória' }),
})

export type FormSchema = z.infer<typeof loginFormSchema>
