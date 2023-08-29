import { Hotels } from '@/classes/availability/DTO/AvailabilityDTO'
import Image from 'next/image'
import { useState } from 'react'
import {
  B2BPopover,
  B2BPopoverContent,
  B2BPopoverTrigger,
} from '@/components/nonInteractiveComponents/Popover'

export default function PolicyPopover({ hotel }: { hotel: Hotels }) {
  const [policyPopover, setPolicyPopover] = useState(false)
  const hasRates = hotel.rates && hotel.rates.length > 0
  return (
    <B2BPopover open={policyPopover} openChange={setPolicyPopover}>
      <B2BPopoverTrigger>
        <button
          type="button"
          onMouseEnter={() => {
            setPolicyPopover(true)
          }}
          onMouseLeave={() => {
            setPolicyPopover(false)
          }}
          className="disabled:opacity-30"
        >
          <div className="relative h-6 w-6">
            <Image fill src="/icons/info.svg" alt="info" />
          </div>
        </button>
      </B2BPopoverTrigger>
      <B2BPopoverContent align="start" classes="max-w-[18rem] sm:max-w-[30rem] lg:max-w-[40rem] xl:max-w-[60rem]">
        <div className="flex flex-col items-start justify-center gap-4">
          <p className="font-bold text-primary">Política da UH</p>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4">
            <div className="flex gap-2">
              <Image
                width={16}
                height={16}
                className="h-auto w-4"
                src="/icons/checkin.svg"
                alt="checkin"
              />
              <p className="text-primary">Check-in: {hotel.checkin}</p>
            </div>
            {hasRates && hotel.rates[0].commissioned && (
              <div className="flex gap-2">
                <Image
                  width={16}
                  height={16}
                  className="h-auto w-4"
                  src="/icons/checkin.svg"
                  alt="checkin"
                />
                <p className="text-primary">Comissionada</p>
              </div>
            )}
            <div className="flex gap-2">
              <Image
                width={16}
                height={16}
                className="h-auto w-4"
                src="/icons/checkout.svg"
                alt="checkout"
              />
              <p className="text-primary">Check-out: {hotel.checkout}</p>
            </div>
            <div className="flex gap-2">
              <Image
                width={16}
                height={16}
                className="h-auto w-4"
                src="/icons/checkin.svg"
                alt="checkin"
              />
              <p className="text-primary">
                Permite cancelamento até {hotel.allowCancelBeforeArrival}h antes
                do check-in
              </p>
            </div>
          </div>
          <div className="mt-2 pt-2">
            <p className="font-bold text-primary">Descrição</p>
            <p className="text-small">{hotel.policy}</p>
          </div>
        </div>
      </B2BPopoverContent>
    </B2BPopover>
  )
}
