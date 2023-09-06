import { findRateName } from "@/app/(logged)/search/(utils)/Rates";
import { Hotels } from "@/classes/availability/DTO/AvailabilityDTO";
import B2BButton from "@/components/interactiveComponents/Button";
import { SearchContext } from "@/context/SearchContext";
import { fCurrency } from "@/utils/FinanceUtil";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { BiSolidAddToQueue } from "react-icons/bi";
import { MdOutlinePlaylistRemove } from "react-icons/md";
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
  const { hotelHook, quotationHook } = useContext(SearchContext);
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
          <button
            type="button"
            onClick={() => {
              quotationHook.handleAddQuotation(hotel, roomIndex, rateIndex);
            }}
          >
            {quotationHook.findQuotation(hotel, roomIndex, rateIndex) ? (
              <MdOutlinePlaylistRemove size={24} className="text-primary" />
            ) : (
              <BiSolidAddToQueue size={24} className="text-primary" />
            )}
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
