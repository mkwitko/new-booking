'use client'

import * as FormComponents from '@/components/formComponents'
import { HelpCircleIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react"
import B2BButton from '@/components/interactiveComponents/Button';

interface TaxesDialogProps {
  taxes: any,
  children: React.ReactNode
}

export default function TaxesDialog({ children, taxes }: TaxesDialogProps) {
  const [selectedTax, setSelectedTax] = useState<any | null>(null)

  const brazilianCurrencyFormatter = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  })

  function verifyIfIsChecked(tax: any) {
    if (!selectedTax) return false
    return tax.rateId === selectedTax.rateId
  }

  console.log(taxes)

  return (
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>

      <DialogContent className="bg-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full max-w-[90%] md:max-w-[600px] p-4 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-primary font-semibold uppercase text-left">Lista de Tarifas</DialogTitle>
        </DialogHeader>

        <div className="w-full flex flex-col divide-y divide-zinc-300 mb-8 max-h-[500px] overflow-y-auto">
          {taxes.map((rate:any) => (
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
        
        <B2BButton label='RESERVAR' buttonType='button' color='primary' disabled={!!!selectedTax} />
      </DialogContent>
    </Dialog>
  )
}