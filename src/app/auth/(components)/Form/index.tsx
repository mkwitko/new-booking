'use client';

import Button from '@/components/interactiveComponents/Button';
import useLoginForm from './useLoginForm';

export default function LoginForm() {
  const { errors, handleSubmit, isSubmitting, register, submitForm } =
    useLoginForm();

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col bg-white min-h-[200px] shadow-lg p-6 rounded-b2b gap-10 hover:translate-y-[-5%] translate-y-0 duration-700 w-full"
    >
      <div className="flex flex-col w-full gap-8">
        <span className="text-large text-primary font-semibold text-center lg:text-start">
          Acesse sua conta
        </span>

        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col border-b-2 border-primary">
            <label className="text-small text-textSecondary">Usuário</label>
            <input
              className="py-1 focus:outline-none"
              {...register('username')}
            />
          </div>
          {errors?.username && (
            <p className="text-small text-errorDark -mt-4">
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
            <p className="text-small text-errorDark -mt-4">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Button
            buttonType="submit"
            label="ENTRAR"
            loading={isSubmitting}
          />

          <button
            type="button"
            className="font-bold text-primary py-3"
          >
            ESQUECI MINHA SENHA
          </button>
        </div>
      </div>
    </form>
  );
}
