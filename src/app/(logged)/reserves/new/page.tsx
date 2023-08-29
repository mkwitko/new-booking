import Container from '@/components/coreComponents/containers/Container'
import WhiteBox from '@/components/coreComponents/containers/WhiteBox'
import Title from '@/components/text/Title'

import { AiFillInfoCircle } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import { Calendar } from './(components)/Calendar'
import { StarRating } from './(components)/StarRating'
import { ReserveForm } from './(components)/ReserveForm'

export default function Reserves() {
  return (
    <Container>
      <Title title="Nova Reserva" classes="mb-8 -mt-4" />
      <WhiteBox classes="gap-4 lg:gap-6">
        <div className="space-y-px">
          <div className="flex flex-col-reverse items-start justify-start gap-2 md:flex-row md:items-center md:gap-4">
            <h3 className="text-lg font-semibold uppercase text-primary-500 md:text-2xl">
              Hotel Disney
            </h3>

            <StarRating />
          </div>
          <address className="text-xs not-italic">
            Av. Júlio de Castilhos, 342, Centro
          </address>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-start gap-2 divide-x divide-borderColor/20">
            <span className="text-xs font-semibold text-primary-500 md:text-base">
              Apartamento Executivo Twin
            </span>
            <span className="pl-2 text-xs">1 Cama casal</span>
          </div>
          <span className="text-xs leading-tight">
            Essa reserva pode ser cancelada até: 09/08/2023 às 18h
          </span>
        </div>

        <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center">
          <Calendar />

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-black">
              {/*   eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/icBed.svg"
                alt="Ícone de cama"
                className="w-4 object-cover md:w-5"
              />
              <span className="text-xs font-light md:text-base">1 Quarto</span>
            </div>

            <div className="flex items-center gap-2 text-black">
              {/*   eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/icPerson.svg"
                alt="Ícone de cama"
                className="w-4 object-cover md:w-5"
              />
              <span className="text-xs font-light md:text-base">2 Pessoas</span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <div className="flex items-center gap-2 py-2">
            <div>
              <span className="block font-semibold text-primary">
                R$ 2.567,50
              </span>
              <span className="block text-xs text-textSecondary">
                ARS 81.200,00
              </span>
            </div>

            <AiFillInfoCircle className="w-5 cursor-pointer text-primary-500" />
          </div>

          <div className="flex w-full flex-col md:flex-row md:items-end md:justify-between">
            <div className="text-xs leading-relaxed text-textSecondary">
              <p>2 Pernoites</p>
              <p>Diária média de R$ 550,00</p>
              <p>R$ 188,50 em impostos e taxas</p>
            </div>

            <div className="ml-auto mt-4 flex items-center gap-2 text-primary-500 md:mt-0">
              <BsChevronDown className="w-3 md:w-5" />
              <span className="text-xs font-medium uppercase md:font-bold">
                Ver mais Tarifas
              </span>
            </div>
          </div>
        </div>
      </WhiteBox>

      <div className="my-3 w-full rounded-b2b border border-success bg-white px-6 py-2">
        <p className="text-xs font-light leading-normal md:text-base">
          Esta tarifa está gerando uma economia de{' '}
          <span className="font-bold">R$ 252,50</span> em relação a tarifa média
          para a pesquisa
        </p>
      </div>

      <ReserveForm />
    </Container>
  )
}
