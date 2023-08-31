'use client'

import InputContainer from '@/components/coreComponents/containers/InputContainer'
import Button from '@/components/interactiveComponents/Button'
import { B2BCombobox } from '@/components/interactiveComponents/ComboBox'
import { LoggedContext } from '@/context/LoggedContext'
import { useContext, useState } from 'react'
import useSearchReservesHook from '@/hooks/reserves/SearchReserves'
import { SearchContext } from '@/context/SearchContext'
import * as FomCoponents from '@/components/formComponents'
import { B2BDatePicker } from '@/components/interactiveComponents/DatePicker'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'

export default function SearchReservesComponent() {
  const { user, locale } = useContext(LoggedContext)

  const [seeMoreFilters, setSeeMoreFilters] = useState<boolean>(false)

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

  return (
    <>
      <div
        className="flex w-full flex-col gap-4
      xl:flex-row"
      >
        <InputContainer label="Localizador">
          <FomCoponents.Input type="number" id="locator" />
        </InputContainer>

        <InputContainer label="Ponto de venda">
          {/* <B2BCombobox
            options={user?.hook?.data.data}
            value={salePointHook.salePoint}
            setValue={salePointHook.setSalePoint}
            labelTag="corporateName"
            valueTag="companyId"
          /> */}
        </InputContainer>

        <InputContainer label="Status">
          <B2BCombobox
            options={statusList}
            value={statusSelected || statusList[0].value.toString()}
            setValue={setStatusSelected}
          />
        </InputContainer>

        <InputContainer label="Tipo de Data">
          <B2BCombobox
            options={dateTypeList}
            value={dateType || dateTypeList[3].value.toString()}
            setValue={setDateType}
          />
        </InputContainer>

        <InputContainer label="Entrada e Saída">
          {/* <B2BDatePicker
            checkIn={dateHook.checkIn}
            setCheckIn={dateHook.setCheckIn}
            checkOut={dateHook.checkOut}
            setCheckOut={dateHook.setCheckOut}
          /> */}
        </InputContainer>
      </div>

      {seeMoreFilters && (
        <div
          className="flex w-[50%] flex-col items-center justify-start gap-8
          lg:flex-row"
        >
          <InputContainer label="Cidade">
          {/* <B2BCombobox
            options={locale?.hook?.data}
            value={cityHook.city}
            setValue={cityHook.setCity}
            labelTag="cityName"
            valueTag="cityId"
          /> */}
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
        <div className="mt-6 flex cursor-pointer">
          {seeMoreFilters ? (
            <AiOutlineArrowUp className="h-auto w-4 text-primary" />
          ) : (
            <AiOutlineArrowDown className="h-auto w-4 text-primary" />
          )}
          <p
            className="pl-2 text-xs font-semibold uppercase text-primary"
            onClick={() => setSeeMoreFilters(!seeMoreFilters)}
          >
            {seeMoreFilters ? 'FILTRO SIMPLES' : 'FILTRO AVANÇADO'}
          </p>
        </div>
      </div>
    </>
  )
}
