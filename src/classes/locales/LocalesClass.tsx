import CoreClass from "../core/CoreClass";
import { ILocaleCitiesResponse } from "./DTO/LocaleDTO";
import useLocalesHook from "./hook/useHotelChainHook";
import { DeleteMethods } from "./methods/delete";
import { GetMethods } from "./methods/get";
import { PostMethods } from "./methods/post";
import { PutMethods } from "./methods/put";

export default class LocalesClass extends CoreClass {
  override url = "locales";
  override cachePath = this.CACHE_PATH.LOCALES.CITIES;

  override hook: any = useLocalesHook();

  override getMethods = GetMethods;
  override postMethods = PostMethods;
  override putMethods = PutMethods;
  override deleteMethods = DeleteMethods;

  async getLocales(): Promise<any> {
    const data: ILocaleCitiesResponse[] =
      await this.setClass<ILocaleCitiesResponse>({
        shouldUpdate: false,
        method: this.getMethods.cities,
      });
    this.hook.setData(data);
    return data;
  }
}
