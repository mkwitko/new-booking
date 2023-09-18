/* eslint-disable @next/next/no-img-element */
import { Hotels } from "@/classes/availability/DTO/AvailabilityDTO";
import Badge from "../Badge";
import Link from "next/link";
import Button from "@/components/interactiveComponents/Button";
import CardsPopover from "../(popovers)/CardsPopover";
import MealPopover from "../(popovers)/MealPopover";
import PolicyPopover from "../(popovers)/PolicyPopover";
import TotalTaxes from "@/app/(logged)/search/(components)/(finance)/TotalTaxes";
import AmountBeforeTax from "@/app/(logged)/search/(components)/(finance)/AmountBeforeTax";
import TotalAmountAfterTax from "@/app/(logged)/search/(components)/(finance)/TotalAmountAfterTax";
import TextLimmiter from "@/components/text/TextLimitter";
import { useContext, useState } from "react";
import { SearchContext } from "@/context/SearchContext";
import { BiSolidAddToQueue } from "react-icons/bi";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { integratedSistems } from "@/utils/IntegratedSystems";
import { LoggedContext } from "@/context/LoggedContext";
import * as B2BModal from "@/components/nonInteractiveComponents/Modal";
import AvailVip from "../(AvailVip)/AvailVip";

export default function PostResultCard({ hotel }: { hotel: Hotels }) {
  const { hotels } = useContext(LoggedContext);
  const { quotationHook } = useContext(SearchContext);
  const image = `${process.env.NEXT_PUBLIC_HOTEL_IMAGES_URL}${hotel?.exteriorViewImageURL}`;
  const imageToShow = image || "icons/withoutResult.svg";
  const [openModalSolicitationVip, setOpenModalSolicitationVip] = useState(false);

  return (
    <div className="flex h-[35rem] flex-col justify-around rounded-b2b border border-borderColor/20 bg-white p-4">
      {/* TODO trocar para Image do next */}
      <img
        className="z-20 aspect-[2.144/1] rounded-b2b object-cover"
        src={
          hotel?.exteriorViewImageURL ? imageToShow : "icons/withoutResult.svg"
        }
        alt={hotel.name.toLowerCase()}
      />
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase text-textSecondary">
          {integratedSistems.find((e) => e.systemId === hotel.systemId)?.label}
        </p>
        <div className="flex w-full items-start justify-between">
          <TextLimmiter
            className="text-start font-bold capitalize text-primary"
            length={50}
          >
            {hotel.name.toLowerCase()}
          </TextLimmiter>
          {<Badge availability={hotel.roomTypes[0].availability} />}
        </div>
      </div>
      <div>
        <p className="text-extraSmall sm:text-small">
          {hotel.location.address}, {hotel.location.neighborhood}
        </p>
        <p className="text-small">
          {hotel &&
            hotel.distanceFrom &&
            `${hotel.distanceFrom.position.distance.toFixed(2)}km do centro`}
        </p>
      </div>
      <div className="flex w-full items-center justify-between border-b pb-4">
        <div className="flex flex-wrap items-start gap-1">
          <CardsPopover hotel={hotel} />
          <PolicyPopover hotel={hotel} />
          <MealPopover hotel={hotel} />
        </div>
        <div className="flex items-start gap-2">
          <Link
            href={{
              pathname: "/search/details",
            }}
          >
            <Button
              onClick={() => {
                hotels.hook.handleSetCurrentHotel(hotel);
              }}
              color="light"
              label="Ver hotel"
              textClass="text-extraSmall sm:text-small lg:text-small"
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 text-small">
        <TextLimmiter
          className="text-normal font-[300] capitalize text-textPrimary"
          length={60}
        >
          {hotel.roomTypes[0].description.toLowerCase()}
        </TextLimmiter>
        <p>{hotel.roomTypes[0].maxOccupancy} ocupantes</p>
        <>
          <AmountBeforeTax hotel={hotel} mergeClasses="text-textPrimary" />
          <TotalTaxes hotel={hotel} mergeClasses="text-textPrimary" />
          <div className="flex w-full justify-between">
            <TotalAmountAfterTax hotel={hotel} />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  quotationHook.handleAddQuotation(hotel);
                }}
              >
                {quotationHook.findQuotation(hotel) ? (
                  <MdOutlinePlaylistRemove size={24} className="text-primary" />
                ) : (
                  <BiSolidAddToQueue size={24} className="text-primary" />
                )}
              </button>
            </div>
          </div>
          {/* {currencyRates.rates && findRate && (
              <p className="text-small">
                {fCurrency(
                  hotel.roomTypes[0].averageRates[0].totalAmountAfterTaxBase,
                  findRate.currencyCode
                )}
              </p>
            )} */}
        </>
        <div className="mt-2 w-full">
          {hotel.roomTypes[0].availability === "PUB" ? (
            <Link
              href={{
                pathname: "/search/new",
              }}
            >
              <Button
                onClick={() => {
                  hotels.hook.handleSetCurrentHotel(hotel);
                }}
                color="primary"
                label="Reservar"
              />
            </Link>
          ) : hotel.roomTypes[0].availability === "VIP" ? (
            <Link
              href={{
                pathname: "/search/new",
              }}
            >
              <Button
                onClick={() => {
                  hotels.hook.handleSetCurrentHotel(hotel);
                }}
                color="primary"
                label="Reservar"
              />
            </Link>
          ) : (
            <Button
              onClick={() => {
                  hotels.hook.handleSetCurrentHotel(hotel);
                  setOpenModalSolicitationVip(true)
              }}
              color="outlined"
              label="Solicitar"
            />
          )}
        </div>
      </div>

      <B2BModal.Modal open={openModalSolicitationVip} setOpen={setOpenModalSolicitationVip}>
        <B2BModal.ModalContent mergeClasses="-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-[40rem] h-[38rem] rounded-lg px-4">
          <AvailVip setOpen={setOpenModalSolicitationVip} />
        </B2BModal.ModalContent>
      </B2BModal.Modal>

    </div>
  );
}
