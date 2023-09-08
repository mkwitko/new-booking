import Image from 'next/image'

export function NewCreditCardOption() {
  return (
    <div className="grid grid-cols-credit-card gap-4">
      <div className="flex w-full items-center">
        <Image
          width={20}
          height={12}
          alt="Credit Card Flag"
          src={'/icons/newCreditCard.svg'}
          className="w-5 object-cover"
        />
      </div>

      <span className="text-sm text-textPrimary">Informar Manualmente</span>
    </div>
  )
}
