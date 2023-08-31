'use client'

import React, { useState } from 'react';
import { Circle } from '@react-google-maps/api';

interface MapCircleProps {
  center: google.maps.LatLngLiteral;
  radius: number;
  onRadiusChange: (radius: number) => void;
}

export default function MapCircle({ center, radius, onRadiusChange }: MapCircleProps) {
  const [circle, setCircle] = useState<any>(null);

  return (
    <Circle
      center={center}
      radius={radius} // Convert radius from kilometers to meters
      options={{
        strokeColor: '#5064C3',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#5064C3',
        fillOpacity: 0.35,
        draggable: true,
        editable: true,
      }}
      onLoad={(circle) => setCircle(circle)}
      onUnmount={() => setCircle(null)}
      onRadiusChanged={() => {
        if (circle) {
          onRadiusChange(circle.radius);
        }
      }}
    />
  );
}
