import CoreClass from "../core/CoreClass";

import { DeleteMethods } from "./methods/delete";
import { GetMethods } from "./methods/get";
import { PostMethods } from "./methods/post";
import { PutMethods } from "./methods/put";

import useCardHook from "./hook/useCardHook";

export default class CardClass extends CoreClass {
  override url = "cards";
  override cachePath = this.CACHE_PATH.CARDS.DEFAULT;

  override hook: any = useCardHook();

  override getMethods = GetMethods;
  override postMethods = PostMethods;
  override putMethods = PutMethods;
  override deleteMethods = DeleteMethods;

  async getCustomerCards(customerId: string): Promise<any> {
    const { cardList, vcnList } = await this.getHttp({
      method: `?customerAlphaId=${customerId}`,
    });

    this.hook.setData([...cardList, ...vcnList]);
  }
}
