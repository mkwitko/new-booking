import {
  IGetBookingResponse,
  IQueryGetBookings,
} from "@/DTO/reserves/ReservesDTO";
import CoreClass from "../core/CoreClass";
import useAvailabilityHook from "./hook/useBookingHook";
import { DeleteMethods } from "./methods/delete";
import { GetMethods } from "./methods/get";
import { PostMethods } from "./methods/post";
import { PutMethods } from "./methods/put";
import {
  IRequestQuery,
  IAvailVipResponse,
} from "../availability/DTO/AvailabilityDTO";

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
      body: data,
    });
    return response;
  }

  async findBookings(query: IQueryGetBookings) {
    const response = await this.getHttp({
      configs: {
        params: query,
      },
    });
    return response.data as IGetBookingResponse;
  }

  async searchRequesties(query: IRequestQuery) {
    const response = await this.getHttp({
      method: this.getMethods.policiesFind,
      configs: {
        params: query.query,
        headers: query.companyId
          ? { "X-Company-Id": query.companyId.toString() }
          : undefined,
      },
    });

    return response.data as IAvailVipResponse;
  }

  async editBookingRequest(data: {
    observation: string;
    reservationNumber: string;
    type: string;
  }): Promise<any> {
    try {
      const response = await this.postHttp({
        method: this.postMethods.policies,
        body: data,
      });
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
