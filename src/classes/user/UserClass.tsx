import CoreClass from "../core/CoreClass";
import { ISalesPointResponse } from "./DTO/AgenciesStoresDTO";
import useHotelChainHook from "./hook/useUserHook";
import { DeleteMethods } from "./methods/delete";
import { GetMethods } from "./methods/get";
import { PostMethods } from "./methods/post";
import { PutMethods } from "./methods/put";

export default class UserClass extends CoreClass {
  override url = "users";
  override cachePath = this.CACHE_PATH.USER.AGENCIES_STORES;

  override hook: any = useHotelChainHook();

  override getMethods = GetMethods;
  override postMethods = PostMethods;
  override putMethods = PutMethods;
  override deleteMethods = DeleteMethods;

  async getAgenciesStores(): Promise<ISalesPointResponse> {
    const data: ISalesPointResponse = await this.setClass<ISalesPointResponse>({
      shouldUpdate: false,
      method: this.getMethods.agenciesStores,
    });
    this.hook.setData(data);
    return data;
  }
}
