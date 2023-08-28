/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'

export default function SingleElement({
  Menu,
  index,
  open = false,
  MenuIcon,
  setOpen,
}: {
  Menu: any
  index: number
  open?: boolean
  MenuIcon?: any
  setOpen?: any
}) {
  return Menu.path ? (
    <Link href={Menu.path || ''}>
     <button type='button' className='w-full' onClick={() => {
    if (setOpen) {
      setOpen(!open)
    }
  }}>
      <Element Menu={Menu} MenuIcon={MenuIcon} index={index} open={open} />
  </button>
    </Link>
  ) : (
  <button type='button' className='w-full' onClick={() => {
    if (setOpen) {
      setOpen(!open)
    }
  }}>
      <Element Menu={Menu} MenuIcon={MenuIcon} index={index} open={open} />
  </button>
  )
}

const Element = ({
  Menu,
  MenuIcon,
  index,
  open,
}: {
  Menu: any
  MenuIcon?: any
  index: number
  open: boolean
}) => {
  return (
    <li
      key={index}
      className={`hover:bg-light-white flex cursor-pointer items-center gap-x-4 p-2 text-sm text-gray-300 hover:text-secondary ${
        Menu.gap ? 'mt-9' : ''
      } ${open ? 'justify-start' : 'justify-center'}  `}
    >
      {MenuIcon && MenuIcon}
      <span className={`${!open && 'hidden'} origin-left duration-200`}>
        {Menu.title}
      </span>
    </li>
  )
}
