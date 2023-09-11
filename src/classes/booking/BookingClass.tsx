import { IQueryGetBookings } from "@/DTO/reserves/ReservesDTO";
import CoreClass from "../core/CoreClass";
import useAvailabilityHook from "./hook/useBookingHook";
import { DeleteMethods } from "./methods/delete";
import { GetMethods } from "./methods/get";
import { PostMethods } from "./methods/post";
import { PutMethods } from "./methods/put";
import { IRequestQuery, IAvailVipResponse } from "../availability/DTO/AvailabilityDTO";

export default class BookingClass extends CoreClass {
  override url = "bookings";
  override cachePath = this.CACHE_PATH.BOOKING.DEFAULT;

  override hook: any = useAvailabilityHook();

  override getMethods = GetMethods;
  override postMethods = PostMethods;
  override putMethods = PutMethods;
  override deleteMethods = DeleteMethods;

  async createBooking(data: any) {
    const response = await this.postHttp({
      value: data,
    });
    return response;
  }

  async findBookings(query: IQueryGetBookings) {
    const response = await this.getHttp({
      configs: {
          params: query
      }
    })
    return response;
  }

  async searchRequesties(query: IRequestQuery) {
    const response = await this.getHttp({
      method: 'policies/find',
      configs: {
          params: query.query,
          headers: query.companyId ? 
          {
            'X-Company-Id': query.companyId,
          } :
          undefined,
      },
    });

    return response.data as IAvailVipResponse;
  }
}
