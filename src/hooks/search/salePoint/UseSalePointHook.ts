import { availPayload } from "@/classes/availability/DTO/AvailabilityDTO";
import { localeCitiesData } from "@/classes/locales/DTO/LocaleDTO";
import { CACHE_PATH } from "@/config/cache";
import { LoggedContext } from "@/context/LoggedContext";
import { get } from "@/services/cache";
import { useContext, useState } from "react";

export default function UseSalePointHook() {
  const { user } = useContext(LoggedContext);
  const searchingQuery: availPayload & {
    hotelCity: localeCitiesData;
  } = get(CACHE_PATH.AVAILABILITY.SEARCH_QUERY);
  // Sale Point
  const [salePoint, setSalePoint] = useState<string>(
    searchingQuery && searchingQuery.companyId
      ? searchingQuery.companyId?.toString()
      : "",
  );

  const findSalePointById = (id: string | number) => {
    const salesPoints = user.hook.data;
    console.log(salesPoints);
    const salePoint = salesPoints.find(
      (salePoint: any) => salePoint.companyId.toString() === id.toString(),
    );
    return salePoint;
  };

  return {
    salePoint,
    setSalePoint,
    findSalePointById,
  };
}
