import { toast } from 'react-toastify'
import CoreClass from '../core/CoreClass'
import { DeleteMethods } from './methods/delete'
import { GetMethods } from './methods/get'
import { PostMethods } from './methods/post'
import { PutMethods } from './methods/put'
import useCustomerHook from './hook/useCustomerHook'

export default class CustomerClass extends CoreClass {
  override url = 'customers'
  override cachePath = this.CACHE_PATH.CUSTOMER.DEFAULT

  override hook: any = useCustomerHook()

  override getMethods = GetMethods
  override postMethods = PostMethods
  override putMethods = PutMethods
  override deleteMethods = DeleteMethods

  async getCustomers(): Promise<any> {
    const data = await this.setClass(true)
    this.hook.setData(data.data)

    return data.data
  }

  async findBookingAttributes(customerId: string): Promise<void> {
    const { data } = await this.getHttp(`${customerId}/booking-attributes`)
    if (data) {
      this.hook.setBookingAttributes(this.treatData(data))
    }
  }

  treatData(data: any) { 
    return data.map((item: any) => ({
    fieldName: item.attributeDescription,
    required: item.mandatory,
    type: item.bookingAttributesDomain.type,
    options: item.validation ? [...item.validation] : null,
  }))}

  async findCostCenter(customerId: string): Promise<void> {
    const { data } = await this.getHttp(`${customerId}/cost-center`)
    this.hook.setCostCenter(data);
  }
}
