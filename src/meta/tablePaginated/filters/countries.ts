import { CountryIso } from 'meta/area/countryIso'
import { CountryStatus } from 'meta/area/countryStatus'

export type CountriesFilters = {
  countries?: Array<CountryIso>
  statuses?: Array<CountryStatus>
}
