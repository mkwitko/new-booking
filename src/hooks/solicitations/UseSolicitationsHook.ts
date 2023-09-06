import { useState } from 'react'

export default function UseSolicitationsHook() {
  // SolicitationsTypes
  const solicitationsTypes = [
    { value: 0, label: 'VIP' },
    { value: 1, label: 'Edição ou Cancelamento' },
  ]
  const [solicitationSelected, setsolicitationSelected] = useState<string>(solicitationsTypes[0].value.toString())

  // Status
  const bookingPolicyTypeList = [
    { value: 0, label: 'ACEITO' },
    { value: 1, label: 'PENDENTE' },
    { value: 2, label: 'NEGADO' },
  ]
  const [bookingPolicyType, setBookingPolicyType] = useState<string>('')

  // DateType
  const dateTypeList = [
    { value: 0, label: 'ENTRADA' },
    { value: 1, label: 'SAÍDA' },
    { value: 2, label: 'EMISSÃO' },
  ]
  const [dateType, setDateType] = useState<string>('')

  // Localizador
  const [locator, setLocator] = useState()

  return {
    solicitationsTypes,
    solicitationSelected,
    setsolicitationSelected,
    dateTypeList,
    dateType,
    setDateType,
    bookingPolicyTypeList,
    bookingPolicyType,
    setBookingPolicyType,
    locator,
    setLocator,
  }
}
