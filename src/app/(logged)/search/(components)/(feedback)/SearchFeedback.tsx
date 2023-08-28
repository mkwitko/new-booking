/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'

export default function FeedbackSearch({
  type = 'default',
  complementaryText,
}: {
  type?: 'default' | 'noResults' | 'error' | 'processing'
  complementaryText?: string
}) {
  const getSvg = () => {
    if (type === 'noResults') {
      return {
        text: `Sem Resultados para o Filtro Selecionado`,
        icon: '/feedbackSearch/notFound.svg',
      }
    }
    if (type === 'error') {
      return {
        text: `Ocorreu um erro inesperado`,
        icon: '/feedbackSearch/error.svg',
      }
    }
    if (type === 'processing') {
      return {
        text: `Por favor, aguarde!`,
        icon: '/feedbackSearch/willSearch.svg',
      }
    }
    return {
      text: `Utilize o filtro para realizar busca por ${complementaryText}`,
      icon: '/feedbackSearch/willSearch.svg',
    }
  }

  const result = getSvg()
  return (
    <div
      className="mx-4 flex h-full w-full flex-col items-center justify-center 
    lg:mx-0 lg:flex-row lg:gap-4"
    >
      <div className="relative h-[20rem]  w-[20rem] lg:h-[25rem] lg:w-[25rem]">
        <Image fill src={result.icon} alt="Feedback search" />
      </div>
      <p className="w-2/3 text-center lg:w-1/6">{result.text}</p>
    </div>
  )
}
