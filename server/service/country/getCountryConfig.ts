import { CountryRepository } from '@server/repository'
import countryConfig from '@server/service/country/countryConfig'
import * as R from 'ramda'

export const getCountryConfig = async (countryIso: string, schemaName = 'public') => {
  const dynamicConfig = await CountryRepository.getDynamicCountryConfiguration(countryIso, schemaName)

  const staticConfig = countryConfig[countryIso]

  const fullConfig = R.mergeDeepRight(staticConfig, dynamicConfig)

  return fullConfig
}
