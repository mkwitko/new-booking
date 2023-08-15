import CoreClass from './core/CoreClass'
import UserClass from './user/UserClass'

export default function Classes() {
  const user = new UserClass()
  const coreClass = new CoreClass()
  return {
    user,
    coreClass,
  }
}
