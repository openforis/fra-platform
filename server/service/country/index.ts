import { getRegionCodes } from './getRegionCodes'
import { getAllCountriesList } from './getAllCountriesList'
import { getRegions } from './getRegions'
import { getAllowedCountries } from './getAllowedCountries'
import { getRegionGroups } from './getRegionGroups'
import { getCountryConfigFull } from './getCountryConfigFull'
import { getCountryConfig } from './getCountryConfig'
import { getCountryIsos } from './getCountryIsos'
import { getCountry } from './getCountry'

export const CountryService = {
  getAllCountriesList,
  getAllowedCountries,
  getCountryConfig,
  getCountryConfigFull,
  getCountryIsos,
  getRegionCodes,
  getRegionGroups,
  getRegions,
  getCountry,
}
