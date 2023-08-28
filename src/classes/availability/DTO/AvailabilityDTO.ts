import { DefaultError } from '@/DTO/DefaultError'

export type availPayload = {
  chainId?: number
  bookingId?: number
  hotelCityId?: number
  hotelChainId?: string
  hotelId?: number | string
  hotelName?: string
  hotelNeighborhood?: string
  roomTypeId?: string
  rateId?: string
  roomsQuantity?: number
  minPaxValue?: number
  maxPaxValue?: number
  customerId?: number
  checkinDate: Date
  checkoutDate: Date
  adultGuestCount: string | number
  enforceAvailability: boolean
  position?: {
    latitude: string
    longitude: string
    distance: number
  }
  companyId?: number // use in header
}

export interface Award {
  provider: string
  value: string
}

export interface BillingItem {
  code: string
}

export interface Description {
  type: string
  value: string
}

export interface Billing {
  id: string
  code: string
  description: string
  billingItem?: BillingItem
}

export interface MealIncludedCodes {
  id: string
  code: 'SP' | 'AI' | 'CM' | 'MP' | 'MA' | 'MJ' | 'PC'
  value: string
}

export interface CreditCardBrandsAccepted {
  id: string
  code: string
  value: string
}

export interface Location {
  address: string
  neighborhood: string
  cityName: string
  cityIBGECode: number
  postalCode: string
  stateAbbreviation: string
  contryCode: string
  contryName: string
  latitude: number
  longitude: number
}

export interface Rates {
  id: number
  name: string
  currencyCode?: string
  corporate: boolean
  commissioned: boolean
  mealIncluded: MealIncludedCodes
}

export interface Periods {
  id: number
  startDate: Date
  endDate: Date
  amountBeforeTax: number
}

export interface Taxes {
  type: string
  typeCode: string
  totalAmount: number
  amount: number
  perc: number
  name: string
  issIncludeTaxService: string
}

export interface AverageRates {
  rateId: number
  startDate: Date
  endDate: Date
  totalTaxes: number
  totalTaxesBase: number
  amountBeforeTax: number
  amountBeforeTaxBase: number
  totalAmountAfterTax: number
  totalAmountAfterTaxBase: number
  periods: Periods[]
  name: string
  checked?: boolean
}

export interface RoomType {
  id: number
  description: string
  numberOfUnits: number
  maxOccupancy: number
  availability: 'NON' | 'VIP' | 'PUB'
  averageRates: AverageRates[]
  temporaryUH: string
  expandItem: number
  taxes?: Taxes[]
}

export interface Hotels {
  expandItem?: number
  hotelAlphaId: string
  systemId: string
  uhIntegration: string
  transactionAcquirer: string
  checkin: string
  checkout: string
  priority: string
  status: string
  statusOrder: string
  responsibleTourStamp: string
  covid19Protocol: string
  id: number
  chainId: number
  name: string
  distanceFrom?: {
    position: {
      latitude: string
      longitude: string
      distance: number
    }
  }
  location: Location
  phone: string
  awards: Award[]
  policy: string
  rates: Rates[]
  roomTypes: RoomType[]
  billings: Billing[]
  creditCardBrandsAccepted?: CreditCardBrandsAccepted[]
  allowCancelBeforeArrival: number
  cancelBeforeArrivalDeadline: Date
  exteriorViewImageURL: string
  logoImageURL: string
  taxpayerIdentificationNumber: string
}

export interface availResponseData {
  hotels: Hotels
}

export interface currencyRates {
  code: string
}

export interface IAvailResponse {
  timestamp: Date
  currencyRates: currencyRates
  hotels: Hotels[]
  error?: DefaultError
}

export interface IAvailVipPayload {
  roomTypeId: number
  roomTypeQty: number
  startDate: Date
  endDate: Date
  agencyObservation: string
  companyId?: number
}

export interface IAvailVipResponse {
  timestamp: Date
  alphaId: string
  error?: DefaultError
}

export interface IAvailVipQuery {
  query: {
    status?: string
    roomTypeId?: number
    roomTypeQty?: number
    startDate: string
    endDate: string
  }
  companyId: number
}

export interface IRequestQuery {
  query: {
    bookingId?: number
    startDate: string
    endDate: string
    bookingDateType: 'CHECKIN' | 'CHECKOUT' | 'ISSUANCE'
    bookingPolicyType: 'ACCEPT' | 'PENDING' | 'DENIED'
  }
  companyId: number
}
