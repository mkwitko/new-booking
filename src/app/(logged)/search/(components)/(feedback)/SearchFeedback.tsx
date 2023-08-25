/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';

export default function FeedbackSearch({
  type = 'default',
  complementaryText,
}: {
  type?: 'default' | 'noResults' | 'error' | 'processing';
  complementaryText?: string;
}) {
  const getSvg = () => {
    if (type === 'noResults') {
      return {
        text: `Sem Resultados para o Filtro Selecionado`,
        icon: '/feedbackSearch/notFound.svg',
      };
    }
    if (type === 'error') {
      return {
        text: `Ocorreu um erro inesperado`,
        icon: '/feedbackSearch/error.svg',
      };
    }
    if (type === 'processing') {
      return {
        text: `Por favor, aguarde!`,
        icon: '/feedbackSearch/willSearch.svg',
      };
    }
    return {
      text: `Utilize o filtro para realizar busca por ${complementaryText}`,
      icon: '/feedbackSearch/willSearch.svg',
    };
  };

  const result = getSvg();
  return (
    <div className="flex items-center justify-center h-full w-full gap-4">
      <div className="w-[25rem] h-[25rem] relative">
        <Image
          fill
          src={result.icon}
          alt="Feedback search"
        />
      </div>
      <p className="w-1/6">{result.text}</p>
    </div>
  );
}
