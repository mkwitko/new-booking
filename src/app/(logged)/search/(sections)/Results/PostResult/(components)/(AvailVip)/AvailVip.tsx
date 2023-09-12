import { Hotels } from '@/classes/availability/DTO/AvailabilityDTO';
import useAvailabilityHook from '@/classes/availability/hook/useAvailabilityHook';
import InputContainer from '@/components/coreComponents/containers/InputContainer';
import { B2BDatePicker } from '@/components/interactiveComponents/DatePicker';
import { LoggedContext } from '@/context/LoggedContext';
import { fCurrency } from '@/utils/FinanceUtil';
import React, { useContext } from 'react';
import RoomsAvail from './components/rooms/RoomsAvail';

export default function AvailVip (
  { setOpen }: { setOpen: any }) {

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
  } = useAvailabilityHook()

  function saveAvailVip() {
    saveVip(currentHotel.roomTypes[0].id)
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col items-start rounded-[0.625rem] b-[#8C8C8C]/20 bg-white w-full gap-4 relative p-4">
        <div className="sticky">
          <p className="text-primary capitalize text-base font-[600]">
            Solicitação De Disponibilidade Vip
          </p>
        </div>
        <div className="flex flex-col gap-8 overflow-y-auto overflow-x-hidden h-[25rem] py-2 pr-2">
          <p className="text-small text-textPrimary">
            O hotel não possui disponibilidade para a quantidade de acomodações pesquisada no momento. Solicite
            disponibilidade VIP para notificar o hotel de sua necessidade.
          </p>
          <div className="flex items-start border b-[#8C8C8C]/20 rounded-b2b w-full">
            <div className="flex flex-col border-r gap-2 p-4 h-full">
              <p className="text-primary font-semibold capitalize">{currentHotel.name}</p>
              <div className="text-textSecondary text-extraSmall capitalize">
                <p className="flex flex-col">{currentHotel.location.address},</p>
                <p>{currentHotel.location.neighborhood}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4 ml-4 h-full">
              <p className="text-primary font-semibold capitalize">{currentHotel.roomTypes[0].description}</p>
              <div className="text-textSecondary text-extraSmall">
                <p>
                  {currentHotel.roomTypes[0].maxOccupancy} cama
                </p>
                {currentHotel &&
                  currentHotel.roomTypes[0].averageRates &&
                  currentHotel.roomTypes[0].averageRates[0].amountBeforeTax &&
                  currentHotel.roomTypes[0].averageRates[0].amountBeforeTax > 0 && (
                    <p>
                      {fCurrency(
                        currentHotel && currentHotel.roomTypes[0].averageRates
                          ? currentHotel.roomTypes[0].averageRates[0].amountBeforeTax
                          : 0,
                      )}{' '}
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
                      )}{' '}
                      em impostos e taxas
                    </p>
                  )}
              </div>
            </div>
          </div>
          <div
            className="flex flex-col gap-4 w-full justify-start items-center
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
              className="border-b w-full resize-none px-2"
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
            <p className="text-textSecondary text-small">
              Caso o hoteleiro confirme a disponibilidade, será definido um prazo para que as reservas sejam realizadas.
            </p>
            <p className="text-textSecondary text-small">
              A solicitação de disponibilidade possui validade por 3h, caso não seja obtida resposta do hotel, a
              solicitação é automaticamente cancelada.
            </p>
            <p className="text-textSecondary text-small">
              Fique atento às notificações, você será informado assim que obtivermos a confirmação do hotel.
            </p>
          </div>
        </div>
      </div>
      <div className="sticky w-full py-4 bg-[#F4F7FA]">
        <div className="flex justify-end w-full gap-6 text-base font-bold pr-6">
          <button
            className='text-primary px-6 py-3'
            type="button"
            onClick={() => {
              setOpen(false);
            }}
          >
            <div className="flex gap-4">
              <p>VOLTAR</p>
            </div>
          </button>
          <button
            className='text-white bg-primary rounded-[0.375rem] px-6 py-3'
            type="submit"
            onClick={() => {
              saveAvailVip()
              setOpen(false)
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
