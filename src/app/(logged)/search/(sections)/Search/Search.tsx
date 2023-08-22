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
import useSearchHook from '@/hooks/search/Search'
import { useContext } from 'react'
import PeopleInput from './components/PeopleInput'

export default function SearchComponent() {
  const { user, hotelChain, locale } = useContext(LoggedContext)

  const {
    salePoint,
    setSalePoint,
    city,
    setCity,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    adult,
    setAdult,
    child,
    setChild,
    rooms,
    setRooms,
  } = useSearchHook()

  return (
    <>
      <div
        className="flex w-full flex-col gap-4
      xl:flex-row"
      >
        <InputContainer label="Ponto de venda">
          <B2BCombobox
            options={user?.hook?.data.data}
            value={salePoint}
            setValue={setSalePoint}
            labelTag="corporateName"
            valueTag="companyId"
          />
        </InputContainer>

        <InputContainer label="Destino">
          <B2BCombobox
            options={locale?.hook?.data}
            value={city}
            setValue={setCity}
            // labelTag="cityName"
            // valueTag="cityId"
          />
        </InputContainer>

        <InputContainer label="Data de Entrada e Saída">
          <B2BDatePicker />
        </InputContainer>

        <InputContainer label="Pessoas e Quartos">
          <Popover>
            <PopoverTrigger asChild>
              <ButtonUI
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              />
            </PopoverTrigger>
            <PopoverContent className="PopoverContent p-4">
              <div className="flex flex-col gap-4">
                <PeopleInput
                  icon="/public/icons/ic-adult.svg"
                  value={adult}
                  set={setAdult}
                  label="Adultos"
                  min={1}
                />
                <PeopleInput
                  icon="/public/icons/ic-child.svg"
                  value={child}
                  set={setChild}
                  label="Crianças"
                  min={0}
                />
                <PeopleInput
                  icon="/public/icons/ic-room.svg"
                  value={rooms}
                  set={setRooms}
                  label="Quartos"
                  min={1}
                />
              </div>
            </PopoverContent>
          </Popover>
        </InputContainer>
      </div>

      <div className="flex w-full items-center justify-between">
        <div>
          <Button label="Mapa" />
        </div>

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
    </>
  )
}
