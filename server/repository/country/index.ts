import { getAllCountries } from '@server/repository/country/getAllCountries'
import { getAllowedCountries } from '@server/repository/country/getAllowedCountries'
import { getAllCountriesList } from '@server/repository/country/getAllCountriesList'
import { getDynamicCountryConfiguration } from '@server/repository/country/getDynamicCountryConfiguration'
import { getRegionGroups } from '@server/repository/country/getRegionGroups'
import { getRegions } from '@server/repository/country/getRegions'

export const CountryRepository = {
  getAllCountries,
  getAllowedCountries,
  getAllCountriesList,
  getDynamicCountryConfiguration,

  getRegionGroups,
  getRegions,
}
