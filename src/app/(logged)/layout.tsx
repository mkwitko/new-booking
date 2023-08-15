'use client';

import Header from '@/components/coreComponents/Header';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  //   const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col">
      <Header showRouteIcons={true} />
      <div className="flex">
        {/* <DashContextProvider> */}
        {/* <SideBar
            open={open}
            setOpen={setOpen}
          /> */}
        <div className="w-full">{children}</div>
        {/* </DashContextProvider> */}
      </div>
    </div>
  );
}
