'use client'

import * as React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box, IconButton } from "@mui/material";
import { Close } from '@mui/icons-material';
import MapCircle from './MapCircle';
import { mapStyle } from '@/utils/MapUtils';
import { isMobile } from '@/utils/B2BUtils';

export function Map({
  setShowMap,
  radius,
  center,
  centerMap,
  circleCenter,
  moveToLocation,
  setMap,
  setPlaceLatLng,
  setMapLatLng,
  setRadius,
  city,
}: {
  setShowMap: (value: boolean) => void,
  radius: number,
  center: google.maps.LatLngLiteral,
  centerMap: google.maps.LatLngLiteral,
  circleCenter: google.maps.LatLngLiteral,
  moveToLocation: (coords: { lat: number; lng: number }) => void,
  setMap: (value: google.maps.Map) => void,
  setPlaceLatLng: (value: { coords: { lat: 0, lng: 0 }, label: '' }) => void,
  setMapLatLng: (value: google.maps.LatLngLiteral) => void,
  setRadius: (value: number) => void,
  city: any
}) {
  
  function onMapLoad(map: google.maps.Map) {
    setMap(map);
  }

  return (
    <div className="w-full h-96">
    <Box
      sx={{
        marginTop: '20px',
        right: 40,
        position: 'absolute',
        zIndex: 300,
      }}
      className="bg-errorDark rounded-full shadow-lg"
    >
      <IconButton
        onClick={() => {
          setShowMap(false)
          setShowMap(false);
          setPlaceLatLng({ coords: { lat: 0, lng: 0 }, label: '' });
          setMapLatLng({ lat: 0, lng: 0 });
        }}
      >
        <Close className="text-white" />
      </IconButton>
    </Box>
    <LoadScript googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`}>
      <GoogleMap
        onClick={({ latLng }) => moveToLocation({ lat: Number(latLng?.lat()), lng: Number(latLng?.lng()) })}
        onLoad={(map: any) => onMapLoad(map)}
        mapContainerClassName="w-full h-full rounded-tr-lg rounded-tl-lg"
        mapContainerStyle={{
          width: '100%',
          height: '100%',
          borderTopLeftRadius: '0.625rem',
          borderTopRightRadius: '0.625rem',
        }}
        // trocar o centerMap pela lat lng da cidade pré selecionada ou abrir a cidade de porto alegre
        center={centerMap}
        zoom={13}
        options={{
          draggableCursor: 'crosshair',
          mapTypeId: window.google?.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: isMobile(),
          styles: mapStyle,
        }}
      >
        <MapCircle center={circleCenter} radius={radius} onRadiusChange={(rad) => setRadius(rad)} />
        <Marker 
          position={center}
        />
      </GoogleMap>
    </LoadScript>
  </div>
  )
}
