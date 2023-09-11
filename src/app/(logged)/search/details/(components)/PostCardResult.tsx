"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { GiPerson } from "react-icons/gi";
import { getAmenityValue } from "../(data)/amenities";
import { HelpCircleIcon } from "lucide-react";
import B2BButton from "@/components/interactiveComponents/Button";
import TaxesDialog from "./TaxesDialog";

import * as FormComponents from "@/components/formComponents";
import { useContext, useState } from "react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { fCurrency } from "@/utils/FinanceUtil";
import {
  AverageRates,
  Hotels,
} from "@/classes/availability/DTO/AvailabilityDTO";
import { LoggedContext } from "@/context/LoggedContext";
import Link from "next/link";
import AmountBeforeTax from "../../(components)/(finance)/AmountBeforeTax";
import TotalAmountAfterTax from "../../(components)/(finance)/TotalAmountAfterTax";
import TotalTaxes from "../../(components)/(finance)/TotalTaxes";
import TextLimmiter from "@/components/text/TextLimitter";
import { findRateName } from "../../(utils)/Rates";

export default function PostResultCard({
  hotel,
  room,
  roomIndex,
}: {
  hotel: Hotels;
  room: any;
  roomIndex: number;
}) {
  const { hotels } = useContext(LoggedContext);
  const [selectedTax, setSelectedTax] = useState<any | null>(null);
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 16,
    },
  });

  function verifyIfIsChecked(rateId: number) {
    if (!selectedTax) return false;
    return rateId === selectedTax;
  }

  const showTaxesDialog = room.averageRates.length > 3;

  return (
    <div
      key={room.id}
      className="flex h-[35rem] flex-col justify-around rounded-b2b border border-borderColor/20 bg-white p-6"
    >
      <figure
        ref={sliderRef}
        className="keen-slider z-20 mb-6 aspect-[2.144/1] rounded-b2b object-cover"
      >
        {room.imagesFileNames.map((image: any) => (
          <img
            key={image}
            src={`${process.env.NEXT_PUBLIC_HOTEL_UH_IMAGES_URL}${image}`}
            alt=""
            className="keen-slider__slide w-full rounded-b2b object-cover"
          />
        ))}
      </figure>

      <div className="flex flex-col items-start border-b border-borderColor/20">
        <TextLimmiter
          className="flex flex-col items-start text-start font-semibold capitalize text-primary"
          length={50}
        >
          {room.description.toLowerCase()}
        </TextLimmiter>

        <div className="my-2 flex w-full items-center justify-start">
          <div className="flex items-center border-r border-borderColor/20 pr-2">
            <GiPerson className="h-4 w-4  text-primary md:h-5 md:w-5" />
            <p className="text-xs">{room.maxOccupancy}</p>
          </div>

          <div className="ml-2 flex w-full items-center justify-start gap-2">
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

      <div className="flex w-full flex-col divide-y divide-borderColor/20">
        {room.averageRates
          .map((rate: AverageRates, rateIndex: number) => (
            <div
              key={rate.rateId}
              className="flex w-full items-center justify-between py-2"
            >
              <div className="pr-2">
                <FormComponents.Checkbox
                  className="h-3 w-3"
                  checked={verifyIfIsChecked(rate.rateId)}
                  onChange={() => setSelectedTax(rate.rateId)}
                />
              </div>

              <div className="w-full">
                <div className="flex items-center justify-start gap-2">
                  <span className="text-small font-[600] text-primary">
                    {findRateName(hotel, rate.rateId)}
                  </span>

                  <HelpCircleIcon className="text-primary" size={16} />
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <div className="flex flex-col items-start">
                    <TotalTaxes
                      hotel={hotel}
                      roomIndex={roomIndex}
                      rateIndex={rateIndex}
                    />
                    <AmountBeforeTax
                      hotel={hotel}
                      roomIndex={roomIndex}
                      rateIndex={rateIndex}
                    />
                  </div>

                  <div className="ml-auto">
                    <TotalAmountAfterTax
                      hotel={hotel}
                      roomIndex={roomIndex}
                      rateIndex={rateIndex}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
          .filter((each: any, index: number) => index < 3)}
      </div>

      <div className="mt-4 flex w-full flex-col gap-2">
        {showTaxesDialog ? (
          <TaxesDialog taxes={room.averageRates}>
            <B2BButton label="VER MAIS TARIFAS" color="light" />
          </TaxesDialog>
        ) : (
          <B2BButton label="VER MAIS TARIFAS" color="disabled" disabled />
        )}

        <Link
          href={{
            pathname: "/search/new",
          }}
        >
          <B2BButton
            onClick={() => {
              const rateIndex = room.averageRates.findIndex(
                (e: AverageRates) => {
                  return e.rateId === selectedTax;
                },
              );
              hotels.hook.handleSetCurrentHotel(hotel, roomIndex, rateIndex);
            }}
            label="RESERVAR"
            disabled={!!!selectedTax}
          />
        </Link>
      </div>
    </div>
  );
}
