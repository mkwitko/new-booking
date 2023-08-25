'use client';

import { getCard } from '@/app/(logged)/search/(utils)/ShowingResultsUtils';
import { Hotels } from '@/classes/availability/DTO/AvailabilityDTO';
import {
  B2BPopover,
  B2BPopoverContent,
  B2BPopoverTrigger,
} from '@/components/nonInteractiveComponents/Popover';
import Image from 'next/image';
import { useState } from 'react';

export default function CardsPopover({ hotel }: { hotel: Hotels }) {
  const [cardPopover, setCardPopover] = useState(false);
  const [cardCloudPopover, setCardCloudPopover] = useState<any>(null);
  const hasCards: boolean | undefined =
    hotel.creditCardBrandsAccepted && hotel.creditCardBrandsAccepted.length > 0;
  return (
    <>
      <B2BPopover
        open={cardPopover}
        openChange={setCardPopover}
      >
        <B2BPopoverTrigger>
          <button
            disabled={!hasCards}
            type="button"
            onMouseEnter={() => {
              setCardPopover(true);
            }}
            onMouseLeave={() => {
              setCardPopover(false);
            }}
            className="disabled:opacity-30"
          >
            <div className="w-6 h-6 relative">
              <Image
                fill
                src="/icons/creditCard.svg"
                alt="creditCard"
              />
            </div>
          </button>
        </B2BPopoverTrigger>
        <B2BPopoverContent>
          <div className="flex flex-col justify-center items-start gap-6 max-w-[25rem]">
            <p className="text-primary font-bold">Cartões de Crédito</p>
            <p className="text-primary">
              Bandeiras de cartão de crédito aceitas para pagamento direto no
              hotel.
            </p>
            <div className="flex p-2 rounded-b2b gap-2 w-full">
              {hasCards &&
                hotel.creditCardBrandsAccepted?.map((e: any) => {
                  return getCard(e.code);
                })}
            </div>
          </div>
        </B2BPopoverContent>
      </B2BPopover>
      {hotel.transactionAcquirer && (
        <B2BPopover
          open={cardCloudPopover}
          openChange={setCardCloudPopover}
        >
          <B2BPopoverTrigger>
            <button
              type="button"
              onMouseEnter={(e) => {
                setCardCloudPopover(true);
              }}
              onMouseLeave={() => {
                setCardCloudPopover(false);
              }}
            >
              <Image
                width={24}
                height={24}
                src="/icons/creditCardCloud.svg"
                alt="creditCardCloud"
              />
            </button>
          </B2BPopoverTrigger>
          <B2BPopoverContent classes="max-w-[30rem]">
            <div className="flex flex-col justify-center items-start gap-6">
              <p className="text-primary font-bold">Gateway de Pagamento</p>
              <p className="text-primary">
                Hotel habilitado para pagamento online. Necessário cadastro de
                cartão virtual.
              </p>
              <p className="text-primary">
                Os dados do seu cartão serão criptografados e salvos em um cofre
                com certificação de segurança intenacional
              </p>
            </div>
          </B2BPopoverContent>
        </B2BPopover>
      )}
    </>
  );
}
