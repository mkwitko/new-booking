import CoreClass from '../core/CoreClass'

import { DeleteMethods } from './methods/delete'
import { GetMethods } from './methods/get'
import { PostMethods } from './methods/post'
import { PutMethods } from './methods/put'

import useCardHook from './hook/useCardHook'

type CardListType = {
  brand: string
  cardNumber: string
  entity: string
  lastModified: string
  tokenized: string
  typecard: string
}

type VcnList = {
  rcnToken: string,
  typecard: string
  entity: string
}

export default class CardClass extends CoreClass {
  override url = 'cards'
  override cachePath = this.CACHE_PATH.CARDS.DEFAULT

  override hook: any = useCardHook()

  override getMethods = GetMethods
  override postMethods = PostMethods
  override putMethods = PutMethods
  override deleteMethods = DeleteMethods

  async getCards(): Promise<any> {
    const { cardList, vcnList } = await this.getHttp('')
    this.hook.setData([ ...cardList, ...vcnList])
    return [ ...cardList, ...vcnList]
  }
}
