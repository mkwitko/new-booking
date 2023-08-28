/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { ComponentType } from 'react';

export default function SingleElement({
  Menu,
  index,
  open = false,
  MenuIcon,
}: {
  Menu: any;
  index: number;
  open?: boolean;
  MenuIcon?: any;
}) {
  return Menu.path ? (
    <Link href={Menu.path || ''}>
   <Element Menu={Menu} MenuIcon={MenuIcon} index={index} open={open} />
    </Link>
  ) : (
   <Element Menu={Menu} MenuIcon={MenuIcon} index={index} open={open} />
  );
}

const Element = ({Menu, MenuIcon, index, open}: {
    Menu: any;
    MenuIcon?: any;
    index: number;
    open: boolean;
}) => {
    return (
        <li
        key={index}
        className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
${Menu.gap ? 'mt-9' : ''} ${index === 0 && 'bg-light-white'} `}
      >
        {MenuIcon && MenuIcon}
        <span className={`${!open && 'hidden'} origin-left duration-200`}>
          {Menu.title}
        </span>
      </li>
    )
}
