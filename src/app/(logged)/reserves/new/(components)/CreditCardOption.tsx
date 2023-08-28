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

  return (
    <div className="grid grid-cols-credit-card gap-4">
      <div className="flex w-full items-center">
        <Image
          width={20}
          height={12}
          alt="Credit Card Flag"
          src={svgPath}
          className="w-5 object-cover"
        />
      </div>

      <span className="text-sm text-textPrimary">{name}</span>

      <span className="text-sm text-textPrimary">{number}</span>
    </div>
  )
}
