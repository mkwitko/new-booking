import Image from 'next/image'

import Chip from '@/assets/images/credit-card-chip.png'

const creditCardsFlags = {
  VISA: '/icons/visaLogo.svg',
  MASTERCARD: '/icons/masterLogo.svg',
  ELO: '/icons/eloLogo.svg',
} as const

export function CredtiCard() {
  return (
    // Front-side
    <div className="mx-auto flex h-[180px] w-[300px] flex-col  rounded-lg bg-primaryLight-700 px-6 py-4 text-white shadow-sm">
      <header className="flex items-center justify-between">
        <Image src={Chip} alt="" width={35} height={15} />

        <Image
          src={creditCardsFlags.MASTERCARD}
          alt=""
          width={50}
          height={25}
        />
      </header>
      <span className="mt-10 text-lg">•••• •••• •••• ••••</span>

      <div className="mt-auto flex w-full items-center justify-between">
        <span className="text-xs">NOME</span>

        <div className="flex flex-col items-center gap-1 text-xs">
          <span className="block">Validade</span>
          <span className="block">••/••</span>
        </div>
      </div>
    </div>
  )
}
