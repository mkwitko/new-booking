import { toast } from "react-toastify";
import CoreClass from "../core/CoreClass";
import { Hotels, IAvailResponse, IAvailVipQuery, IAvailVipResponse, availPayload } from "./DTO/AvailabilityDTO";
import useAvailabilityHook from "./hook/useAvailabilityHook";
import { DeleteMethods } from "./methods/delete";
import { GetMethods } from "./methods/get";
import { PostMethods } from "./methods/post";
import { PutMethods } from "./methods/put";

export default class AvailabilityClass extends CoreClass {
  override url = "availability";
  override cachePath = this.CACHE_PATH.AVAILABILITY.HOTELS;

  override hook: any = useAvailabilityHook();

  override getMethods = GetMethods;
  override postMethods = PostMethods;
  override putMethods = PutMethods;
  override deleteMethods = DeleteMethods;

  async searchAvail(data: availPayload): Promise<IAvailResponse> {
    this.validateSearchAvail(data);

    const companyId = data.companyId;
    delete data.companyId;
    const response: IAvailResponse = await this.postHttp({
      value: data,
      configs: {
        headers: {
          "X-Company-Id": companyId,
        },
      },
    });

    const filteredHotels = response.hotels
      .filter((hotel: Hotels) => {
        return (
          hotel.roomTypes &&
          hotel.roomTypes.length > 0 &&
          hotel.roomTypes[0].averageRates &&
          hotel.roomTypes[0].averageRates.length > 0
        );
      })
      .sort(this.sortingByAvailability);

    response.hotels = filteredHotels;

    this.hook.setData(response);
    this.setCache(response, true);
    return response;
  }

  async getAvailVip(query: IAvailVipQuery) {
    const response = await this.getHttp({
      method: 'vip',
      configs: {
          params: query.query,
          headers: {
            'X-Company-Id': query.companyId,
          },
      },
    })
    return response.data as IAvailVipResponse;
  }

  private sortingByAvailability = (a: Hotels, b: Hotels) => {
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

  private validateSearchAvail(data: availPayload) {
    if (!data.companyId) toast.error("Selecione um ponto de venda");
    else if (!data.hotelCityId) toast.error("Selecione um destino");
    else if (!data.checkinDate) toast.error("Selecione uma data de entrada");
    else if (!data.checkoutDate) toast.error("Selecione uma data de saída");
  }
}
