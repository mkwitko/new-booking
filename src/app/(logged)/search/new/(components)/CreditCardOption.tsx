import { getCreditCardImage } from '@/utils/creditCardBrand'
import Image from 'next/image'

interface CreditCardOptionProps {
  creditCard: any
}

export function CreditCardOption({ creditCard }: CreditCardOptionProps) {
  return (
    <div className="md:grid-cols-credit-card grid grid-cols-2 gap-4">
      <div className="hidden w-full items-center md:flex">
        <Image
          width={20}
          height={12}
          alt="Credit Card Flag"
          src={getCreditCardImage(creditCard.brand)}
          className="w-4 object-cover md:w-5"
        />
      </div>

      <span className="text-xs text-textPrimary md:text-sm">{creditCard.entity}</span>

        {creditCard.typeCard !== 'vnc' && (
          <span className="text-xs text-textPrimary hidden md:block">
            {creditCard.cardNumber}
          </span>
        )}
    </div>
  )
}
