import CustomerClass from "./customer/CustomerClass";
import AvailabilityClass from "./availability/AvailabilityClass";
import CoreClass from "./core/CoreClass";
import HotelsChainClass from "./hotelsChain/HotelsChainClass";
import LocalesClass from "./locales/LocalesClass";
import UserClass from "./user/UserClass";
import CardClass from "./card/CardClass";
import HotelsClass from "./hotels/HotelsClass";

export default function Classes() {
  const user = new UserClass();
  const hotelChain = new HotelsChainClass();
  const locale = new LocalesClass();
  const availability = new AvailabilityClass();
  const coreClass = new CoreClass();
  const customer = new CustomerClass();
  const card = new CardClass();
  const hotels = new HotelsClass();

  return {
    user,
    hotelChain,
    locale,
    availability,
    coreClass,
    customer,
    card,
    hotels,
  };
}
