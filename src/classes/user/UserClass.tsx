import CoreClass from '../core/CoreClass';
import useUserHook from './hook/useUserHook';
import { DeleteMethods } from './methods/delete';
import { GetMethods } from './methods/get';
import { PostMethods } from './methods/post';
import { PutMethods } from './methods/put';

export default class UserClass extends CoreClass {
  override url = 'user/v1/users';
  override cachePath = 'user';

  override hook: any = useUserHook();

  override getMethods = GetMethods;
  override postMethods = PostMethods;
  override putMethods = PutMethods;
  override deleteMethods = DeleteMethods;
}
