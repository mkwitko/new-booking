"use client";

import * as React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import MapCircle from "./MapCircle";
import { SearchContext } from "@/context/SearchContext";

export function Map({ setShowMap }: { setShowMap: (value: boolean) => void }) {
  const { mapHook } = React.useContext(SearchContext);
  const {
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
  } = mapHook;

  function onMapLoad(map: google.maps.Map) {
    handleChangeMap(map);
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
            handleChangePlaceLatLng({ coords: { lat: 0, lng: 0 }, label: "" });
            handleChangeMapLatLng({ lat: 0, lng: 0 });
          }}
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
          mapContainerStyle={{ width: "100%", height: "100%" }}
          //TODO trocar o centerMap pela lat lng da cidade pré selecionada ou abrir a cidade de porto alegre
          center={centerMap}
          zoom={13}
          options={{
            draggableCursor: "crosshair",
            mapTypeId: window.google?.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            zoomControl: true,
            streetViewControl: false,
            fullscreenControl: false,
          }}
        >
          <MapCircle
            center={circleCenter}
            radius={radius}
            onRadiusChange={(rad) => handleChangeRadius(rad)}
          />
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
