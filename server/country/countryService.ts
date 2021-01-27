// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')

const countryConfig = require('./countryConfig')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'countryRep... Remove this comment to see the full error message
const countryRepository = require('./countryRepository')
const traditionalTableRepository = require('../traditionalTable/traditionalTableRepository')

const getCountryConfig = async (countryIso: any, schemaName = 'public') => {
  const dynamicConfig = await countryRepository.getDynamicCountryConfiguration(countryIso, schemaName)

  const staticConfig = countryConfig[countryIso]

  const fullConfig = R.mergeDeepRight(staticConfig, dynamicConfig)

  return fullConfig
}

const getCountryConfigFull = async (countryIso: any, schemaName = 'public') => {
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

module.exports = {
  getCountryConfigFull,

  getAllCountriesList: countryRepository.getAllCountriesList,
  getRegions: countryRepository.getRegions,
  getRegionGroups: countryRepository.getRegionGroups,
}
