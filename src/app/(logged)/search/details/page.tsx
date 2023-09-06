/* eslint-disable @next/next/no-img-element */
'use client'

import Image from "next/image";
import Link from "next/link";

import { useHotelDetails } from "./(hook)/useHotelDetails";

import { GiPerson } from "react-icons/gi";
import { ChevronLeft } from "lucide-react";
import { BiSolidBed } from "react-icons/bi";
import * as GeneralIcons from '@/assets/b2b/general-icons/general-icons'

import { StarRating } from "../../search/[id]/(components)/StarRating";

import { getAmenityValue } from "./(data)/amenities";

import PostCardResult from "./(components)/PostCardResult";
import PostLineResult from "./(components)/PostLineResult";
import CardDate from "../../search/(sections)/Search/PostSearch/components/CardDate";
import CardsPopover from "../../search/(sections)/Results/PostResult/(components)/(popovers)/CardsPopover";

import { HotelDetailsSkeleton } from "./(skeleton)";

import 'keen-slider/keen-slider.min.css'

export default function Page() {

 const { 
  dateHook,
  peopleHook,
  roomsHook,
  activeThumbnail, 
  cardShowing, 
  currentHotel, 
  hotelDetails, 
  hotelImages, 
  hotelWebSite, 
  setActiveThumbnail, 
  setCardShowing, 
  sliderRef, 
  thumbnailRef 
} = useHotelDetails()

  return hotelDetails ? (
    <>
      <div className="flex items-center justify-center bg-textPrimary h-[23rem]">
        <figure ref={sliderRef} className="w-full max-w-[964px] h-[23rem] keen-slider">
          {hotelImages && hotelImages.map((image: any) => (
            <img key={image.name} src={`${process.env.NEXT_PUBLIC_HOTEL_IMAGES_URL}${image.name}`} alt="" className="w-full h-full object-cover keen-slider__slide" />
          ))}
        </figure>
      </div>

      <div ref={thumbnailRef} className="keen-slider w-full max-w-[964px] mx-auto -mt-10">
        {hotelImages && hotelImages.map((image: any) => (
          <img 
            key={image.name} 
            src={`${process.env.NEXT_PUBLIC_HOTEL_IMAGES_URL}${image.name}`} 
            alt="" 
            data-active={activeThumbnail === image.name}
            onClick={() => setActiveThumbnail(image.name)}
            className="h-[4rem] object-cover keen-slider__slide rounded-md cursor-pointer mt-4 data-[active=true]:border data-[active=true]:border-white data-[active=true]:mt-0 data-[active=true]:duration-300" 
          />
        ))}
      </div>

      <section className="flex flex-col items-start w-full max-w-[996px] px-4 mx-auto py-10">
        <div className="flex-wrap flex items-center justify-start gap-2">
          <div className="flex items-center justify-start gap-2">
            <Link className="flex items-center justify-center w-8" href="/">
              <ChevronLeft className="text-primary" size={32} />
            </Link>
            <span className="text-primary font-semibold text-lg md:text-2xl uppercase block">{hotelDetails.socialName}</span>
          </div>


          <StarRating className="ml-10 md:m-0"/>
        </div>

        <div className="flex items-center justify-start gap-2 ml-10 mb-2">
          {hotelWebSite && (
            <span className="text-xs text-primary">{hotelWebSite.url}</span>
          )}
        </div>

        <div className="pt-2 pb-6  w-full flex flex-col gap-4 border-y border-borderColor/20">
          <div className="flex flex-col items-start md:flex-row w-full md:items-center justify-start gap-7">
            <div className="flex items-center justify-start gap-2">
              <Image 
                src={GeneralIcons.mail}
                alt="Ícone de e-mail"
                width={24}
                height={24}
              />

              <span className="text-xs text-textSecondary">{hotelDetails.mail}</span>
            </div>

            <div className="flex items-center justify-start gap-2">
            <Image 
                src={GeneralIcons.phone}
                alt="Ícone de e-mail"
                width={24}
                height={24}
              />

              <span className="text-xs text-textSecondary">{hotelDetails.phone}</span>
            </div>

            <div className="flex items-center justify-start gap-2">
            <Image 
                src={GeneralIcons.location}
                alt="Ícone de e-mail"
                width={24}
                height={24}
              />

              <span className="text-xs text-textSecondary">{hotelDetails.address.addressLine}, {hotelDetails.address.district}</span>
            </div>

            <CardsPopover hotel={currentHotel} />
          </div>

          <div className="flex items-start flex-col gap-4">
            <span className="block uppercase font-semibold text-primary">O Hotel Oferece</span>
          </div>

          <div className="flex items-start gap-4 flex-wrap">
            {hotelDetails.amenityNames.map((item: string) => {
              const currentAmentity = getAmenityValue(item)
              if (!currentAmentity || !currentAmentity.imagePath) return null
              return (
                (
                  <div className="flex items-center justify-start gap-2" key={currentAmentity?.amenity_id}>
                    <Image 
                      src={currentAmentity.imagePath || ''}
                      alt={currentAmentity.name}
                      width={24}
                      height={24}
                    />

                    <span className="text-textSecondary text-xs">{currentAmentity.description}</span>
                  </div>
                )
              )
            })}
          </div>
        </div>

        <span className="text-primary uppercase font-semibold block pt-2">Unidades disponíveis para sua pesquisa</span>

        <div className="w-full flex items-center justify-start py-4 gap-4">
            <div
              className="mr-2 flex w-full min-w-[6.5rem] rounded-b2b
              border border-borderColor/20 md:mr-0 md:max-w-[8.5rem]"
            >
              <CardDate
                day={dateHook?.checkInDay}
                month={dateHook?.checkInMonth || 'Set'}
                weekDay={dateHook?.checkInWeekDay || 'seg'}
                index="left"
              />
              <CardDate
                day={dateHook?.checkInDay || new Date().getDate()}
                month={dateHook?.checkInMonth || 'Set'}
                weekDay={dateHook?.checkInWeekDay || 'seg'}
                index="right"
              />
            </div>

          <div
            className="flex flex-wrap items-center justify-center gap-4 text-small
      text-primary md:justify-start md:text-[1rem]"
          >
            <div className="flex items-center gap-2">
              <BiSolidBed className="h-4 w-4  md:h-5 md:w-5" />
              <p>{roomsHook?.textRoom || '1 Quarto'}</p>
            </div>
            <div className="flex items-center gap-2">
              <GiPerson className="h-4 w-4  md:h-5 md:w-5" />
              <p>{peopleHook?.textAdult || '1 Pessoa'}</p>
            </div>
          </div>

          <button
            onClick={() => setCardShowing(!cardShowing)}
            type="button"
            className="hidden md:block md:ml-auto"
          >
            <div className="relative h-4 w-4 md:h-6 md:w-6">
              <Image
                fill
                src={`/icons${
                  !cardShowing ? "/viewList.svg" : "/viewCard.svg"
                }`}
                alt="Change between card and list view"
              />
            </div>
          </button>
        </div>

        <div data-list={!cardShowing} className="w-full grid grid-cols-1 md:grid-cols-2 data-[list=true]:grid-cols-1 gap-8 mt-4">
          {currentHotel.roomTypes.map((item: any) => {
            if (item.availability === 'NON') return null
            return cardShowing ? (
              <PostCardResult room={item} key={item.roomTypeId} />
            ) : (
              <PostLineResult room={item} key={item.roomTypeId} />
            )
          })}
        </div>
      </section>
    </>
  ) : <HotelDetailsSkeleton />
}