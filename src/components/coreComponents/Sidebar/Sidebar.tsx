/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image'
import logo from '@/assets/b2b/Logo.svg'
import { BiSolidUser } from 'react-icons/bi/'
import { FaHotel } from 'react-icons/fa6'
import { GiMultiDirections } from 'react-icons/gi'
import SingleElement from './SingleElement'
import Accordion from '@/components/nonInteractiveComponents/Accordion'

export default function SideBar({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: any
}) {
  const Menus = [
    {
      title: 'Perfil',
      src: <BiSolidUser className="h-6 w-6" />,
      childs: [
        {
          title: 'Pesquisar',
          path: '/search',
        },
        {
          title: 'Reservas',
          path: '/reserves',
        },
        {
          title: 'Solicitações',
          path: '/solicitations',
        },
      ],
    },
  ]

  return (
    <div
      className={` ${
        open ? 'w-[16rem] p-6' : 'w-0 sm:w-16 sm:py-6'
      } fixed z-50 h-screen  bg-primaryDark text-white duration-300 ease-in`}
    >
      <div
        className="flex items-center justify-between gap-6"
      >
        {/* <div className="w-1/5">
          <Image
            src={logo}
            alt="Profile"
            width={50}
            height={50}
          />
        </div> */}
        {/* <div className="flex flex-col w-4/5">
          <h1 className={`duration-200 ${!open && 'scale-0'} text-small`}>
            {hotelChain?.hook.data.name || ''}
          </h1>
        </div> */}
      </div>
      <ul>
        {Menus.map((each, index) => {
          return open && each.childs ? (
            <Accordion
              key={index}
              header={
                <SingleElement
                  Menu={each}
                  index={index}
                  open={open}
                  MenuIcon={each.src}
                />
              }
            >
              <div className="ml-6">
                {each.childs.map((e, i) => {
                  return (
                    <SingleElement key={i} Menu={e} index={i} open={open} 
                    setOpen={setOpen} />
                  )
                })}
              </div>
            </Accordion>
          ) : (
            <SingleElement
              key={index}
              Menu={each}
              index={index}
              open={open}
              setOpen={setOpen}
              MenuIcon={each.src}
            />
          )
        })}
      </ul>
    </div>
  )
}
