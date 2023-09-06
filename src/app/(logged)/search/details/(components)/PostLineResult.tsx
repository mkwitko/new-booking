/* eslint-disable @next/next/no-img-element */
'use client'

import Image from 'next/image'
import { GiPerson } from "react-icons/gi"
import { getAmenityValue } from "../(data)/amenities"
import B2BButton from '@/components/interactiveComponents/Button'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'

export default function PostLineResult({ room }: { room: any }) {

  const [displayAllOption, setDisplayAllOption] = useState(false)
  const brazilianCurrencyFormatter = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  })

  return (
    <div className="w-full px-6 py-4 rounded-lg border border-borderColor/20 flex flex-col items-center" key={room.roomTypeId}>
      <div className="w-full flex items-center justify-between pb-4 border-b border-borderColor/20">
        <div className="flex items-start gap-4">
          <figure className="h-[4.5rem] w-20 rounded-md shadow-sm">
            <img 
              src={`${process.env.NEXT_PUBLIC_HOTEL_UH_IMAGES_URL}${room.imagesFileNames[0]}`}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </figure>

          <div className="flex flex-col justify-between h-full gap-4">
            <div className="flex items-center gap-2 divide-x divide-borderColor/20">
              <span className="text-primary font-semibold">{room.description}</span>

              <div className="flex items-center pl-2 gap-2">
                <GiPerson className="h-4 w-4  md:h-5 md:w-5 text-primary" />
                <p className="text-xs">{room.maxOccupancy}</p>
              </div>
            </div>

            <div className="flex items-center justify-start gap-2">
              {room.amenities.map((item: any) => {
                const currentAmentity = getAmenityValue(item)
                if (!currentAmentity || !currentAmentity.imagePath) return null
                return (
                  <figure className="flex items-center gap-2" key={currentAmentity?.amenity_id}>
                    <Image
                      src={currentAmentity.imagePath || ''}
                      alt={currentAmentity.name}
                      width={24}
                      height={24}
                      title={currentAmentity.description}
                    />
                  </figure>
                )})}
            </div>
          </div>
        </div>

        <div className='flex flex-col items-end'>
          <span className='uppercase text-textSecondary text-xs'>Tarifa</span>
          <span className='text-primary font-semibold'>{brazilianCurrencyFormatter.format(room.averageRates[0].totalAmountAfterTax)}</span>

          <div className='mt-2'>
            <B2BButton label='RESERVAR' color='primary' />
          </div>
        </div>
      </div>

      {displayAllOption && room.averageRates.map((item:any, index:number) => {
        if (index === 0) return null
        return (
          <div className='w-full flex items-center justify-between py-4' key={item.rateId}>
            <div className='flex flex-col items-start'>
              <div className='flex items-center justify-start gap-2'>
                <span className='block text-primary font-semibold'>Tarifa</span>

                <HelpCircle size={14} />
              </div>

              <div className='flex flex-col items-start mt-2'>
                <span className='text-textSecondary text-xs'>{brazilianCurrencyFormatter.format(item.totalTaxes)} em impostos e taxas</span>
                <span className='text-textSecondary text-xs'>{brazilianCurrencyFormatter.format(item.amountBeforeTax)} por diára</span>
              </div>
            </div>

            <div className='flex flex-col items-end'>
              <span className='uppercase text-textSecondary text-xs'>Tarifa</span>
              <span className='text-primary font-semibold'>{brazilianCurrencyFormatter.format(item.totalAmountAfterTax)}</span>

              <div className='mt-2'>
                <B2BButton label='RESERVAR' color='primary' />
              </div>
            </div>
          </div>
        )
      }
      )}

      <button className='border-none bg-transparent flex items-center gap-2 mt-2' onClick={() => setDisplayAllOption(!displayAllOption)}>
        <span className='text-primary font-semibold uppercase text-xs'>{displayAllOption ? 'Menos Tarifas' : 'Mais Tarifas'}</span>

        <ChevronDown data-opened={displayAllOption} size={18} className='stroke-primary data-[opened=true]:rotate-180' />
      </button>
    </div>
  )
}