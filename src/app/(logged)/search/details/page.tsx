/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";

import { useHotelDetails } from "./(hook)/useHotelDetails";

import { GiPerson } from "react-icons/gi";
import { ChevronLeft } from "lucide-react";
import { BiSolidBed } from "react-icons/bi";
import * as GeneralIcons from "@/assets/b2b/general-icons/general-icons";

import { getAmenityValue } from "./(data)/amenities";

import PostCardResult from "./(components)/PostCardResult";
import PostLineResult from "./(components)/PostLineResult";
import CardDate from "../../search/(sections)/Search/PostSearch/components/CardDate";
import CardsPopover from "../../search/(sections)/Results/PostResult/(components)/(popovers)/CardsPopover";

import { HotelDetailsSkeleton } from "./(skeleton)";

import "keen-slider/keen-slider.min.css";
import { StarRating } from "@/components/nonInteractiveComponents/StarRating";
import { SearchContext } from "@/context/SearchContext";
import { useContext } from "react";
import { useKeenSlider } from "./(hook)/useKeenSlider";

export default function Page() {
  const {
    hotels,
    activeThumbnail,
    cardShowing,
    hotelImages,
    hotelWebSite,
    setActiveThumbnail,
    setCardShowing,
  } = useHotelDetails();

  const { dateHook, roomsHook, peopleHook } = useContext(SearchContext);
  const { sliderRef, thumbnailRef } = useKeenSlider();

  console.log("2 - ", hotels.hook.currentHotel);

  return hotels.hook.currentHotelDetails ? (
    <>
      <div className="flex h-[23rem] items-center justify-center bg-textPrimary">
        <figure
          ref={sliderRef}
          className="keen-slider h-[23rem] w-full max-w-[964px]"
        >
          {hotelImages &&
            hotelImages.map((image: any) => (
              <img
                key={image.name}
                src={`${process.env.NEXT_PUBLIC_HOTEL_IMAGES_URL}${image.name}`}
                alt=""
                className="keen-slider__slide h-full w-full object-cover"
              />
            ))}
        </figure>
      </div>

      <div
        ref={thumbnailRef}
        className="keen-slider mx-auto -mt-10 w-full max-w-[964px]"
      >
        {hotelImages &&
          hotelImages.map((image: any) => (
            <img
              key={image.name}
              src={`${process.env.NEXT_PUBLIC_HOTEL_IMAGES_URL}${image.name}`}
              alt=""
              data-active={activeThumbnail === image.name}
              onClick={() => setActiveThumbnail(image.name)}
              className="keen-slider__slide mt-4 h-[4rem] cursor-pointer rounded-md object-cover data-[active=true]:mt-0 data-[active=true]:border data-[active=true]:border-white data-[active=true]:duration-300"
            />
          ))}
      </div>

      <section className="mx-auto flex w-full max-w-[996px] flex-col items-start px-4 py-10">
        <div className="flex flex-wrap items-center justify-start gap-2">
          <div className="flex items-center justify-start gap-2">
            <Link className="flex w-8 items-center justify-center" href="/">
              <ChevronLeft className="text-primary" size={32} />
            </Link>
            <span className="block text-lg font-semibold uppercase text-primary md:text-2xl">
              {hotels.hook.currentHotelDetails.socialName}
            </span>
          </div>

          <StarRating className="ml-10 md:m-0" />
        </div>

        <div className="mb-2 ml-10 flex items-center justify-start gap-2">
          {hotelWebSite && (
            <span className="text-xs text-primary">{hotelWebSite.url}</span>
          )}
        </div>

        <div className="flex w-full  flex-col gap-4 border-y border-borderColor/20 pb-6 pt-2">
          <div className="flex w-full flex-col items-start justify-start gap-7 md:flex-row md:items-center">
            <div className="flex items-center justify-start gap-2">
              <Image
                src={GeneralIcons.mail}
                alt="Ícone de e-mail"
                width={24}
                height={24}
              />

              <span className="text-xs text-textSecondary">
                {hotels.hook.currentHotelDetails.mail}
              </span>
            </div>

            <div className="flex items-center justify-start gap-2">
              <Image
                src={GeneralIcons.phone}
                alt="Ícone de e-mail"
                width={24}
                height={24}
              />

              <span className="text-xs text-textSecondary">
                {hotels.hook.currentHotelDetails.phone}
              </span>
            </div>

            <div className="flex items-center justify-start gap-2">
              <Image
                src={GeneralIcons.location}
                alt="Ícone de e-mail"
                width={24}
                height={24}
              />

              <span className="text-xs text-textSecondary">
                {hotels.hook.currentHotelDetails.address.addressLine},{" "}
                {hotels.hook.currentHotelDetails.address.district}
              </span>
            </div>

            <div>
              <CardsPopover hotel={hotels.hook.currentHotel} />
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <span className="block font-semibold uppercase text-primary">
              O Hotel Oferece
            </span>
          </div>

          <div className="flex flex-wrap items-start gap-4">
            {hotels.hook.currentHotelDetails.amenityNames.map(
              (item: string) => {
                const currentAmentity = getAmenityValue(item);
                if (!currentAmentity || !currentAmentity.imagePath) return null;
                return (
                  <div
                    className="flex items-center justify-start gap-2"
                    key={currentAmentity?.amenity_id}
                  >
                    <Image
                      src={currentAmentity.imagePath || ""}
                      alt={currentAmentity.name}
                      width={24}
                      height={24}
                    />

                    <span className="text-xs text-textSecondary">
                      {currentAmentity.description}
                    </span>
                  </div>
                );
              },
            )}
          </div>
        </div>

        <span className="block pt-2 font-semibold uppercase text-primary">
          Unidades disponíveis para sua pesquisa
        </span>

        <div className="flex w-full items-center justify-start gap-4 py-4">
          <div
            className="mr-2 flex w-full min-w-[6.5rem] rounded-b2b
              border border-borderColor/20 md:mr-0 md:max-w-[8.5rem]"
          >
            <CardDate
              day={dateHook?.checkInDay}
              month={dateHook?.checkInMonth || "Set"}
              weekDay={dateHook?.checkInWeekDay || "seg"}
              index="left"
            />
            <CardDate
              day={dateHook?.checkInDay || new Date().getDate()}
              month={dateHook?.checkInMonth || "Set"}
              weekDay={dateHook?.checkInWeekDay || "seg"}
              index="right"
            />
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-4 text-small
      text-primary md:justify-start md:text-[1rem]"
          >
            <div className="flex items-center gap-2">
              <BiSolidBed className="h-4 w-4  md:h-5 md:w-5" />
              <p>{roomsHook?.textRoom || "1 Quarto"}</p>
            </div>
            <div className="flex items-center gap-2">
              <GiPerson className="h-4 w-4  md:h-5 md:w-5" />
              <p>{peopleHook?.textAdult || "1 Pessoa"}</p>
            </div>
          </div>

          <button
            onClick={() => setCardShowing(!cardShowing)}
            type="button"
            className="hidden md:ml-auto md:block"
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

        <div
          data-list={!cardShowing}
          className="
          mt-4 grid w-full grid-cols-1 gap-16 data-[list=true]:grid-cols-1 md:grid-cols-2"
        >
          {hotels.hook.currentHotel.roomTypes.map((item: any, i: number) => {
            if (item.availability === "NON") return null;
            return cardShowing ? (
              <PostCardResult
                hotel={hotels.hook.currentHotel}
                room={item}
                roomIndex={i}
                key={item.roomTypeId}
              />
            ) : (
              <PostLineResult room={item} key={item.roomTypeId} />
            );
          })}
        </div>
      </section>
    </>
  ) : (
    <HotelDetailsSkeleton />
  );
}
