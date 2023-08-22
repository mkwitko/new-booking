'use client'

import Button from '@/components/interactiveComponents/Button'
import useLoginForm from './useLoginForm'

export default function LoginForm() {
  const { errors, handleSubmit, isSubmitting, register, submitForm } =
    useLoginForm()

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex min-h-[200px] w-full translate-y-0 flex-col gap-10 rounded-b2b bg-white p-6 shadow-lg duration-700 hover:translate-y-[-5%]"
    >
      <div className="flex w-full flex-col gap-8">
        <span className="text-center text-large font-semibold text-primary lg:text-start">
          Acesse sua conta
        </span>

        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col border-b-2 border-primary">
            <label className="text-small text-textSecondary">Usuário</label>
            <input
              className="py-1 focus:outline-none"
              {...register('username')}
            />
          </div>
          {errors?.username && (
            <p className="-mt-4 text-small text-errorDark">
              {errors.username.message}
            </p>
          )}

          <div className="flex flex-col border-b-2 border-primary">
            <label className="text-small text-textSecondary">Senha</label>
            <input
              className="py-1 focus:outline-none"
              type="password"
              {...register('password')}
            />
          </div>
          {errors?.password && (
            <p className="-mt-4 text-small text-errorDark">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col gap-4">
          <Button buttonType="submit" label="ENTRAR" loading={isSubmitting} />

          <button type="button" className="py-3 font-bold text-primary">
            ESQUECI MINHA SENHA
          </button>
        </div>
      </div>
    </form>
  )
}
