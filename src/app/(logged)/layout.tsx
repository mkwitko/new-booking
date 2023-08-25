'use client'

import Header from '@/components/coreComponents/Header'
import { LoggedContextProvider } from '@/context/LoggedContext'
import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  //   const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col">
      <Header showRouteIcons={true} />
      <div className="flex">
        <LoggedContextProvider>
          <div className="fixed bottom-0 left-0 top-[70px] z-50  w-[16rem] bg-primaryDark"></div>
          {/* <SideBar
            open={open}
            setOpen={setOpen}
          /> */}
          <div className="w-full pl-[16rem]">{children}</div>
        </LoggedContextProvider>
      </div>
    </div>
  )
}
