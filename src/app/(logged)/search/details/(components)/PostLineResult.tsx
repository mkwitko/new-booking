/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { GiPerson } from "react-icons/gi";
import { getAmenityValue } from "../(data)/amenities";
import B2BButton from "@/components/interactiveComponents/Button";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useContext, useState } from "react";
import { fCurrency } from "@/utils/FinanceUtil";
import { findRateName } from "../../(utils)/Rates";
import {
  AverageRates,
  Hotels,
} from "@/classes/availability/DTO/AvailabilityDTO";
import MealPopover from "../../(sections)/Results/PostResult/(components)/(popovers)/MealPopover";
import Link from "next/link";
import { LoggedContext } from "@/context/LoggedContext";

export default function PostLineResult({
  hotel,
  room,
  roomIndex,
}: {
  hotel: Hotels;
  room: any;
  roomIndex: number;
}) {
  const { hotels } = useContext(LoggedContext);
  const [displayAllOption, setDisplayAllOption] = useState(false);

  console.log("room - ", room);

  return (
    <div
      className="flex w-full flex-col items-center rounded-b2b border border-borderColor/20 bg-white px-6 py-4"
      key={room.roomTypeId}
    >
      <div className="flex w-full items-center justify-between border-b border-borderColor/20 pb-4">
        <div className="flex items-start gap-4">
          <figure className="h-[4.5rem] w-20 rounded-md shadow-sm">
            <img
              src={`${process.env.NEXT_PUBLIC_HOTEL_UH_IMAGES_URL}${room.imagesFileNames[0]}`}
              alt=""
              className="h-full w-full rounded-md object-cover"
            />
          </figure>

          <div className="flex h-full flex-col justify-between gap-4">
            <div className="flex items-center gap-2 divide-x divide-borderColor/20">
              <span className="font-semibold capitalize text-primary">
                {room.description.toLowerCase()}
              </span>

              <div className="flex items-center gap-2 pl-2">
                <GiPerson className="h-4 w-4  text-primary md:h-5 md:w-5" />
                <p className="text-xs">{room.maxOccupancy}</p>
              </div>
            </div>

            <div className="flex items-center justify-start gap-2">
              {room.amenities.map((item: any) => {
                const currentAmentity = getAmenityValue(item);
                if (!currentAmentity || !currentAmentity.imagePath) return null;
                return (
                  <figure
                    className="flex items-center gap-2"
                    key={currentAmentity?.amenity_id}
                  >
                    <Image
                      src={currentAmentity.imagePath || ""}
                      alt={currentAmentity.name}
                      width={24}
                      height={24}
                      title={currentAmentity.description}
                    />
                  </figure>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs uppercase text-textSecondary">
            {findRateName(hotel, room.averageRates[0].rateId)}
          </span>
          <span className="font-semibold text-primary">
            {fCurrency(room.averageRates[0].totalAmountAfterTax)}
          </span>

          <div className="mt-2">
            <Link
              href={{
                pathname: "/search/new",
              }}
            >
              <B2BButton
                onClick={() => {
                  hotels.hook.handleSetCurrentHotel(hotel);
                }}
                color="primary"
                label="Reservar"
              />
            </Link>
          </div>
        </div>
      </div>

      {displayAllOption &&
        room.averageRates.map((item: AverageRates, index: number) => {
          const rateIndex = hotel.rates.findIndex((e: any) => {
            return e.id === item.rateId;
          });
          return (
            <div
              className="flex w-full items-center justify-between py-4"
              key={item.rateId}
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-start gap-2">
                  <span className="block font-semibold text-primary">
                    {findRateName(hotel, item.rateId)}
                  </span>

                  <HelpCircle size={14} />
                </div>

                <div className="mt-2 flex flex-col items-start">
                  <span className="text-xs text-textSecondary">
                    {fCurrency(item.totalTaxes)} em impostos e taxas
                  </span>
                  <span className="text-xs text-textSecondary">
                    {fCurrency(item.amountBeforeTax)} por diára
                  </span>
                </div>

                <div className="mt-2">
                  <MealPopover hotel={hotel} mealTitle rateIndex={rateIndex} />
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-xs uppercase text-textSecondary">
                  {findRateName(hotel, item.rateId)}
                </span>
                <span className="font-semibold text-primary">
                  {fCurrency(item.totalAmountAfterTax)}
                </span>

                <div className="mt-2">
                  <Link
                    href={{
                      pathname: "/search/new",
                    }}
                  >
                    <B2BButton
                      onClick={() => {
                        hotels.hook.handleSetCurrentHotel(
                          hotel,
                          roomIndex,
                          index,
                        );
                      }}
                      color="primary"
                      label="Reservar"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

      <button
        className="mt-2 flex items-center gap-2 border-none bg-transparent"
        onClick={() => setDisplayAllOption(!displayAllOption)}
      >
        <span className="text-xs font-semibold uppercase text-primary">
          {displayAllOption ? "Menos Tarifas" : "Mais Tarifas"}
        </span>

        <ChevronDown
          data-opened={displayAllOption}
          size={18}
          className="stroke-primary data-[opened=true]:rotate-180"
        />
      </button>
    </div>
  );
}
