import { geocodeLatLng, IGeoCodeProps } from "@/utils/MapUtils";
import { useState } from "react";

export default function UseMapHook() {

// radius
const [radius, setRadius] = useState<number>(200);

// map
const [map, setMap] = useState<google.maps.Map | null>(null);

// placeLatLng
const [placeLatLng, setPlaceLatLng] = useState({ coords: { lat: 0, lng: 0 }, label: '' });

// mapLatLng
const [mapLatLng, setMapLatLng] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });

// mapCenter
const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });

 const defaultCenter = { lat: -30.0467158, lng: -51.1886724 }; // Porto Alegre
 const center = mapCenter && mapCenter.lat ? mapCenter : defaultCenter;
 const [centerMap, setCenterMap] = useState(center);
 const [circleCenter, setCircleCenter] = useState(centerMap);

 const getAddress = (coords: { lat: number; lng: number }) => {
    geocodeLatLng(coords, (result: IGeoCodeProps) => {
      if (result.formatted_address) {
        const split = result.formatted_address.split(',');

        setPlaceLatLng({
          coords: { lat: result.lat, lng: result.lng },
          label: split.splice(0, 3).join(','),
        });
      }
    });
  }

  const moveToLocation = (coords: { lat: number; lng: number }) => {
    setMapLatLng(coords);
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
    mapCenter,
    circleCenter,
    moveToLocation,
    setMap,
    setRadius,
    setPlaceLatLng,
    setMapLatLng,
    setMapCenter,
  }
}