"use client";

import InputContainer from "@/components/coreComponents/containers/InputContainer";
import Button from "@/components/interactiveComponents/Button";
import { B2BCombobox } from "@/components/interactiveComponents/ComboBox";
import { LoggedContext } from "@/context/LoggedContext";
import { useContext, useState } from "react";
import * as FomCoponents from "@/components/formComponents";
import { B2BDatePicker } from "@/components/interactiveComponents/DatePicker";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { ReservesContext } from "@/context/ReservesContext";
import { customerResponseData } from "@/DTO/customers/CustomerDTO";

export default function SearchReserves({
  setHasSearched,
  isSearching,
  setIsSearching,
}: {
  setHasSearched: (bool: boolean) => void;
  isSearching: boolean;
  setIsSearching: (bool: boolean) => void;
}) {
  const { user, locale } = useContext(LoggedContext);

  const [seeMoreFilters, setSeeMoreFilters] = useState<boolean>(false);

  //   FIXME - Hooks que forem repetidos, vamos passar para o loggedContext
  const {
    salePointHook,
    cityHook,
    dateHook,
    reservesHook,
    Search,
    customerHook,
  } = useContext(ReservesContext);

  const handleSearch = () => {
    setIsSearching(true)
    Search().then((response: any) => {
      setIsSearching(false)
      if (response && response?.length > 0)
        setHasSearched(true)
    });
  };
 
  return (
    <>
      <div
        className="flex w-full flex-col gap-4
      xl:flex-row"
      >
        <InputContainer label="Localizador">
          <FomCoponents.Input
            type="number"
            id="locator"
            onChange={(e) => reservesHook.setLocator(e.target.value)}
          />
        </InputContainer>

        <InputContainer label="Ponto de venda">
          <B2BCombobox
            options={user?.hook?.data}
            value={salePointHook.salePoint}
            setValue={(e) => {
              salePointHook.setSalePoint(e);
              customerHook.getAgencyCustomers(e);
            }}
            labelTag="corporateName"
            valueTag="companyId"
            disable={reservesHook.locator}
          />
        </InputContainer>

        <InputContainer label="Status">
          <B2BCombobox
            options={reservesHook.statusList}
            value={
              reservesHook.statusSelected ||
              reservesHook.statusList[0].value.toString()
            }
            setValue={reservesHook.setStatusSelected}
            disable={reservesHook.locator}
          />
        </InputContainer>

        <InputContainer label="Tipo de Data">
          <B2BCombobox
            options={reservesHook.dateTypeList}
            value={
              reservesHook.dateType ||
              reservesHook.dateTypeList[3].value.toString()
            }
            setValue={reservesHook.setDateType}
            disable={reservesHook.locator}
          />
        </InputContainer>

        <InputContainer label="Entrada e Saída">
          <B2BDatePicker
            checkIn={dateHook.checkIn}
            setCheckIn={dateHook.setCheckIn}
            checkOut={dateHook.checkOut}
            setCheckOut={dateHook.setCheckOut}
            disable={reservesHook.locator}
          />
        </InputContainer>
      </div>

      {seeMoreFilters && (
        <div
          className="flex w-full flex-col items-center justify-start gap-10
          lg:flex-row"
        >
          <InputContainer label="Cidade">
            <B2BCombobox
              options={locale?.hook?.data}
              value={cityHook.city}
              setValue={cityHook.setCity}
              labelTag="cityName"
              valueTag="cityId"
              disable={reservesHook.locator}
            />
          </InputContainer>

          <InputContainer label="Cliente">
            <B2BCombobox
              options={
                customerHook.agencyCustomers
                  ? customerHook.agencyCustomers.map(
                      (prop: customerResponseData, index: number) => ({
                        value: prop.alphaId,
                        label: prop.name,
                      }),
                    )
                  : []
              }
              value={reservesHook.client}
              setValue={reservesHook.setClient}
              disable={reservesHook.locator}
            />
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
            disabled={isSearching}
          />
          <Button
            label="Buscar"
            mergeClass="px-0"
            onClick={handleSearch}
            loading={isSearching}
          />
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
            {seeMoreFilters ? "FILTRO SIMPLES" : "FILTRO AVANÇADO"}
          </p>
        </div>
      </div>
    </>
  );
}
