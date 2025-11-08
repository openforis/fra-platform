import { CountryStatus } from 'meta/area/countryStatus'

export interface StatusTransition {
  status: CountryStatus
  direction: 'next' | 'previous'
}
