import B2BButton from "@/components/interactiveComponents/Button";
import { SearchContext } from "@/context/SearchContext";
import { fCurrency } from "@/utils/FinanceUtil";
import { useContext, useState } from "react";
import { BiSolidAddToQueue } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";

export default function Quotation({
  open,
  setOpen,
  openPdf,
  setOpenPdf,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openPdf: boolean;
  setOpenPdf: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { quotationHook } = useContext(SearchContext);

  const handleClear = () => {
    quotationHook.clearQuotation();
    setOpen(false);
  };

  return (
    <div className="relative flex w-full flex-col justify-start">
      <div className="absolute left-0 right-0 top-0 flex h-[50px] items-center justify-start gap-2">
        <BiSolidAddToQueue size={24} className="text-primary" />
        <span className="text-lg font-semibold uppercase text-primary">
          Cotação
        </span>
      </div>

      <div className="mt-[calc(50px+1.5rem)] flex w-full flex-col ">
        <button
          type="button"
          className="ml-auto pb-2 text-xs font-bold uppercase text-primary"
          onClick={handleClear}
        >
          Limpar Lista
        </button>

        <div className="flex max-h-[25rem] flex-col gap-2 overflow-y-auto">
          {quotationHook.quotation.map((e: any) => (
            <div key={e.rateId} className="flex flex-col border-b py-2">
              <div className="flex w-full items-center justify-between">
                <p className="font-semibold capitalize text-primary">
                  {e.hotelName.toLowerCase()}
                </p>
                <button
                  onClick={() => {
                    quotationHook.handleRemoveQuotation(e.rateId);
                    quotationHook.quotation.length <= 1 && setOpen(false);
                  }}
                  type="button"
                >
                  <TiDelete className="h-6 w-6" />
                </button>
              </div>
              <p className="text-small font-[300] capitalize">
                {e.roomName.toLowerCase()}
              </p>
              <p className="font-bold text-primary">
                {fCurrency(e.rate.totalAmountAfterTax)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex h-[50px] w-full items-center">
          <B2BButton
            onClick={() => {
              setOpenPdf(true);
              setOpen(false);
            }}
            label="Gerar pdf"
          />
        </div>
      </div>
    </div>
  );
}
