export interface Location {
  id: number
  cityName: string
  cityCode: string
  stateName: string
  countryName: string
  stateSymbol: string
}

export interface Address {
  addressLine: string
  zipCode: string
  location: Location
  type: string
  district: string
  number: number
}

export interface Contact {
  alphaId: string
  mail: string
  type: string
}

export interface Responsible {
  fullName: string
  role: string
  taxPayerCode: string
}

export interface HotelChainResponseData {
  alphaId: string
  name: string
  corporateName: string
  socialName: string
  taxpayerId: string
  exemptedStateCompanyRegNumber: boolean
  socialContractAttachment: any
  contractAttachment: any
  status: string
  mail: string
  phone: string
  address: Address
  contacts: Contact[]
  logoImage: any
  responsible: Responsible
}

export interface IHotelChainResponse {
  timestamp: Date
  data: HotelChainResponseData[]
}
