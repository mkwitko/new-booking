import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

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

export const mapStyle = [
  {
    featureType: 'poi.business',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
];

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

// busca as coordenadas da cidade selecionada no 'destino'
export async function getAddressCoords(label: string) {
  const coords =  await geocodeByAddress(label)
    .then((results) => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      return { lat, lng };
    });
  return coords
}

export function formaterCityName(city: any) {
  let cityName = city.cityName + ', ' + city?.countrySymbol + ', ' + city?.stateName
  return cityName
}