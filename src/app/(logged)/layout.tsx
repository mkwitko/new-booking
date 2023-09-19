"use client";

import Header from "@/components/coreComponents/Header";
import SideBar from "@/components/coreComponents/Sidebar/Sidebar";
import { LoggedContextProvider } from "@/context/LoggedContext";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="flex flex-col">
      <Header showRouteIcons={true} setOpen={setOpen} />

      <div className="mt-[70px] flex">
        <LoggedContextProvider>
          <SideBar open={open} setOpen={setOpen} />
          <div className="w-full sm:ml-16 sm:w-[calc(100%-4rem)]">
            {children}
          </div>
        </LoggedContextProvider>
      </div>
    </div>
  );
}
