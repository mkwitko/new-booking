import { toast } from "react-toastify";
import { Hotels, availPayload } from "../DTO/AvailabilityDTO";

export const sortingByAvailability = (a: Hotels, b: Hotels) => {
  const availability: Array<{
    id: number;
    name: "NON" | "VIP" | "PUB";
  }> = [
    {
      id: 1,
      name: "PUB",
    },
    {
      id: 2,
      name: "VIP",
    },
    {
      id: 3,
      name: "NON",
    },
  ];
  const value1 = availability.find(
    (e) => e.name === a.roomTypes[0].availability,
  );
  const value2 = availability.find(
    (e) => e.name === b.roomTypes[0].availability,
  );
  return value1!.id < value2!.id ? -1 : value1!.id > value2!.id ? 1 : 0;
};

export const validateSearchAvail = (data: availPayload) => {
  if (!data.companyId) toast.error("Selecione um ponto de venda");
  else if (!data.hotelCityId) toast.error("Selecione um destino");
  else if (!data.checkinDate) toast.error("Selecione uma data de entrada");
  else if (!data.checkoutDate) toast.error("Selecione uma data de saída");
};
