import { CountryIso } from '@meta/area'

export interface CountryStatus {
  countryIso: CountryIso
  status: 'editing' | 'accepted'
  deskStudy: boolean
}
