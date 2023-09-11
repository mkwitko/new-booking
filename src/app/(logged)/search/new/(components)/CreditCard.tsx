'use client'

import Image from 'next/image'

import Chip from '@/assets/images/credit-card-chip.png'
import { useMasks } from '@/hooks/useMasks'

import { motion as m, AnimatePresence } from 'framer-motion'

const creditCardsFlags = {
  VISA: '/icons/visaLogo.svg',
  MASTERCARD: '/icons/masterLogo.svg',
} as const

type DefineCreditCardFlagReturn = 'VISA' | 'MASTERCARD' | null

interface CreditCardProps {
  number: string | null | undefined
  name: string | null | undefined
  securityCode: string | null | undefined
  expirationDate: string | null | undefined
  showBackside?: boolean
}

export function CredtiCard({
  number,
  name,
  expirationDate,
  securityCode,
  showBackside = false,
}: CreditCardProps) {
  const { createCreditCardNumberMask, createExpirationDateMask } = useMasks()

  const defineCreditCardFlag = (data: string): DefineCreditCardFlagReturn => {
    if (data.startsWith('4')) {
      return 'VISA'
    }

    if (data.startsWith('5')) {
      return 'MASTERCARD'
    }

    return null
  }

  const displayNumberPlaceholder = !number || number === ''

  const displayNamePlaceholder = !name || name === ''

  const displayExpirationDatePlaceholder =
    !expirationDate || expirationDate === ''

  const formattedCreditCardNumber = createCreditCardNumberMask(number)
  const formattedExpirationDate = createExpirationDateMask(expirationDate)

  const creditCardFlag = formattedCreditCardNumber
    ? defineCreditCardFlag(formattedCreditCardNumber)
    : null

  return showBackside ? (
    <AnimatePresence>
      <m.div
        transition={{ duration: 1 }}
        data-flag={creditCardFlag}
        className="bg-default-card data-[flag=MASTERCARD]:bg-master-card data-[flag=VISA]:bg-visa-card group flex aspect-[5/3] w-full max-w-[300px] flex-col rounded-lg py-8 text-white shadow-md transition-colors data-[flag=MASTERCARD]:text-textPrimary data-[flag=VISA]:text-textPrimary"
      >
        <div className="h-[40px] w-full bg-zinc-800" />

        <div className="mt-4 w-full px-6">
          <div className="flex min-h-[35px] max-w-xs justify-end bg-zinc-50 p-2 text-xs font-bold text-textPrimary">
            <span>{securityCode || ''}</span>
          </div>
        </div>
      </m.div>
    </AnimatePresence>
  ) : (
    <AnimatePresence>
      <m.div
        transition={{ duration: 1 }}
        data-flag={creditCardFlag}
        className="bg-default-card data-[flag=MASTERCARD]:bg-master-card data-[flag=VISA]:bg-visa-card group flex aspect-[5/3] w-full max-w-[300px] flex-col rounded-lg px-6 py-4 text-white shadow-md transition-colors data-[flag=MASTERCARD]:text-textPrimary data-[flag=VISA]:text-textPrimary"
      >
        <header className="flex items-center justify-between">
          <Image src={Chip} alt="" width={35} height={15} />

          {creditCardFlag && (
            <Image
              src={creditCardsFlags[creditCardFlag]}
              alt=""
              width={50}
              height={25}
            />
          )}
        </header>

        <span className="mt-6 text-lg font-bold">
          {displayNumberPlaceholder && !formattedCreditCardNumber
            ? '•••• •••• •••• ••••'
            : formattedCreditCardNumber}
        </span>

        <div className="mt-auto flex w-full items-end justify-between">
          <span className="text-xs font-bold">
            {displayNamePlaceholder ? 'NAME' : name.toUpperCase()}
          </span>

          <div className="flex flex-col items-center gap-1 text-xs">
            <span>Validade</span>
            <span className="font-bold">
              {displayExpirationDatePlaceholder && !formattedExpirationDate
                ? '••/••'
                : formattedExpirationDate}
            </span>
          </div>
        </div>
      </m.div>
    </AnimatePresence>
  )
}
