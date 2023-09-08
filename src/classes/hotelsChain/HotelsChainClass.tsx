import CoreClass from '../core/CoreClass'
import { IHotelChainResponse } from './DTO/HotelChainDTO'
import useHotelChainHook from './hook/useHotelChainHook'
import { DeleteMethods } from './methods/delete'
import { GetMethods } from './methods/get'
import { PostMethods } from './methods/post'
import { PutMethods } from './methods/put'

export default class HotelsChainClass extends CoreClass {
  override url = 'hotels-chain'
  override cachePath = this.CACHE_PATH.HOTELCHAIN

  override hook: any = useHotelChainHook()

  override getMethods = GetMethods
  override postMethods = PostMethods
  override putMethods = PutMethods
  override deleteMethods = DeleteMethods

  async getHotelChain(): Promise<IHotelChainResponse> {
    const data: IHotelChainResponse =
      await this.setClass<IHotelChainResponse>(false)
      
    this.hook.setData(data)
    return data
  }
}
