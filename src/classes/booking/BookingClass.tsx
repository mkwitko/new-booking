import CoreClass from "../core/CoreClass";
import useAvailabilityHook from "./hook/useBookingHook";
import { DeleteMethods } from "./methods/delete";
import { GetMethods } from "./methods/get";
import { PostMethods } from "./methods/post";
import { PutMethods } from "./methods/put";

export default class BookingClass extends CoreClass {
  override url = "bookings";
  override cachePath = this.CACHE_PATH.BOOKING.DEFAULT;

  override hook: any = useAvailabilityHook();

  override getMethods = GetMethods;
  override postMethods = PostMethods;
  override putMethods = PutMethods;
  override deleteMethods = DeleteMethods;

  async createBooking(data: any) {
    try {
      const response = await this.postHttp("", data);
      return response;
    } catch(error: any) {
      throw new Error(error.message);
    }
  }
}
