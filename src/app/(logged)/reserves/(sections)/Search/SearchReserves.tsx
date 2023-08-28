'use client'

import InputContainer from '@/components/coreComponents/containers/InputContainer'
import Button from '@/components/interactiveComponents/Button'
import { B2BCombobox } from '@/components/interactiveComponents/ComboBox'
import { B2BDatePicker } from '@/components/interactiveComponents/DatePicker'
import { Button as ButtonUI } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { LoggedContext } from '@/context/LoggedContext'
import { useContext, useState } from 'react'
import useSearchReservesHook from '@/hooks/reserves/SearchReserves'
import { SearchContext } from '@/context/SearchContext'

export default function SearchReservesComponent() {
  const { user } = useContext(LoggedContext)

  const [moreFilters, setMoreFilters] = useState<boolean>(false)

  const { salePointHook, cityHook, dateHook, peopleHook, roomsHook, Search } =
    useContext(SearchContext)

  const {
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
  } = useSearchReservesHook()

  const handleInputLocatorChange = (event: any) => {
    const inputValue = event.target.value
    const numericValue = inputValue.replace(/[^0-9]/g, '')

    setLocator(numericValue)
  }

  console.log('locator', locator)

  return (
    <>
      <div
        className="flex w-full flex-col gap-4
      xl:flex-row"
      >
        <InputContainer label="Localizador">
          <Popover>
            <PopoverTrigger asChild>
              {/* trocar o ButtonUI por um componente de input de texto */}
              <ButtonUI
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              />
            </PopoverTrigger>
          </Popover>
        </InputContainer>

        <InputContainer label="Ponto de venda">
          <B2BCombobox
            options={user?.hook?.data.data}
            value={salePointHook.salePoint}
            setValue={salePointHook.setSalePoint}
            labelTag="corporateName"
            valueTag="companyId"
          />
        </InputContainer>

        <InputContainer label="Status">
          <B2BCombobox
            options={''}
            value={statusSelected}
            setValue={setStatusSelected}
          />
        </InputContainer>

        <InputContainer label="Tipo de Data">
          <B2BCombobox
            options={''}
            value={dateType}
            setValue={setStatusSelected}
          />
        </InputContainer>

        <InputContainer label="Entrada e Saída">
          {/* <B2BDatePicker /> */}
        </InputContainer>
      </div>

      {moreFilters && (
        <div
          className="flex w-[50%] flex-col items-center justify-start gap-8
          lg:flex-row"
        >
          <InputContainer label="Cidade">
            <B2BCombobox
              options={''}
              value={cityHook.city}
              setValue={cityHook.setCity}
            />
          </InputContainer>

          <InputContainer label="Cliente">
            <B2BCombobox options={''} value={client} setValue={setClient} />
          </InputContainer>
        </div>
      )}

      <div className="flex w-full items-center justify-end">
        <div className="flex gap-4 lg:w-1/4">
          <Button
            label="Limpar Filtro"
            textClass="text-textDisabled"
            color="light"
            mergeClass="px-0"
          />
          <Button label="Buscar" mergeClass="px-0" />
        </div>
      </div>

      <div className="flex w-full justify-center border-t-[0.06rem] border-borderColor">
        <p
          className="mt-6 cursor-pointer text-xs font-semibold uppercase text-primaryDark"
          onClick={() => setMoreFilters(!moreFilters)}
        >
          {moreFilters ? 'FILTRO SIMPLES' : 'FILTRO AVANÇADO'}
        </p>
      </div>
    </>
  )
}
