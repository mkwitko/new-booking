import { useState } from 'react'

export default function UseReservesHook() {
  // Status
  const statusList = [
    { value: 0, label: 'CONFIRMADO' },
    { value: 1, label: 'CANCELADO' },
    { value: 2, label: 'MODIFICADO' },
    { value: 3, label: 'TODOS' },
  ]
  const [statusSelected, setStatusSelected] = useState<string>(statusList[0].value.toString())

  // DateType
  const dateTypeList = [
    { value: 0, label: 'ENTRADA' },
    { value: 1, label: 'SAÍDA' },
    { value: 2, label: 'CANCELADO' },
    { value: 3, label: 'EMISSÃO' },
  ]
  const [dateType, setDateType] = useState<string>(dateTypeList[0].value.toString())

  // Localizador
  const [locator, setLocator] = useState()

  // Client
  const [client, setClient] = useState<any>()

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
