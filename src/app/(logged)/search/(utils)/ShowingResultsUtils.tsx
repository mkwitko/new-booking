import Image from 'next/image'

export const getAvailabilityProps = (availability: string) => {
  switch (availability) {
    case 'NON':
      return {
        text: 'Não disponível',
        color: 'text-red-500 border-red-500',
      }
    case 'PUB':
      return {
        text: 'Disponível',
        color: 'text-green-500 border-green-500',
      }
    case 'VIP':
      return {
        text: 'Quarto Vip',
        color: 'text-blue-500 border-blue-500',
      }
    default:
      return {
        text: 'Não disponível',
        color: 'text-red-500 border-red-500',
      }
  }
}

export const getCard = (code: string) => {
  if (code === 'AL')
    return (
      <Image
        width={32}
        height={32}
        key={code}
        src="creditCardsBrands/elo.svg"
        alt="elo"
      />
    )
  if (code === 'VI')
    return (
      <Image
        width={32}
        height={32}
        key={code}
        src="creditCardsBrands/visa.svg"
        alt="visa"
      />
    )
  if (code === 'DN')
    return (
      <Image
        width={32}
        height={32}
        key={code}
        src="creditCardsBrands/diners.svg"
        alt="diners"
      />
    )
  if (code === 'AX')
    return (
      <Image
        width={32}
        height={32}
        key={code}
        src="creditCardsBrands/amex.svg"
        alt="amex"
      />
    )
  if (code === 'MC')
    return (
      <Image
        width={32}
        height={32}
        key={code}
        src="creditCardsBrands/mastercard.svg"
        alt="mastercard"
      />
    )
  if (code === 'CC')
    return (
      <Image
        width={32}
        height={32}
        key={code}
        src="creditCardsBrands/credicard.svg"
        alt="credicard"
      />
    )
  if (code === 'GC')
    return (
      <Image
        width={32}
        height={32}
        key={code}
        src="creditCardsBrands/goodcard.svg"
        alt="goodcard"
      />
    )
  if (code === 'HIP')
    return (
      <Image
        width={32}
        height={32}
        key={code}
        src="creditCardsBrands/hipercard.svg"
        alt="hipercard"
      />
    )

  return ''
}
