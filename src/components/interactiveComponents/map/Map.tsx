"use client";

import * as React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import MapCircle from "./MapCircle";
import { mapStyle } from "@/utils/MapUtils";
import { isMobile } from "@/utils/B2BUtils";
import { SearchContext } from "@/context/SearchContext";
import { useContext } from "react";

export function Map({ setShowMap }: { setShowMap: (value: boolean) => void }) {
  const { mapHook, cityHook } = useContext(SearchContext);
  const {
    radius,
    center,
    centerMap,
    circleCenter,
    moveToLocation,
    setMap,
    setPlaceLatLng,
    setMapLatLng,
    setRadius,
  } = mapHook;
  const { findCityById } = cityHook;
  function onMapLoad(map: google.maps.Map) {
    setMap(map);
  }

  return (
    <div className="h-96 w-full">
      <Box
        sx={{
          marginTop: "20px",
          right: 40,
          position: "absolute",
          zIndex: 300,
        }}
        className="rounded-full bg-errorDark shadow-lg"
      >
        <IconButton
          onClick={() => {
            setShowMap(false);
            setShowMap(false);
            setPlaceLatLng({ coords: { lat: 0, lng: 0 }, label: "" });
            setMapLatLng({ lat: 0, lng: 0 });
          }}
          className="rounded-full bg-errorDark shadow-lg"
        >
          <Close className="text-white" />
        </IconButton>
      </Box>
      <LoadScript
        googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`}
      >
        <GoogleMap
          onClick={({ latLng }) =>
            moveToLocation({
              lat: Number(latLng?.lat()),
              lng: Number(latLng?.lng()),
            })
          }
          onLoad={(map: any) => onMapLoad(map)}
          mapContainerClassName="w-full h-full rounded-tr-lg rounded-tl-lg"
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: "0.625rem",
            borderTopRightRadius: "0.625rem",
          }}
          // trocar o centerMap pela lat lng da cidade pré selecionada ou abrir a cidade de porto alegre
          center={centerMap}
          zoom={13}
          options={{
            draggableCursor: "crosshair",
            mapTypeId: window.google?.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            zoomControl: true,
            streetViewControl: false,
            fullscreenControl: isMobile(),
            styles: mapStyle,
          }}
        >
          <MapCircle
            center={circleCenter}
            radius={radius}
            onRadiusChange={(rad) => setRadius(rad)}
          />
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
