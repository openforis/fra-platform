import * as R from 'ramda'
import countryConfig from './countryConfig'

import * as countryRepository from './countryRepository'
import * as traditionalTableRepository from '../traditionalTable/traditionalTableRepository'

export const getCountryConfig = async (countryIso: string, schemaName = 'public') => {
  const dynamicConfig = await countryRepository.getDynamicCountryConfiguration(countryIso, schemaName)

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

export const getAllCountriesList = countryRepository.getAllCountriesList
export const getRegions = countryRepository.getRegions
export const getRegionGroups = countryRepository.getRegionGroups

export default {
  getCountryConfigFull,

  getAllCountriesList: countryRepository.getAllCountriesList,
  getRegions: countryRepository.getRegions,
  getRegionGroups: countryRepository.getRegionGroups,
}
