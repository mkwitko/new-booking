import WhiteBox from '@/components/coreComponents/containers/WhiteBox'
import * as FormComponents from '@/components/formComponents'

export function ReserveForm() {
  return (
    <form className="w-full space-y-2">
      {/* Dados do Comprador */}
      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Dados do Comprador
        </span>

        <div className="mt-6 grid w-full grid-cols-2 gap-4">
          {/* Combo Box */}
          <FormComponents.Input type="text" placeholder="Cliente" />

          <div className="space-y-2">
            <FormComponents.Checkbox
              label="Autoriza cobrança de taxa de turismo"
              id="allow-turism-taxes"
            />

            <FormComponents.Checkbox
              label="Reserva com garantia de no-show"
              id="allow-no-show-ensurance"
            />
          </div>
        </div>

        <span className="mt-10 block text-xs font-semibold uppercase text-textSecondary">
          Informações gerenciais
        </span>

        <div className="mt-4 grid w-full grid-cols-2 gap-4">
          {/* Combo box */}
          <FormComponents.Input type="text" placeholder="Centro de Custos" />

          <FormComponents.Input type="text" placeholder="Matrícula" />

          <FormComponents.Input type="text" id="area" placeholder="Area" />
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
          <FormComponents.Input type="text" placeholder="CPF (Opcional)" />

          <FormComponents.Input type="email" placeholder="Email (Opcional)" />

          <FormComponents.Input type="text" placeholder="Nome" />

          <FormComponents.Input type="text" placeholder="Sobrenome" />
        </div>
      </WhiteBox>

      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Forma de Pagamento
        </span>

        <div className="mt-6 grid w-full grid-cols-2 gap-4">
          <FormComponents.Input placeholder="Método de Pagamento" />

          <FormComponents.Input placeholder="Desepesas Autorizadas" disabled />

          <FormComponents.Input placeholder="Cartão de Crédito" disabled />

          <FormComponents.Input disabled placeholder="CVV" className="w-28" />
        </div>
      </WhiteBox>

      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Forma de Pagamento
        </span>

        <FormComponents.Textarea
          placeholder="Observações (Opcional)"
          className="mt-6"
        />
      </WhiteBox>

      <p className="block text-right text-xs">
        Ao confirmar você afirma estar de acordo com a{' '}
        <span className="font-bold">política do hotel</span>
      </p>

      <div className="flex w-full items-center justify-end gap-4 pt-2">
        <button
          type="button"
          className="flex items-center justify-center rounded-b2b px-3 py-2 font-bold uppercase text-textSecondary"
        >
          Descartar
        </button>

        <button
          type="submit"
          className="flex items-center justify-center rounded-md bg-primary-400 px-4 py-2 font-semibold uppercase text-white transition-colors hover:bg-primary"
        >
          Confirmar Reserva
        </button>
      </div>
    </form>
  )
}
