'use client'

import WhiteBox from '@/components/coreComponents/containers/WhiteBox'
import * as FormComponents from '@/components/formComponents'
import { useReservationForm } from '../(form)/useReservationForm'

// Mock Data
import {
  AllowedExpenses,
  AvailableCreditCards,
  PaymentMethods,
} from '../(data)'

import { CreditCardOption } from './CreditCardOption'
import { NewCreditCardOption } from './NewCreditCardOption'
import { CredtiCard } from './CreditCard'

export function ReserveForm() {
  const {
    errors,
    watch,
    handleSubmit,
    isSubmitting,
    register,
    setValue,
    submitForm,
  } = useReservationForm()

  const displayCreditCardNameField =
    watch('paymentMethod') === 'Cartão de Crédito'

  const displayCreditCardForm =
    watch('creditCardName') === 'Informar Manualmente'

  return (
    <form className="w-full space-y-2" onSubmit={handleSubmit(submitForm)}>
      {/* Dados do Comprador */}
      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Dados do Comprador
        </span>

        <div className="mt-6 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
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

        <div className="mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
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

        <div className="mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
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

        <div className="mt-6 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          <FormComponents.Select.Root
            placeholder="Método de Pagamento"
            errorMessage={errors?.paymentMethod?.message}
            onValueChange={(value) => setValue('paymentMethod', value)}
          >
            {PaymentMethods.map((method) => (
              <FormComponents.Select.Item
                key={method}
                text={method}
                value={method}
              />
            ))}
          </FormComponents.Select.Root>

          <FormComponents.Select.Root
            placeholder="Despesas Autorizadas"
            errorMessage={errors?.allowedExpenses?.message}
          >
            {AllowedExpenses.map((expense) => (
              <FormComponents.Select.Item
                key={expense}
                text={expense}
                value={expense}
              />
            ))}
          </FormComponents.Select.Root>

          {/* <FormComponents.Input
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
          /> */}
        </div>

        {displayCreditCardNameField && (
          <div className="mt-4 grid w-full grid-cols-1">
            <FormComponents.Select.Root
              placeholder="Informe o cartão de crédito"
              errorMessage={errors?.creditCardName?.message}
              onValueChange={(value) => setValue('creditCardName', value)}
            >
              {AvailableCreditCards.map((card) => (
                <FormComponents.Select.Item
                  key={card.id}
                  text={card.name}
                  value={card.name}
                  creditCard
                >
                  <CreditCardOption key={card.id} {...card} />
                </FormComponents.Select.Item>
              ))}
              <FormComponents.Select.Item
                text="Informar Manualmente"
                value="Informar Manualmente"
                creditCard
              >
                <NewCreditCardOption />
              </FormComponents.Select.Item>
            </FormComponents.Select.Root>

            {displayCreditCardForm && (
              <div className="mt-4 grid w-full grid-cols-2">
                {/* Cartão de Crédito */}
                <div className="space-y-4">
                  <span className="mt-4 block text-xs font-semibold uppercase text-textSecondary">
                    Dados do cartão de crédito
                  </span>
                  <CredtiCard />
                </div>

                <div className="mt-auto space-y-4">
                  <FormComponents.Input
                    placeholder="Nome no cartão"
                    type="text"
                  />

                  <FormComponents.Input
                    placeholder="Número do cartão"
                    type="text"
                  />

                  <FormComponents.Input placeholder="Validade" type="text" />

                  <FormComponents.Input
                    type="text"
                    placeholder="CVV"
                    className="w-28"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </WhiteBox>

      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Forma de Pagamento
        </span>

        <FormComponents.Textarea
          placeholder="Observações (Opcional)"
          className="mt-6"
          register={register('observations')}
          errorMessage={errors?.observations?.message}
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
