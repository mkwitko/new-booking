export interface PlaceProps {
  coords: google.maps.LatLngLiteral;
  label: string;
}

export interface MapAutocompleteProps {
  onSelectPlace: (coords: PlaceProps) => void;
  placeLabel?: string;
  map: any;
}

export interface IGeoCodeProps {
  lat: number;
  lng: number;
  formatted_address: string;
}

export function geocodeLatLng(latlng: google.maps.LatLngLiteral, cb: (result: IGeoCodeProps) => void) {
  const geocoder = new google.maps.Geocoder();

  geocoder
    .geocode({ location: latlng })
    .then((response: any) => {
      if (typeof cb === 'function') {
        cb({ lat: latlng.lat, lng: latlng.lng, formatted_address: response.results[0].formatted_address });
      }
    })
    .catch((e) => console.log(`Geocoder failed due to: ${e}`));
}

export function kmFormatter(num: any) {
  const calc: any = Math.abs(num) / 1000;
  return `${Math.sign(num) * calc.toFixed(1)}km`;
}