'use client'

import { geocodeLatLng, IGeoCodeProps } from "@/utils/MapUtils";
import { ReactNode, createContext, useContext, useState } from "react";

interface MapContextProviderProps {
    children: ReactNode
}

interface MapContextProps {
    radius: number,
    handleChangeRadius: (value: number) => void
    map: google.maps.Map | null,
    handleChangeMap: (value: google.maps.Map | null) => void
    placeLatLng: {coords: google.maps.LatLngLiteral, label: string},
    handleChangePlaceLatLng: (value: {coords: google.maps.LatLngLiteral, label: string}) => void
    mapLatLng: google.maps.LatLngLiteral,
    handleChangeMapLatLng: (value: google.maps.LatLngLiteral) => void
    mapCenter: google.maps.LatLngLiteral
    handleChangeMapCenter: (value: google.maps.LatLngLiteral) => void
}

export const MapContext = createContext ({} as MapContextProps)

export const MapContextProvider = ({children}: MapContextProviderProps) => {

    // radius
    const [radius, setRadius] = useState<number>(200);
    function handleChangeRadius(value: number) { 
        setRadius(value) 
    }
  
    // map
    const [map, setMap] = useState<google.maps.Map | null>(null);
    function handleChangeMap(value: google.maps.Map | null) { 
        setMap(value) 
    }
  
    // placeLatLng
    const [placeLatLng, setPlaceLatLng] = useState({ coords: { lat: 0, lng: 0 }, label: '' });
    function handleChangePlaceLatLng(value: {coords: google.maps.LatLngLiteral, label: string}) { 
        setPlaceLatLng(value) 
    }
  
    // mapLatLng
    const [mapLatLng, setMapLatLng] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
    function handleChangeMapLatLng(value: google.maps.LatLngLiteral) { 
        setMapLatLng(value) 
    }
  
    // mapCenter
    const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
    function handleChangeMapCenter(value: google.maps.LatLngLiteral) { 
        setMapCenter(value) 
    }

    return (
        <MapContext.Provider 
        value={{
                radius,
                handleChangeRadius,
                map,
                handleChangeMap,
                placeLatLng,
                handleChangePlaceLatLng,
                mapLatLng,
                handleChangeMapLatLng,
                mapCenter,
                handleChangeMapCenter
            }}>{children}</MapContext.Provider>
    )
}

export function useMapContext() {
 const {
    radius,
    handleChangeRadius,
    map,
    handleChangeMap,
    placeLatLng,
    handleChangePlaceLatLng,
    mapLatLng,
    handleChangeMapLatLng,
    mapCenter,
    handleChangeMapCenter
 } = useContext(MapContext)

 const defaultCenter = { lat: -30.0467158, lng: -51.1886724 }; // Porto Alegre
 const center = mapCenter && mapCenter.lat ? mapCenter : mapLatLng;
 const [centerMap, setCenterMap] = useState(defaultCenter);
 const [circleCenter, setCircleCenter] = useState(centerMap);

 function getAddress(coords: { lat: number; lng: number }) {
    geocodeLatLng(coords, (result: IGeoCodeProps) => {
      if (result.formatted_address) {
        const split = result.formatted_address.split(',');

        handleChangePlaceLatLng({
          coords: { lat: result.lat, lng: result.lng },
          label: split.splice(0, 3).join(','),
        });
      }
    });
  }

  function moveToLocation(coords: { lat: number; lng: number }) {
    handleChangeMapLatLng(coords);
    getAddress(coords);
    setCenterMap(coords);
    setCircleCenter(coords);
    const center = new google.maps.LatLng(coords);
    map?.panTo(center);
  }

  return {
    radius,
    placeLatLng,
    mapLatLng,
    getAddress,
    center,
    centerMap,
    circleCenter,
    moveToLocation,
    handleChangeMap,
    handleChangeRadius,
    handleChangePlaceLatLng,
    handleChangeMapLatLng
  }
}