"use client";

import * as FormComponents from "@/components/formComponents";
import { HelpCircleIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import B2BButton from "@/components/interactiveComponents/Button";
import { fCurrency } from "@/utils/FinanceUtil";

interface TaxesDialogProps {
  taxes: any;
  children: React.ReactNode;
}

export default function TaxesDialog({ children, taxes }: TaxesDialogProps) {
  const [selectedTax, setSelectedTax] = useState<any | null>(null);

  function verifyIfIsChecked(tax: any) {
    if (!selectedTax) return false;
    return tax.rateId === selectedTax.rateId;
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="left-1/2 top-1/2 w-full max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-left font-semibold uppercase text-primary">
            Lista de Tarifas
          </DialogTitle>
        </DialogHeader>

        <div className="mb-8 flex max-h-[500px] w-full flex-col divide-y divide-zinc-300 overflow-y-auto">
          {taxes.map((rate: any) => (
            <div
              key={rate.rateId}
              className="flex w-full items-center justify-between py-2"
            >
              <div className="pr-2">
                <FormComponents.Checkbox
                  className="h-3 w-3"
                  checked={verifyIfIsChecked(rate)}
                  onChange={() => setSelectedTax(rate)}
                />
              </div>

              <div className="w-full">
                <div className="flex items-center justify-start gap-2">
                  <span className="text-xs uppercase text-primary">Tarifa</span>

                  <HelpCircleIcon className="text-primary" size={16} />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex flex-col items-start">
                    <p className="text-xs text-textSecondary">
                      {fCurrency(rate.totalTaxes)} em impostos e taxas
                    </p>
                    <p className="text-xs text-textSecondary">
                      {fCurrency(rate.amountBeforeTax)} por diária
                    </p>
                  </div>

                  <div className="ml-auto">
                    <span className="font-semibold text-primary">
                      {fCurrency(rate.totalAmountAfterTax)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <B2BButton
          label="RESERVAR"
          buttonType="button"
          color="primary"
          disabled={!!!selectedTax}
        />
      </DialogContent>
    </Dialog>
  );
}
