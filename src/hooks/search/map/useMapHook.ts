import { geocodeLatLng, IGeoCodeProps } from "@/utils/MapUtils";
import { useState } from "react";

export default function useMapHook() {
  // radius
  const [radius, setRadius] = useState<number>(200);
  function handleChangeRadius(value: number) {
    setRadius(value);
  }

  // map
  const [map, setMap] = useState<google.maps.Map | null>(null);
  function handleChangeMap(value: google.maps.Map | null) {
    setMap(value);
  }

  // placeLatLng
  const [placeLatLng, setPlaceLatLng] = useState({
    coords: { lat: 0, lng: 0 },
    label: "",
  });

  function handleChangePlaceLatLng(value: {
    coords: google.maps.LatLngLiteral;
    label: string;
  }) {
    setPlaceLatLng(value);
  }

  // mapLatLng
  const [mapLatLng, setMapLatLng] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  function handleChangeMapLatLng(value: google.maps.LatLngLiteral) {
    setMapLatLng(value);
  }

  // mapCenter
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  function handleChangeMapCenter(value: google.maps.LatLngLiteral) {
    setMapCenter(value);
  }

  //   TODO pegar a localização do usuário
  const defaultCenter = { lat: -30.0467158, lng: -51.1886724 }; // Porto Alegre
  const center = mapCenter && mapCenter.lat ? mapCenter : mapLatLng;
  const [centerMap, setCenterMap] = useState(defaultCenter);
  const [circleCenter, setCircleCenter] = useState(centerMap);

  function getAddress(coords: { lat: number; lng: number }) {
    geocodeLatLng(coords, (result: IGeoCodeProps) => {
      if (result.formatted_address) {
        const split = result.formatted_address.split(",");

        handleChangePlaceLatLng({
          coords: { lat: result.lat, lng: result.lng },
          label: split.splice(0, 3).join(","),
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
    handleChangeMapLatLng,
  };
}
