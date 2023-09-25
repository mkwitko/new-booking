"use client";

import { Hotels } from "@/classes/availability/DTO/AvailabilityDTO";
import { SearchContext } from "@/context/SearchContext";
import { differenceInDays } from "date-fns";
import { useContext, useState } from "react";
import Image from "next/image";
import PostResultList from "./(components)/(list)/PostResultList";
import PostResultCard from "./(components)/(card)/PostResultCard";
import { GoFilter } from "react-icons/go";
import * as B2BModal from "@/components/nonInteractiveComponents/Modal";
import { Filter } from "./(components)/(Filter)";
import { LoggedContext } from "@/context/LoggedContext";
import { BiAddToQueue } from "react-icons/bi";
import Quotation from "./(components)/(Quotation)/Quotation";
import B2BButton from "@/components/interactiveComponents/Button";
import Pdf from "./(components)/(Pdf)/Pdf";

export default function PostResult() {
  const { availability } = useContext(LoggedContext);
  const { dateHook, peopleHook, quotationHook } = useContext(SearchContext);
  const [cardShowing, setCardShowing] = useState(false);

  const [open, setOpen] = useState(false);
  const [openQuotation, setOpenQuotation] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);

  const [seeMore, setSeeMore] = useState(
    availability.hook.data.map(() => false),
  );

  const subtitleText = () => {
    const days = differenceInDays(
      new Date(dateHook.checkOut),
      new Date(dateHook.checkIn),
    );

    const daysText = days === 1 ? "1 dia" : `${days} dias`;
    const peopleText = peopleHook.adult === 1 ? "pessoa" : "pessoas";

    return `${daysText}, ${peopleHook.adult + peopleHook.child} ${peopleText}`;
  };

  return (
    <div className="w-full">
      <div className="my-8 flex items-center justify-between">
        {/* Titulo Resultados */}
        <div className="flex items-center gap-4">
          <p className="font-[600] text-primary md:text-large">
            {`${availability.hook.data.length} Resultados`}
          </p>
          <p className="text-small font-light text-textSecondary md:text-[1rem]">
            {subtitleText()}
          </p>
        </div>

        {/* Alterar visualização */}
        <div className="flex gap-4">
          <div className="relative flex items-center">
            <div className="absolute h-full w-full animate-ping rounded-full bg-primary-200 p-2 opacity-25"></div>
            <button
              onClick={() => {
                setCardShowing(!cardShowing);
              }}
              type="button"
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
        </div>
      </div>

      <div
        className={`${
          !cardShowing
            ? "grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
            : "flex w-full flex-col gap-4 border-borderColor/20"
        }`}
      >
        {availability.hook.data.map((hotel: Hotels, index: number) => {
          return !cardShowing ? (
            <PostResultCard hotel={hotel} key={hotel.id} />
          ) : (
            <PostResultList
              hotel={hotel}
              key={hotel.id}
              seeMore={seeMore}
              setSeeMore={setSeeMore}
              index={index}
            />
          );
        })}
      </div>

      <B2BModal.Modal open={open} setOpen={setOpen}>
        <B2BModal.ModalTrigger>
          <button
            onClick={() => {}}
            className="fixed right-0 top-0 mt-[6rem] h-[106px] max-h-[106px] w-[36px] rounded-l-[10px] bg-primary p-2 hover:bg-primaryDark"
            type="button"
          >
            <p className="mb-3 -rotate-90 text-white">Filtros</p>
            <GoFilter className="-mb-6 h-6 w-6 -rotate-90 text-white" />
          </button>
        </B2BModal.ModalTrigger>
        <B2BModal.ModalContent mergeClasses="right-0 top-0 max-w-[20rem] fixed mt-[6rem] py-0 rounded-lg px-4">
          <Filter open={open} setOpen={setOpen} />
        </B2BModal.ModalContent>
      </B2BModal.Modal>

      {quotationHook.quotation.length > 0 && (
        <>
          <B2BModal.Modal open={openQuotation} setOpen={setOpenQuotation}>
            <B2BModal.ModalTrigger>
              <button
                onClick={() => {}}
                className="fixed right-0 top-0 mt-[13rem] h-[44px] max-h-[44px] w-[36px] rounded-l-[10px] bg-primaryLight p-2 hover:bg-primaryLight-700"
                type="button"
              >
                <span className="fixed right-8 z-10 inline-flex h-4 w-4 items-center justify-center rounded-full bg-warning px-2 py-1 text-xs font-bold leading-none text-red-100">
                  {quotationHook.quotation.length}
                </span>
                <BiAddToQueue className="h-6 w-6 -rotate-90 text-white" />
              </button>
            </B2BModal.ModalTrigger>
            <B2BModal.ModalContent mergeClasses="right-0 top-0 max-w-[20rem] fixed mt-[6rem] py-0 rounded-lg px-4">
              <Quotation
                open={openQuotation}
                setOpen={setOpenQuotation}
                openPdf={openPdf}
                setOpenPdf={setOpenPdf}
              />
            </B2BModal.ModalContent>
          </B2BModal.Modal>
          <B2BModal.Modal open={openPdf} setOpen={setOpenPdf}>
            <B2BModal.ModalContent mergeClasses="right-0 top-0 max-w-[30rem] h-[22.5rem] fixed mt-[6rem] py-0 rounded-lg px-4">
              <Pdf setOpenPdf={setOpenPdf} />
            </B2BModal.ModalContent>
          </B2BModal.Modal>
        </>
      )}
    </div>
  );
}
