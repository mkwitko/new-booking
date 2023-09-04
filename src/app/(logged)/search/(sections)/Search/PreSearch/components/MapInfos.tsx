"use client";

import React, { useContext } from "react";
import { kmFormatter } from "@/utils/MapUtils";
import { SearchContext } from "@/context/SearchContext";

export default function MapInfos() {
  const { mapHook } = useContext(SearchContext);
  const { radius, placeLatLng } = mapHook;

  return (
    <>
      <div className="flex flex-row">
        <div className="mr-3 flex">
          <p className="mr-1 font-bold text-textSecondary">Raio: </p>
          <p className="font-light">{kmFormatter(radius)}</p>
        </div>
        {placeLatLng.label && (
          <div className="flex">
            <p className="ml-6 mr-1 font-bold text-textSecondary">Endereço: </p>
            <p className="font-light">{placeLatLng.label}</p>
          </div>
        )}
      </div>
    </>
  );
}
