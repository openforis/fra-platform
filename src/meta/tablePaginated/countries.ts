import { CountryIso, CountryStatus } from 'meta/area'

export type CountriesFilters = {
  countries?: Array<CountryIso>
  statuses?: Array<CountryStatus>
}
