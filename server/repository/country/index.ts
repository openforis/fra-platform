import { getAllCountries } from '@server/repository/country/getAllCountries'
import { getAllowedCountries } from '@server/repository/country/getAllowedCountries'
import { getAllCountriesList } from '@server/repository/country/getAllCountriesList'
import { getDynamicCountryConfiguration } from '@server/repository/country/getDynamicCountryConfiguration'
import { getRegionGroups } from '@server/repository/country/getRegionGroups'
import { getRegions } from '@server/repository/country/getRegions'
import { getRegionCodes } from '@server/repository/country/getRegionCodes'
import { getCountryIsos } from '@server/repository/country/getCountryIsos'

export const CountryRepository = {
  getCountryIsos,

  getAllCountries,
  getAllowedCountries,
  getAllCountriesList,
  getDynamicCountryConfiguration,

  getRegionGroups,
  getRegions,
  getRegionCodes,
}
