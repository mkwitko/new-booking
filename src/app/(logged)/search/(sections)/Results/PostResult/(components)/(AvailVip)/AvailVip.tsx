import { Hotels } from "@/classes/availability/DTO/AvailabilityDTO";
import useAvailabilityHook from "@/classes/availability/hook/useAvailabilityHook";
import InputContainer from "@/components/coreComponents/containers/InputContainer";
import { B2BDatePicker } from "@/components/interactiveComponents/DatePicker";
import { LoggedContext } from "@/context/LoggedContext";
import { fCurrency } from "@/utils/FinanceUtil";
import React, { useContext } from "react";
import RoomsAvail from "./components/rooms/RoomsAvail";

export default function AvailVip({ setOpen }: { setOpen: any }) {
  const { hotels } = useContext(LoggedContext);
  const currentHotel: Hotels = hotels.hook.currentHotel;

  const {
    observation,
    setObservation,
    rooms,
    setRooms,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    saveVip,
  } = useAvailabilityHook();

  function saveAvailVip() {
    saveVip(currentHotel.roomTypes[0].id);
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="relative flex w-full flex-col items-start gap-4 rounded-[0.625rem] border-borderColor/20 bg-white p-4">
        <div className="sticky">
          <p className="text-base font-[600] capitalize text-primary">
            Solicitação De Disponibilidade Vip
          </p>
        </div>
        <div className="flex h-[25rem] flex-col gap-8 overflow-y-auto overflow-x-hidden py-2 pr-2">
          <p className="text-small text-textPrimary">
            O hotel não possui disponibilidade para a quantidade de acomodações
            pesquisada no momento. Solicite disponibilidade VIP para notificar o
            hotel de sua necessidade.
          </p>
          <div className="flex w-full items-start rounded-b2b border border-borderColor/20">
            <div className="flex h-full flex-col gap-2 border-r p-4">
              <p className="font-semibold capitalize text-primary">
                {currentHotel.name}
              </p>
              <div className="text-extraSmall capitalize text-textSecondary">
                <p className="flex flex-col">
                  {currentHotel.location.address},
                </p>
                <p>{currentHotel.location.neighborhood}</p>
              </div>
            </div>
            <div className="ml-4 flex h-full flex-col gap-2 p-4">
              <p className="font-semibold capitalize text-primary">
                {currentHotel.roomTypes[0].description}
              </p>
              <div className="text-extraSmall text-textSecondary">
                <p>{currentHotel.roomTypes[0].maxOccupancy} cama</p>
                {currentHotel &&
                  currentHotel.roomTypes[0].averageRates &&
                  currentHotel.roomTypes[0].averageRates[0].amountBeforeTax &&
                  currentHotel.roomTypes[0].averageRates[0].amountBeforeTax >
                    0 && (
                    <p>
                      {fCurrency(
                        currentHotel && currentHotel.roomTypes[0].averageRates
                          ? currentHotel.roomTypes[0].averageRates[0]
                              .amountBeforeTax
                          : 0,
                      )}{" "}
                      por diária
                    </p>
                  )}
                {currentHotel &&
                  currentHotel.roomTypes[0].averageRates &&
                  currentHotel.roomTypes[0].averageRates[0].totalTaxes &&
                  currentHotel.roomTypes[0].averageRates[0].totalTaxes > 0 && (
                    <p>
                      {fCurrency(
                        currentHotel && currentHotel.roomTypes[0].averageRates
                          ? currentHotel.roomTypes[0].averageRates[0].totalTaxes
                          : 0,
                      )}{" "}
                      em impostos e taxas
                    </p>
                  )}
              </div>
            </div>
          </div>
          <div
            className="flex w-full flex-col items-center justify-start gap-4
      lg:border-b lg:border-primary"
          >
            <div className="w-full">
              <InputContainer label="Data de Entrada e Saída">
                <B2BDatePicker
                  checkIn={checkIn}
                  setCheckIn={setCheckIn}
                  checkOut={checkOut}
                  setCheckOut={setCheckOut}
                />
              </InputContainer>
            </div>
            <div className="w-full">
              <RoomsAvail rooms={rooms} setRooms={setRooms} />
            </div>
          </div>
          <div className="w-full capitalize">
            <p>Observações De Cobrança</p>
            <textarea
              className="w-full resize-none border-b px-2"
              value={observation}
              onChange={(event: any) => {
                setObservation(event.target.value);
              }}
              cols={30}
              rows={4}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-primary">Atenção</p>
            <p className="text-small text-textSecondary">
              Caso o hoteleiro confirme a disponibilidade, será definido um
              prazo para que as reservas sejam realizadas.
            </p>
            <p className="text-small text-textSecondary">
              A solicitação de disponibilidade possui validade por 3h, caso não
              seja obtida resposta do hotel, a solicitação é automaticamente
              cancelada.
            </p>
            <p className="text-small text-textSecondary">
              Fique atento às notificações, você será informado assim que
              obtivermos a confirmação do hotel.
            </p>
          </div>
        </div>
      </div>
      <div className="sticky w-full bg-[#F4F7FA] py-4">
        <div className="flex w-full justify-end gap-6 pr-6 text-base font-bold">
          <button
            className="px-6 py-3 text-primary"
            type="button"
            onClick={() => {
              setOpen(false);
            }}
          >
            <p>VOLTAR</p>
          </button>
          <button
            className="rounded-[0.375rem] bg-primary px-6 py-3 text-white"
            type="submit"
            onClick={() => {
              saveAvailVip();
              setOpen(false);
            }}
          >
            <div className="flex gap-4">
              <p>CONFIRMAR SOLICITAÇÃO</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
