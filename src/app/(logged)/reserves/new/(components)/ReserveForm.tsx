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
          <FormComponents.Input
            type="text"
            id="client-name"
            placeholder="Cliente"
          />

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
          <FormComponents.Input
            type="text"
            id="cost-center"
            placeholder="Centro de Custos"
          />

          <FormComponents.Input
            type="text"
            id="register"
            placeholder="Matrícula"
          />

          <FormComponents.Input type="text" id="area" placeholder="Area" />
        </div>
      </WhiteBox>
      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Forma de Pagamento
        </span>

        <div className="mt-6 grid w-full grid-cols-2 gap-4">
          <FormComponents.Input
            placeholder="Método de Pagamento"
            id="payment-method"
          />

          <FormComponents.Input
            placeholder="Desepesas Autorizadas"
            id="authorized-expenses"
            disabled
          />

          <FormComponents.Input
            placeholder="Cartão de Crédito"
            id="credit-card"
            disabled
          />

          <FormComponents.Input
            disabled
            placeholder="CVV"
            id="cvv"
            className="w-28"
          />
        </div>
      </WhiteBox>

      <WhiteBox>
        <span className="font-semibold uppercase text-primary-500">
          Forma de Pagamento
        </span>
      </WhiteBox>
    </form>
  )
}
