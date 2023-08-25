'use client'

import WhiteBox from '@/components/coreComponents/containers/WhiteBox'
import * as FormComponents from '@/components/formComponents'
import { useReservationForm } from '../(form)/useReservationForm'

export function ReserveForm() {
  const { errors, handleSubmit, isSubmitting, register, setValue, submitForm } =
    useReservationForm()

  return (
    <form className="w-full space-y-2" onSubmit={handleSubmit(submitForm)}>
      {/* Dados do Comprador */}
      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Dados do Comprador
        </span>

        <div className="mt-6 grid w-full grid-cols-2 gap-4">
          {/* Combo Box */}
          <FormComponents.Input
            type="text"
            placeholder="Cliente"
            register={register('name')}
            errorMessage={errors.name?.message}
          />

          <div className="space-y-2">
            <FormComponents.Checkbox
              label="Autoriza cobrança de taxa de turismo"
              id="allow-turism-taxes"
              // register={register('allowTurismTaxes')}
            />

            <FormComponents.Checkbox
              label="Reserva com garantia de no-show"
              id="allow-no-show-ensurance"
              // register={register('noShowEnsurance')}
            />
          </div>
        </div>

        <span className="mt-10 block text-xs font-semibold uppercase text-textSecondary">
          Informações gerenciais
        </span>

        <div className="mt-4 grid w-full grid-cols-2 gap-4">
          {/* Combo box */}
          <FormComponents.Input
            type="text"
            placeholder="Centro de Custos"
            errorMessage={errors?.costsCenter?.message}
            register={register('costsCenter')}
          />

          <FormComponents.Input
            type="text"
            placeholder="Matrícula"
            errorMessage={errors?.register?.message}
            register={register('register')}
          />

          <FormComponents.Input
            type="text"
            id="area"
            placeholder="Area"
            register={register('area')}
            errorMessage={errors?.area?.message}
          />
        </div>
      </WhiteBox>

      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Dados dos Hóspedes
        </span>

        <span className="mt-4 block text-xs font-semibold uppercase text-textSecondary">
          Hóspede 1
        </span>

        <div className="mt-4 grid w-full grid-cols-2 gap-4">
          {/* Combo Box */}
          <FormComponents.Input
            type="text"
            placeholder="CPF (Opcional)"
            register={register('guestId')}
            errorMessage={errors?.guestId?.message}
          />

          <FormComponents.Input
            type="email"
            placeholder="Email (Opcional)"
            register={register('guestEmail')}
            errorMessage={errors?.guestEmail?.message}
          />

          <FormComponents.Input
            type="text"
            placeholder="Nome"
            register={register('guestName')}
            errorMessage={errors?.guestName?.message}
          />

          <FormComponents.Input
            type="text"
            placeholder="Sobrenome"
            register={register('guestSurname')}
            errorMessage={errors?.guestSurname?.message}
          />
        </div>
      </WhiteBox>

      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Forma de Pagamento
        </span>

        <div className="mt-6 grid w-full grid-cols-2 gap-4">
          {/* <FormComponents.Input
            placeholder="Método de Pagamento"
            register={register('paymentMethod')}
            errorMessage={errors?.paymentMethod?.message}
          /> */}

          <FormComponents.Select.Root placeholder="Método de Pagamento">
            <FormComponents.Select.Item
              text="Cartão de Crédito"
              value="Cartão de Crédito"
            />
            <FormComponents.Select.Item
              text="Direto ao Hotel"
              value="Direto ao Hotel"
            />
            <FormComponents.Select.Item
              text="Pagamento Faturado"
              value="Pagamento Faturado"
            />
          </FormComponents.Select.Root>

          <FormComponents.Input
            placeholder="Desepesas Autorizadas"
            register={register('allowedExpenses')}
            errorMessage={errors?.allowedExpenses?.message}
            disabled
          />

          <FormComponents.Input
            placeholder="Cartão de Crédito"
            register={register('creditCard')}
            errorMessage={errors?.creditCard?.message}
            disabled
          />

          <FormComponents.Input
            disabled
            placeholder="CVV"
            className="w-28"
            register={register('credtiCardSecurityCode')}
            errorMessage={errors?.credtiCardSecurityCode?.message}
          />
        </div>
      </WhiteBox>

      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Forma de Pagamento
        </span>

        <FormComponents.Textarea
          placeholder="Observações (Opcional)"
          className="mt-6"
          // register={register('observations')}
          // errorMessage={errors?.observations?.message}
        />
      </WhiteBox>

      <p className="block text-right text-xs">
        Ao confirmar você afirma estar de acordo com a{' '}
        <span className="font-bold">política do hotel</span>
      </p>

      <div className="flex w-full items-center justify-end gap-4 pt-2">
        <FormComponents.Button type="button" variant="ghost">
          Descartar
        </FormComponents.Button>

        <FormComponents.Button type="submit" variant="primary">
          Confirmar Reserva
        </FormComponents.Button>
      </div>
    </form>
  )
}
