"use client";

import InputContainer from "@/components/coreComponents/containers/InputContainer";
import Button from "@/components/interactiveComponents/Button";
import { B2BCombobox } from "@/components/interactiveComponents/ComboBox";
import { B2BDatePicker } from "@/components/interactiveComponents/DatePicker";
import { Button as ButtonUI } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoggedContext } from "@/context/LoggedContext";
import { use, useContext, useEffect, useState } from "react";
import PeopleInput from "./components/PeopleInput";
import { SearchContext } from "@/context/SearchContext";
import { Map } from "@/components/interactiveComponents/map/Map";
import MapInfos from "./components/MapInfos";
import { set } from "@/services/cache";
import { CACHE_PATH } from "@/config/cache";

export default function PreSearch({
  hasSearched,
  setHasSearched,
  isSearching,
  setIsSearching,
}: {
  hasSearched: boolean;
  setHasSearched: (bool: boolean) => void;
  isSearching: boolean;
  setIsSearching: (bool: boolean) => void;
}) {
  const [showMap, setShowMap] = useState(false);

  const { user, locale, availability } = useContext(LoggedContext);

  const { salePointHook, cityHook, dateHook, peopleHook, roomsHook, Search } =
    useContext(SearchContext);

  const [salesPoints, setSalesPoints] = useState("");
  const [cities, setCities] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    setSalesPoints(salePointHook.salePoint);
    setCities(cityHook.city);
    setCheckIn(dateHook.checkIn);
    setCheckOut(dateHook.checkOut);
  }, [
    salePointHook.salePoint,
    cityHook.city,
    dateHook.checkIn,
    dateHook.checkOut,
  ]);

  const handleSearch = () => {
    setIsSearching(true);
    Search().then((response: any) => {
      set(CACHE_PATH.FILTER.FILTER);
      availability.hook.setData(response.hotels);
      setIsSearching(false);
      if (response.hotels && response.hotels.length > 0) setHasSearched(true);
    });
  };

  return (
    <>
      <div
        className="flex w-full flex-col gap-4
      xl:flex-row"
      >
        <InputContainer label="Ponto de venda" mergeClass="xl:max-w-[25%]">
          <B2BCombobox
            options={user?.hook.data}
            value={salesPoints}
            setValue={(e) => {
              salePointHook.setSalePoint(e);
            }}
            labelTag="name"
            valueTag="companyId"
          />
        </InputContainer>

        <InputContainer label="Destino" mergeClass="xl:max-w-[25%]">
          <B2BCombobox
            options={locale?.hook.data}
            value={cities}
            setValue={cityHook.setCity}
            labelTag="cityName"
            valueTag="cityId"
          />
        </InputContainer>

        <InputContainer
          label="Data de Entrada e Saída"
          mergeClass="xl:max-w-[25%]"
        >
          <B2BDatePicker
            checkIn={dateHook.checkIn}
            setCheckIn={dateHook.setCheckIn}
            checkOut={dateHook.checkOut}
            setCheckOut={dateHook.setCheckOut}
          />
        </InputContainer>

        <InputContainer label="Pessoas e Quartos" mergeClass="xl:max-w-[25%]">
          <Popover>
            <PopoverTrigger asChild>
              <ButtonUI
                variant="outline"
                role="combobox"
                className="w-full justify-between truncate"
              >
                <p className="w-11/12 truncate text-start text-[0.75rem]">
                  {`${peopleHook.textAdult}, ${peopleHook.textChild}, ${roomsHook.textRoom}`}
                </p>
              </ButtonUI>
            </PopoverTrigger>
            <PopoverContent className="PopoverContent p-4">
              <div className="flex flex-col gap-4">
                <PeopleInput
                  icon="/public/icons/ic-adult.svg"
                  value={peopleHook.adult}
                  set={peopleHook.setAdult}
                  label="Adultos"
                  min={1}
                />
                <PeopleInput
                  icon="/public/icons/ic-child.svg"
                  value={peopleHook.child}
                  set={peopleHook.setChild}
                  label="Crianças"
                  min={0}
                />
                <PeopleInput
                  icon="/public/icons/ic-room.svg"
                  value={roomsHook.rooms}
                  set={roomsHook.setRooms}
                  label="Quartos"
                  min={1}
                />
              </div>
            </PopoverContent>
          </Popover>
        </InputContainer>
      </div>

      {showMap && <Map setShowMap={setShowMap} />}

      <div className="flex w-full items-center justify-between">
        {!showMap && (
          <div className="w-1/4">
            <Button
              mergeClass="w-full xl:w-1/2"
              label="Mapa"
              disabled={isSearching}
              onClick={() => setShowMap(!showMap)}
            />
          </div>
        )}
        {showMap && <MapInfos />}
        <div className="flex w-1/2 items-center justify-end gap-4">
          <Button
            disabled={isSearching}
            label="Limpar"
            textClass="text-textDisabled"
            color="light"
            mergeClass="px-0 w-full xl:w-1/4"
          />
          <Button
            loading={isSearching}
            label="Buscar"
            mergeClass="px-2 w-full md:px-0 xl:w-1/4"
            onClick={handleSearch}
          />
        </div>
      </div>
    </>
  );
}
