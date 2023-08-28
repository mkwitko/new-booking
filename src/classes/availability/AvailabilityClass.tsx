import { toast } from 'react-toastify'
import CoreClass from '../core/CoreClass'
import { IAvailResponse, availPayload } from './DTO/AvailabilityDTO'
import useAvailabilityHook from './hook/useAvailabilityHook'
import { DeleteMethods } from './methods/delete'
import { GetMethods } from './methods/get'
import { PostMethods } from './methods/post'
import { PutMethods } from './methods/put'

export default class AvailabilityClass extends CoreClass {
  override url = 'availability'
  override cachePath = this.CACHE_PATH.AVAILABILITY.HOTELS

  override hook: any = useAvailabilityHook()

  override getMethods = GetMethods
  override postMethods = PostMethods
  override putMethods = PutMethods
  override deleteMethods = DeleteMethods

  async searchAvail(data: availPayload): Promise<IAvailResponse> {
    this.validateSearchAvail(data)

    const companyId = data.companyId
    delete data.companyId
    const response: IAvailResponse = await this.postHttp('', data, '', {
      headers: {
        'X-Company-Id': companyId,
      },
    })
    this.hook.setData(response)
    this.setCache(response, true)
    return response
  }

  private validateSearchAvail(data: availPayload) {
    if (!data.companyId) toast.error('Selecione um ponto de venda')
    else if (!data.hotelCityId) toast.error('Selecione um destino')
    else if (!data.checkinDate) toast.error('Selecione uma data de entrada')
    else if (!data.checkoutDate) toast.error('Selecione uma data de saída')
  }
}
