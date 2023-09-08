'use client'

/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { GiPerson } from "react-icons/gi";
import { getAmenityValue } from "../(data)/amenities";
import { HelpCircleIcon } from 'lucide-react';
import B2BButton from '@/components/interactiveComponents/Button';
import TaxesDialog from "./TaxesDialog";

import * as FormComponents from '@/components/formComponents'
import { useState } from 'react';

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

export default function PostResultCard({ room }: { room: any }) {

  const [selectedTax, setSelectedTax] = useState<any | null>(null)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 16,
    }
  })

  const brazilianCurrencyFormatter = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  })

  function verifyIfIsChecked(tax: any) {
    if (!selectedTax) return false
    return tax.rateId === selectedTax.rateId
  }

  const showTaxesDialog = room.averageRates.length > 3

  return (
    <div key={room.id} className="p-4 rounded-lg shadow-sm border border-borderColor/20">
      <figure ref={sliderRef} className='keen-slider w-full h-[15rem]'>
        {room.imagesFileNames.map((image: any) => (
          <img 
            key={image}
            src={`${process.env.NEXT_PUBLIC_HOTEL_UH_IMAGES_URL}${image}`}
            alt=""
            className="w-full rounded-lg object-cover keen-slider__slide"
          />
        ))}
      </figure>

      <div className="flex flex-col items-start py-2 border-b border-borderColor/20">
        <span className="text-primary font-semibold">{room.description}</span>

        <div className="w-full flex items-center justify-start my-2">
          <div className="flex items-center pr-2 border-r border-borderColor/20">
            <GiPerson className="h-4 w-4  md:h-5 md:w-5 text-primary" />
            <p className="text-xs">{room.maxOccupancy}</p>
          </div>

          <div className='gap-2 flex items-center justify-start w-full ml-2'>
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

      <div className="w-full flex flex-col divide-y divide-borderColor/20">
          {room.averageRates.map((rate:any) => (
            <div key={rate.rateId} className="py-2 flex items-center justify-between w-full">
              <div className='pr-2'>
                <FormComponents.Checkbox className='w-3 h-3' checked={verifyIfIsChecked(rate)} onChange={() => setSelectedTax(rate)} />
              </div>

              <div className="w-full">
                <div className="flex items-center justify-start gap-2">
                  <span className="text-xs uppercase text-primary">Tarifa</span>

                  <HelpCircleIcon className="text-primary" size={16} />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-col items-start">
                    <p className="text-xs text-textSecondary">{brazilianCurrencyFormatter.format(rate.totalTaxes)} em impostos e taxas</p>
                    <p className="text-xs text-textSecondary">{brazilianCurrencyFormatter.format(rate.amountBeforeTax)} por diária</p >
                  </div>

                  <div className="ml-auto">
                    <span className="text-primary font-semibold">{brazilianCurrencyFormatter.format(rate.totalAmountAfterTax)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className='w-full flex flex-col gap-2'>
        {showTaxesDialog ? (
          <TaxesDialog taxes={room.averageRates}>
            <B2BButton label='VER MAIS TARIFAS' buttonType='button' color='disabled' />
          </TaxesDialog>
        ) : (
            <B2BButton label='VER MAIS TARIFAS' buttonType='button' color='disabled' disabled />
        )}

        <B2BButton label='RESERVAR' buttonType='button' color='primary' disabled={!!!selectedTax} />
      </div>
    </div>
  );
}
