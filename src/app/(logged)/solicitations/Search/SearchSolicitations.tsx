"use client";

import InputContainer from "@/components/coreComponents/containers/InputContainer";
import Button from "@/components/interactiveComponents/Button";
import { B2BCombobox } from "@/components/interactiveComponents/ComboBox";
import { LoggedContext } from "@/context/LoggedContext";
import { useContext } from "react";
import { B2BDatePicker } from "@/components/interactiveComponents/DatePicker";
import { SolicitationsContext } from "@/context/SolicitationsContext";
import * as FormCoponents from "@/components/formComponents";

export default function SearchSolicitationsComponent() {
  const { user } = useContext(LoggedContext);

  const { salePointHook, dateHook, solicitationsHook, Search } = useContext(SolicitationsContext);

  const handleSearch = () => {
    Search()
  };

  return (
    <>
      <div
        className="flex w-full flex-col gap-4
      xl:flex-row"
      >
        {solicitationsHook.solicitationSelected === '1' && (
          <InputContainer label="Localizador">
            <FormCoponents.Input 
              type="number"
              id="locator"
              onChange={(e) => solicitationsHook.setLocator(e.target.value)}
              defaultValue={solicitationsHook.locator}
            />
        </InputContainer>
        )}
        <InputContainer label="Ponto de venda">
          <B2BCombobox
            options={user?.hook?.data}
            value={salePointHook.salePoint}
            setValue={salePointHook.setSalePoint}
            labelTag="corporateName"
            valueTag="companyId"
            disable={solicitationsHook.locator && solicitationsHook.solicitationSelected === '1'}
          />
        </InputContainer>

        <InputContainer label="Entrada e Saída">
          <B2BDatePicker
            checkIn={dateHook.checkIn}
            setCheckIn={dateHook.setCheckIn}
            checkOut={dateHook.checkOut}
            setCheckOut={dateHook.setCheckOut}
            disable={solicitationsHook.locator && solicitationsHook.solicitationSelected === '1'}
          />
        </InputContainer>

        <InputContainer label="Tipo de Solicitação">
          <B2BCombobox
            options={solicitationsHook.solicitationsTypes}
            value={solicitationsHook.solicitationSelected || solicitationsHook.solicitationsTypes[0].value.toString()}
            setValue={solicitationsHook.setsolicitationSelected}
          />
        </InputContainer>
      </div>

      {solicitationsHook.solicitationSelected === '1' && (
        <div
          className="flex w-full flex-col items-center justify-start gap-10
          lg:flex-row"
        >
          <InputContainer label="Tipo de Data">
            <B2BCombobox
              options={solicitationsHook.dateTypeList}
              value={solicitationsHook.dateType}
              setValue={solicitationsHook.setDateType}
              disable={solicitationsHook.locator && solicitationsHook.solicitationSelected === '1'}
            />
          </InputContainer>

          <InputContainer label="Status">
            <B2BCombobox
              options={solicitationsHook.bookingPolicyTypeList}
              value={solicitationsHook.bookingPolicyType}
              setValue={solicitationsHook.setBookingPolicyType}
              disable={solicitationsHook.locator && solicitationsHook.solicitationSelected === '1'}
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
          />
          <Button
            label="Buscar"
            mergeClass="px-0"
            onClick={handleSearch}
          />
        </div>
      </div>
    </>
  );
}
