import CoreClass from './core/CoreClass';
import HotelsChainClass from './hotelsChain/HotelsChainClass';
import LocalesClass from './locales/LocalesClass';
import UserClass from './user/UserClass';

export default function Classes() {
  const user = new UserClass();
  const hotelChain = new HotelsChainClass();
  const locale = new LocalesClass();
  const coreClass = new CoreClass();
  return {
    user,
    hotelChain,
    locale,
    coreClass,
  };
}
