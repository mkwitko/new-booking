import { DefaultError } from '@/DTO/DefaultError'

export type salesPointResponseData = {
  companyId: number
  corporateName: string
  name: string
  cnpjCpf: string
  city: string
  stateAbbreviation: string
  login: string
}

export interface ISalesPointCtrl {
  findAgenciesStores(): void
}

export interface ISalesPointResponse {
  timestamp?: Date
  isLoading?: boolean
  data?: {
    data: salesPointResponseData[]
  }
  error?: DefaultError
}
