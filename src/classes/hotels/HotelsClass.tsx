import CoreClass from "../core/CoreClass";
import { DeleteMethods } from "./methods/delete";
import { GetMethods } from "./methods/get";
import { PostMethods } from "./methods/post";
import { PutMethods } from "./methods/put";
import useHotelHook from "./hook/useHotelsHook";
import { set } from "@/services/cache";

export default class HotelsClass extends CoreClass {
  override url = "hotels";
  override cachePath = this.CACHE_PATH.HOTELS.DEFAULT;

  override hook: any = useHotelHook();

  override getMethods = GetMethods;
  override postMethods = PostMethods;
  override putMethods = PutMethods;
  override deleteMethods = DeleteMethods;

  getHotelDetails = async (hotelId?: string) => {
    this.setClass({
      shouldUpdate: false,
      method: hotelId ? hotelId : this.hook.currentHotel.hotelAlphaId,
      cachePath: this.CACHE_PATH.HOTELS.CURRENT_HOTEL_DETAILS,
    }).then((data) => {
      this.hook.setCurrentHotelDetails(data);
      set(this.CACHE_PATH.HOTELS.CURRENT_HOTEL_DETAILS, data);
    });
  };
}
