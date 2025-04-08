import { CountryStatus } from 'meta/area'

export interface StatusTransition {
  status: CountryStatus
  direction: 'next' | 'previous'
}
