import { useMasks } from '@/hooks/useMasks'
import Image from 'next/image'

interface CreditCardOptionProps {
  id: string
  name: string
  number: string
  cvv: string
  flag: 'visa' | 'mastercard' | 'elo' | 'other'
}

const creditCardSvgPath = {
  visa: '/icons/visaLogo.svg',
  mastercard: '/icons/masterLogo.svg',
  elo: '/icons/eloLogo.svg',
  other: '/icons/creditCard.svg',
}

export function CreditCardOption({
  name,
  number,
  flag,
}: CreditCardOptionProps) {
  const svgPath = creditCardSvgPath[flag]
  const { createCreditCardNumberMask } = useMasks()

  return (
    <div className="md:grid-cols-credit-card grid grid-cols-[100px_1fr] gap-4">
      <div className="hidden w-full items-center md:flex">
        <Image
          width={20}
          height={12}
          alt="Credit Card Flag"
          src={svgPath}
          className="w-4 object-cover md:w-5"
        />
      </div>

      <span className="text-xs text-textPrimary md:text-sm">{name}</span>

      <span className="text-xs text-textPrimary md:text-sm">
        {createCreditCardNumberMask(number)}
      </span>
    </div>
  )
}
