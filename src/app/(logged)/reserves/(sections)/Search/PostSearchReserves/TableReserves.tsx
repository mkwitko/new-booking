"use client";

import { ReservesContext } from "@/context/ReservesContext";
import { useContext } from "react";

export default function TableReserves() {
  const {
    reservesHook
  } = useContext(ReservesContext);
  
  console.log('reserves', reservesHook.reserves)  
  
  return (
    <>
    {reservesHook.reserves && reservesHook.reserves.length > 0 && (
     <div className="my-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="font-[600] text-primary md:text-large">
            Lista de Reservas
          </p>
        </div>
      </div>
    )}
    </>
  );
}
