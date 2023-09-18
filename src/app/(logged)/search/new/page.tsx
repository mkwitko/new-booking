"use client";

import Container from "@/components/coreComponents/containers/Container";
import WhiteBox from "@/components/coreComponents/containers/WhiteBox";
import Title from "@/components/text/Title";

import { AiFillInfoCircle } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { ReserveForm } from "./(components)/ReserveForm";
import { useContext, useState } from "react";
import { SearchContext } from "@/context/SearchContext";
import {
  AverageRates,
  Hotels,
} from "@/classes/availability/DTO/AvailabilityDTO";
import { differenceInDays, format } from "date-fns";
import { BiSolidBed } from "react-icons/bi";
import { GiPerson } from "react-icons/gi";
import { fCurrency } from "@/utils/FinanceUtil";
import Taxes from "../(sections)/Results/PostResult/(components)/(list)/Taxes";
import { Checkbox } from "@/components/formComponents";
import { GeneralB2BDatePicker } from "@/components/interactiveComponents/GeneralDatePicker.tsx/GeneralDatePicker";
import CardDate from "../(sections)/Search/PostSearch/components/CardDate";
import { LoggedContext } from "@/context/LoggedContext";
import { StarRating } from "@/components/nonInteractiveComponents/StarRating";

export default function Reserves() {
  const { hotels, availability } = useContext(LoggedContext);
  const { dateHook, peopleHook, roomsHook, Search } = useContext(SearchContext);
  const currentHotel: Hotels = hotels.hook.currentHotel;
  const { currentApartamentIndex, currentRateIndex } = hotels.hook;

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [seeMoreTaxes, setSeeMoreTaxes] = useState(false);

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (checkIn: any, checkOut: any) => {
    setIsSearching(true);
    Search(checkIn, checkOut).then((response: any) => {
      availability.hook.setData(response.hotels);
      const currentHotelUpdated = response.hotels.find(
        (e: Hotels) => e.hotelAlphaId === currentHotel.hotelAlphaId,
      );
      hotels.hook.setCurrentHotel(currentHotelUpdated);
      setIsSearching(false);
    });
  };

  const howManyDays = differenceInDays(dateHook.checkOut, dateHook.checkIn);

  return (
    <Container classes="gap-4">
      <Title title="Nova Reserva" />
      {currentHotel && (
        <WhiteBox classes="gap-4 lg:gap-6">
          <div className="space-y-px">
            <div className="flex flex-col-reverse items-start justify-start gap-2 md:flex-row md:items-center md:gap-4">
              <h3 className="text-lg font-semibold uppercase text-primary-500 md:text-2xl">
                {currentHotel.name}
              </h3>

              {/* TODO preencher estrelas - Alterar backend para retornar um número de estrelas invés de string */}
              <StarRating />
            </div>
            <address className="text-xs capitalize not-italic">
              {currentHotel.location.address.toLowerCase()},
              {` ${currentHotel.location.neighborhood.toLowerCase()}`}
            </address>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-start gap-2 divide-x divide-borderColor/20">
              <span className="text-xs font-semibold capitalize text-primary-500 md:text-base">
                {currentHotel.roomTypes[
                  currentApartamentIndex
                ].description.toLowerCase()}
              </span>
              <span className="pl-2 text-xs">
                {currentHotel.roomTypes[currentApartamentIndex].maxOccupancy}{" "}
                ocupantes
              </span>
            </div>
            <span className="text-xs leading-tight">
              Essa reserva pode ser cancelada até:{" "}
              {format(
                new Date(currentHotel.cancelBeforeArrivalDeadline),
                "dd/MM/yyyy 'às' HH:mm",
              )}
            </span>
          </div>

          <div
            className="flex w-full flex-row
      items-center
      gap-8"
          >
            <GeneralB2BDatePicker
              checkIn={dateHook.checkIn}
              checkOut={dateHook.checkOut}
              setCheckIn={dateHook.setCheckIn}
              setCheckOut={dateHook.setCheckOut}
              className="cursor-pointer"
              open={openDatePicker}
              onChange={(e) => {
                if (e.to && e.from) {
                  handleSearch(e.from, e.to);
                  setOpenDatePicker(false);
                }
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setOpenDatePicker(!openDatePicker);
                }}
                className="mr-2 flex w-full min-w-[6.5rem] rounded-b2b
        border border-borderColor/20 md:mr-0 md:max-w-[8.5rem]"
              >
                <CardDate
                  day={dateHook.checkInDay}
                  month={dateHook.checkInMonth}
                  weekDay={dateHook.checkInWeekDay}
                  index="left"
                />
                <CardDate
                  day={dateHook.checkOutDay}
                  month={dateHook.checkOutMonth}
                  weekDay={dateHook.checkOutWeekDay}
                  index="right"
                />
              </button>
            </GeneralB2BDatePicker>

            <div
              className="flex flex-wrap items-center justify-center gap-4 text-small
      text-primary md:justify-start md:text-[1rem]"
            >
              <div className="flex items-center gap-2">
                <BiSolidBed className="h-4 w-4  md:h-5 md:w-5" />
                <p>{roomsHook.textRoom}</p>
              </div>
              <div className="flex items-center gap-2">
                <GiPerson className="h-4 w-4  md:h-5 md:w-5" />
                <p>{peopleHook.textAdult}</p>
              </div>
            </div>
          </div>

          {isSearching ? (
            <div className="w-full max-w-[15rem]">
              <div className="flex animate-pulse space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 rounded bg-primary/30"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-primary/30"></div>
                      <div className="col-span-1 h-2 rounded bg-primary/30"></div>
                    </div>
                    <div className="h-2 rounded bg-primary/30"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-2 py-2">
                <div>
                  <span className="block font-semibold text-primary">
                    {fCurrency(
                      currentHotel.roomTypes[currentApartamentIndex]
                        .averageRates[currentRateIndex].totalAmountAfterTax,
                    )}
                  </span>
                  {/* TODO adicionar conversão da moeda */}
                  {/* <span className="block text-xs text-textSecondary">
                  ARS 81.200,00
                </span> */}
                </div>

                <AiFillInfoCircle className="w-5 cursor-pointer text-primary-500" />
              </div>

              <div className="flex w-full flex-col md:flex-row md:items-end md:justify-between">
                <div className="text-xs leading-relaxed text-textSecondary">
                  <p>
                    {howManyDays} {howManyDays > 1 ? "Pernoites" : "Pernoite"}
                  </p>
                  <p>
                    Diária média de{" "}
                    {fCurrency(
                      currentHotel.roomTypes[currentApartamentIndex]
                        .averageRates[currentRateIndex].amountBeforeTax,
                    )}
                  </p>
                  <p>
                    {fCurrency(
                      currentHotel.roomTypes[currentApartamentIndex]
                        .averageRates[currentRateIndex].totalTaxes,
                    )}{" "}
                    em impostos e taxas
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSeeMoreTaxes(!seeMoreTaxes);
                  }}
                  className="mx-auto mt-4 flex items-center gap-2 text-primary-500
                md:mx-0 md:ml-auto  md:mt-0"
                >
                  <BsChevronDown
                    className={`${
                      seeMoreTaxes ? "rotate-180" : "rotate-0"
                    } w-5 transition-all duration-300 ease-in-out`}
                  />
                  <span className="text-xs font-bold uppercase">
                    {`Ver ${seeMoreTaxes ? "menos" : "mais"} Tarifas`}
                  </span>
                </button>
              </div>
            </div>
          )}

          {seeMoreTaxes && (
            <div className="flex w-full flex-col gap-4">
              {currentHotel.roomTypes[currentApartamentIndex].averageRates.map(
                (e: AverageRates, i: number) => (
                  <div
                    key={e.rateId}
                    className="flex items-start gap-4 md:gap-0"
                  >
                    <Checkbox
                      checked={currentRateIndex === i}
                      onChange={() => {
                        hotels.hook.setCurrentRateIndex(i);
                      }}
                    />
                    <Taxes
                      hotel={currentHotel}
                      roomIndex={currentApartamentIndex}
                      rateIndex={i}
                      hasButtons={false}
                    />
                  </div>
                ),
              )}
            </div>
          )}
        </WhiteBox>
      )}

      <ReserveForm />
    </Container>
  );
}
