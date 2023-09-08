import Image from 'next/image'

interface CreditCardOptionProps {
  id: string
  name: string
  number: string
  flag: 'VISA' | 'MASTER CARD' | 'OTHER'
}

const creditCardSvgPath = {
  VISA: '/icons/visaLogo.svg',
  'MASTER CARD': '/icons/masterLogo.svg',
  OTHER: '/icons/otherLogo.svg',
}

export function CreditCardOption({
  name,
  number,
  flag,
}: CreditCardOptionProps) {
  const svgPath = creditCardSvgPath[flag]
  
  const creditCardFormatted = (number: string) => {
    const firstPart = number.substring(0, 4)
    const secondPart = number.substring(4, 8)
    const thirdPart = number.substring(8, 12)
    const fourthPart = number.substring(12, 16)

    return `${firstPart} ${secondPart} ${thirdPart} ${fourthPart}`.toUpperCase()
  }

  return (
    <div className="md:grid-cols-credit-card grid grid-cols-2 gap-4">
      <div className="hidden w-full items-center md:flex">
        <Image
          width={20}
          height={12}
          alt="Credit Card Flag"
          src={creditCardSvgPath.VISA}
          className="w-4 object-cover md:w-5"
        />
      </div>

      <span className="text-xs text-textPrimary md:text-sm">{name}</span>

      <span className="text-xs text-textPrimary md:text-sm">
        {creditCardFormatted(number)}
      </span>
    </div>
  )
}
