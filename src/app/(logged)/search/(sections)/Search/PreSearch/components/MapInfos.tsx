'use client'

import React from 'react'
import { kmFormatter } from '@/utils/MapUtils';

export function MapInfos({
  radius,
  placeLatLng,
}: {
  radius: number,
  placeLatLng: { coords: { lat: number, lng: number }, label: string }
}) {
  return (
    <>
        <div className="flex flex-row">
          <div className="flex mr-3">
            <p className="text-textSecondary font-bold mr-1">Raio: </p>
            <p className="font-light">{kmFormatter(radius)}</p>
          </div>
          {placeLatLng.label && (
            <div className="flex">
              <p className="text-textSecondary font-bold ml-6 mr-1">Endereço: </p>
              <p className="font-light">{placeLatLng.label}</p>
            </div>
          )}
        </div>
    </>
  )
}
