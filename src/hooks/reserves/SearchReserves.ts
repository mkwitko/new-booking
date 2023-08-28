import { useState } from 'react'

export default function useSearchReservesHook() {
  // Status
  const statusList = ['CONFIRMADO', 'CANCELADO', 'MODIFICADO', 'TODOS']
  const [statusSelected, setStatusSelected] = useState<string>('')

  // DateType
  const dateTypeList = ['ENTRADA', 'SAÍDA', 'CANCELADO', 'EMISSÃO']
  const [dateType, setDateType] = useState<string>('')

  // Localizador
  const [locator, setLocator] = useState<number>()

  // Client
  const [client, setClient] = useState<string>('')

  return {
    statusList,
    statusSelected,
    setStatusSelected,
    locator,
    setLocator,
    dateTypeList,
    dateType,
    setDateType,
    client,
    setClient,
  }
}
