const R = require('ramda')

const countryConfig = require('./countryConfig')

const countryRepository = require('./countryRepository')

const getCountryConfigFull = async countryIso => {
  const dynamicConfig = await countryRepository.getDynamicCountryConfiguration(countryIso)

  const staticConfig = countryConfig[countryIso]

  const fullConfig = R.mergeDeepRight(staticConfig, dynamicConfig)

  return fullConfig
}

module.exports = {
  getCountryConfigFull,

  getAllCountriesList: countryRepository.getAllCountriesList,
}
