import { findRateName } from "@/app/(logged)/search/(utils)/Rates";
import { Hotels } from "@/classes/availability/DTO/AvailabilityDTO";
import B2BButton from "@/components/interactiveComponents/Button";
import { SearchContext } from "@/context/SearchContext";
import { fCurrency } from "@/utils/FinanceUtil";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";

export default function ListPricing({
  hotel,
  roomIndex = 0,
  rateIndex = 0,
  hasButtons = true,
  mergeClasses = "",
}: {
  hotel: Hotels;
  roomIndex?: number;
  rateIndex?: number;
  hasButtons?: boolean;
  mergeClasses?: string;
}) {
  const defaultClasses =
    "flex justify-between w-full md:flex-col items-end gap-2";
  const { hotelHook } = useContext(SearchContext);
  return (
    <div
      className={`${
        mergeClasses ? twMerge(defaultClasses, mergeClasses) : defaultClasses
      }`}
    >
      <div className="flex flex-col">
        <p className="text-start text-small font-normal capitalize text-textSecondary md:text-end">
          {findRateName(
            hotel,
            hotel.roomTypes[roomIndex].averageRates[rateIndex].rateId,
          ).toLowerCase()}
        </p>
        {hotel.roomTypes[roomIndex].averageRates[rateIndex]
          .totalAmountAfterTax && (
          <p className="text-small font-semibold text-primary md:text-[1rem]">
            {fCurrency(
              hotel.roomTypes[roomIndex].averageRates[rateIndex]
                .totalAmountAfterTax,
            )}
          </p>
        )}
      </div>
      {hasButtons && (
        <div className="flex flex-row-reverse items-center gap-4 md:flex-row">
          <button className="relative h-8 w-8" type="button">
            <Image src="/icons/icQuotation.svg" alt="Quotation" fill />
          </button>
          {hotel.roomTypes[roomIndex].availability === "PUB" ||
          hotel.roomTypes[roomIndex].availability === "VIP" ? (
            <Link href="/search/new">
              <B2BButton
                onClick={() => {
                  hotelHook.handleSetCurrentHotel(hotel, roomIndex, rateIndex);
                }}
                label="Reservar"
              />
            </Link>
          ) : (
            <B2BButton label="Solicitar" color="outlined" />
          )}
        </div>
      )}
      {/* TODO adicionar variação de moeda estrangeira */}
      {/* {currencyRates && (
      <p className="text-small">
        {fCurrency(
          hotel.roomTypes[roomIndex].averageRates[rateIndex].totalAmountAfterTaxBase,
          rate?.currencyCode
        )}
      </p>
    )} */}
    </div>
  );
}
