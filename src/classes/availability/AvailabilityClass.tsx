import CoreClass from "../core/CoreClass";
import {
  Hotels,
  IAvailResponse,
  IAvailVipPayload,
  IAvailVipQuery,
  IAvailVipResponse,
  availPayload,
} from "./DTO/AvailabilityDTO";
import useAvailabilityHook from "./hook/useAvailabilityHook";
import { DeleteMethods } from "./methods/delete";
import { GetMethods } from "./methods/get";
import { PostMethods } from "./methods/post";
import { PutMethods } from "./methods/put";
import {
  sortingByAvailability,
  validateSearchAvail,
} from "./helpers/AvailabilityHelper";

export default class AvailabilityClass extends CoreClass {
  override url = "availability";
  override cachePath = this.CACHE_PATH.AVAILABILITY.HOTELS;

  override hook: any = useAvailabilityHook();

  override getMethods = GetMethods;
  override postMethods = PostMethods;
  override putMethods = PutMethods;
  override deleteMethods = DeleteMethods;

  async searchAvail(data: availPayload): Promise<IAvailResponse> {
    validateSearchAvail(data);

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
      ?.filter((hotel: Hotels) => {
        return (
          hotel.roomTypes &&
          hotel.roomTypes.length > 0 &&
          hotel.roomTypes[0].averageRates &&
          hotel.roomTypes[0].averageRates.length > 0
        );
      })
      .sort(sortingByAvailability);

    response.hotels = filteredHotels;

    this.hook.setData(response);
    this.setCache(response, true);
    return response;
  }

  async getAvailVip(query: IAvailVipQuery) {
    const response = await this.getHttp({
      method: this.getMethods.vip,
      configs: {
        params: query.query,
        headers: {
          "X-Company-Id": query.companyId,
        },
      },
    });
    return response.data as IAvailVipResponse;
  }

  async saveAvailVip(query: IAvailVipPayload) {
    const { companyId } = query;
    delete query.companyId;
    const headers = companyId ? { "X-Company-Id": companyId } : undefined;
    const response = await this.postHttp({
      method: this.postMethods.vip,
      value: query,
      configs: {
        headers: headers,
      },
    });
    return response.data as IAvailVipResponse;
  }
}
