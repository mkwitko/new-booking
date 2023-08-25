const PaymentMethods = [
  'Direto ao Hotel',
  'Cartão de Crédito',
  'Pagamento Faturado',
]

const AllowedExpenses = [
  'Debitar diárias e extras (Exceto bebidas alcoólicas)',
  'Debitar diárias, telefonemas e lavanderia',
  'Debitar diárias e extras (Anexar comanda assinada)',
  'Debitar somente diárias',
  'Debitar somente diárias e café da manhã',
  'Debitar conforme observações',
  'Debitar diárias, café da manhã e lavanderia',
  'Debitar diárias e lavanderia',
]

type CreditCard = {
  id: string
  name: string
  number: string
  cvv: string
  flag: 'visa' | 'mastercard' | 'elo' | 'other'
}

const AvailableCreditCards: Array<CreditCard> = [
  {
    id: '101',
    name: 'Cartão Principal',
    number: '1234123412341234',
    cvv: '123',
    flag: 'visa',
  },
  {
    id: '102',
    name: 'Cartão Secundário',
    number: '1234123412341234',
    cvv: '123',
    flag: 'mastercard',
  },
  {
    id: '103',
    name: 'Cartão Corporativo',
    number: '1234123412341234',
    cvv: '123',
    flag: 'elo',
  },
  {
    id: '104',
    name: 'Cartão da Amante',
    number: '1234123412341234',
    cvv: '123',
    flag: 'other',
  },
]

export { PaymentMethods, AllowedExpenses, AvailableCreditCards }
