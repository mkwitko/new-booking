import { findRateName } from '@/app/(logged)/search/(utils)/Rates'
import { Hotels } from '@/classes/availability/DTO/AvailabilityDTO'
import B2BButton from '@/components/interactiveComponents/Button'
import { fCurrency } from '@/utils/FinanceUtil'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

export default function ListPricing({
  hotel,
  roomIndex = 0,
  rateIndex = 0,
  hasButtons = true,
  mergeClasses = '',
}: {
  hotel: Hotels
  roomIndex?: number
  rateIndex?: number
  hasButtons?: boolean
  mergeClasses?: string;
}) {
    const defaultClasses = 'flex justify-between w-full md:flex-col items-end gap-2';
  return (
    <div className={`${mergeClasses ? twMerge(defaultClasses, mergeClasses) : defaultClasses}`}>
      <div className='flex flex-col'>
        <p className="text-start md:text-end text-small font-normal capitalize text-textSecondary">
          {findRateName(
            hotel,
            hotel.roomTypes[roomIndex].averageRates[rateIndex].rateId,
          ).toLowerCase()}
        </p>
        {hotel.roomTypes[roomIndex].averageRates[rateIndex]
          .totalAmountAfterTax && (
          <p className="text-small md:text-[1rem] font-semibold text-primary">
            {fCurrency(
              hotel.roomTypes[roomIndex].averageRates[rateIndex]
                .totalAmountAfterTax,
            )}
          </p>
        )}
      </div>
      {hasButtons && (
        <div className="flex flex-row-reverse md:flex-row items-center gap-4">
          <button className="relative h-8 w-8" type="button">
            <Image src="/icons/icQuotation.svg" alt="Quotation" fill />
          </button>
          {hotel.roomTypes[roomIndex].availability === 'PUB' ||
          hotel.roomTypes[roomIndex].availability === 'VIP' ? (
            <B2BButton label="Reservar" />
          ) : (
            <B2BButton label="Solicitar" color="outlined" />
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
  )
}
