import CoreClass from "../core/CoreClass";
import { DeleteMethods } from "./methods/delete";
import { GetMethods } from "./methods/get";
import { PostMethods } from "./methods/post";
import { PutMethods } from "./methods/put";
import useCustomerHook from "./hook/useCustomerHook";
import { treatData } from "./Helpers/CustomerHelper";

export default class CustomerClass extends CoreClass {
  override url = "customers";
  override cachePath = this.CACHE_PATH.CUSTOMER.DEFAULT;

  override hook: any = useCustomerHook();

  override getMethods = GetMethods;
  override postMethods = PostMethods;
  override putMethods = PutMethods;
  override deleteMethods = DeleteMethods;

  async getCustomers(): Promise<any> {
    const data = await this.setClass({ shouldUpdate: false });
    this.hook.setData(data);
    return data;
  }

  async findBookingAttributes(customerId: string): Promise<void> {
    const { data } = await this.getHttp({
      method: `${customerId}/${this.getMethods.bookingAttributes}`,
    });
    if (data) {
      this.hook.setBookingAttributes(treatData(data));
    }
  }

  async findCostCenter(customerId: string): Promise<void> {
    const { data } = await this.getHttp({
      method: `${customerId}/${this.getMethods.costCenter}`,
    });
    console.log('data - ', data);
    this.hook.setCostCenter(data);
  }
}
