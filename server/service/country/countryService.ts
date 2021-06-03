import * as R from 'ramda'
import { CountryRepository } from '@server/repository'
import countryConfig from './countryConfig'

import * as traditionalTableRepository from '../../repository/traditionalTable/traditionalTableRepository'

export const getCountryConfig = async (countryIso: string, schemaName = 'public') => {
  const dynamicConfig = await CountryRepository.getDynamicCountryConfiguration(countryIso, schemaName)

  const staticConfig = countryConfig[countryIso]

  const fullConfig = R.mergeDeepRight(staticConfig, dynamicConfig)

  return fullConfig
}

export const getCountryConfigFull = async (countryIso: any, schemaName = 'public') => {
  const [config, result] = await Promise.all([
    getCountryConfig(countryIso, schemaName),
    traditionalTableRepository.read(countryIso, 'climaticDomain', schemaName),
  ])

  const climaticDomainPercents = {
    boreal: (result && result[0][0]) || (config.climaticDomainPercents2015 && config.climaticDomainPercents2015.boreal),
    temperate:
      (result && result[1][0]) || (config.climaticDomainPercents2015 && config.climaticDomainPercents2015.temperate),
    subtropical:
      (result && result[2][0]) || (config.climaticDomainPercents2015 && config.climaticDomainPercents2015.subtropical),
    tropical:
      (result && result[3][0]) || (config.climaticDomainPercents2015 && config.climaticDomainPercents2015.tropical),
  }

  config.climaticDomainPercents = climaticDomainPercents

  return config
}

export const { getAllCountriesList } = CountryRepository
export const { getRegions } = CountryRepository
export const { getRegionGroups } = CountryRepository

export default {
  getCountryConfigFull,

  getAllCountriesList: CountryRepository.getAllCountriesList,
  getRegions: CountryRepository.getRegions,
  getRegionGroups: CountryRepository.getRegionGroups,
}
