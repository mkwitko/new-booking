import { findRateName } from '@/app/(logged)/search/(utils)/Rates';
import { Hotels } from '@/classes/availability/DTO/AvailabilityDTO';
import B2BButton from '@/components/interactiveComponents/Button';
import { fCurrency } from '@/utils/FinanceUtil';
import Image from 'next/image';

export default function ListPricing({
  hotel,
  roomIndex = 0,
  rateIndex = 0,
  hasButtons = true,
}: {
  hotel: Hotels;
  roomIndex?: number;
  rateIndex?: number;
  hasButtons?: boolean;
}) {
  return (
    <div className="flex flex-col items-end gap-2">
      <div>
        <p className="text-small text-end text-textSecondary font-normal capitalize">
          {findRateName(
            hotel,
            hotel.roomTypes[roomIndex].averageRates[rateIndex].rateId
          ).toLowerCase()}
        </p>
        {hotel.roomTypes[roomIndex].averageRates[rateIndex]
          .totalAmountAfterTax && (
          <p className="text-primary text-normal font-semibold">
            {fCurrency(
              hotel.roomTypes[roomIndex].averageRates[rateIndex]
                .totalAmountAfterTax
            )}
          </p>
        )}
      </div>
      {hasButtons && (
        <div className="flex gap-4 items-center">
          <button
            className="w-8 h-8 relative"
            type="button"
          >
            <Image
              src="/icons/icQuotation.svg"
              alt="Quotation"
              fill
            />
          </button>
          {hotel.roomTypes[roomIndex].availability === 'PUB' ||
          hotel.roomTypes[roomIndex].availability === 'VIP' ? (
            <B2BButton label="Reservar" />
          ) : (
            <B2BButton
              label="Solicitar"
              color="outlined"
            />
          )}
        </div>
      )}
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
