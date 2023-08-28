import { DefaultError } from '@/DTO/DefaultError'

export type localeCitiesData = {
  cityId: number
  cityName: string
  stateName: string
  stateSymbol: string
  countryName: string
  countrySymbol: string
  iata?: string
}

export interface ILocaleCitiesCtrl {
  findLocaleCities(cityName: string): void
}

export interface ILocaleCitiesResponse {
  timestamp?: Date
  isLoading?: boolean
  data?: {
    data: localeCitiesData[]
  }
  error?: DefaultError
}
