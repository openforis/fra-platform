import { getAllCountries } from '@server/repository/country/getAllCountries'
import { getAllowedCountries } from '@server/repository/country/getAllowedCountries'
import { getAllCountriesList } from '@server/repository/country/getAllCountriesList'
import { getDynamicCountryConfiguration } from '@server/repository/country/getDynamicCountryConfiguration'
import { getRegionGroups } from '@server/repository/country/getRegionGroups'
import { getRegions } from '@server/repository/country/getRegions'
import { getRegionCodes } from '@server/repository/country/getRegionCodes'
import { getCountryIsos } from '@server/repository/country/getCountryIsos'
import { getCountry } from '@server/repository/country/getCountry'
import { saveDynamicConfigurationVariable } from '@server/repository/country/saveDynamicConfigurationVariable'

export const CountryRepository = {
  getCountryIsos,
  getCountry,

  getAllCountries,
  getAllowedCountries,
  getAllCountriesList,
  getDynamicCountryConfiguration,

  getRegionGroups,
  getRegions,
  getRegionCodes,

  saveDynamicConfigurationVariable,
}
