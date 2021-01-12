const CountryRepository = require('../country/countryRepository')
const Repository = require('./statisticalFactsheetsRepository')
const Area = require('../../common/country/area')

const getStatisticalFactsheetData = async (schemaName, level, rowNames) => {
  const isPrimaryForest = rowNames.includes('primary_forest_ratio')
  /*
    CountryIsos can be
    - WO                - all countries
    - regionCode        - AF, AS, EU...
    - countryIso        - FIN, ITA...
    - [countryIso, ..]  - [FIN, ITA]
  */
  // - WO - all countries
  if (Area.isISOGlobal(level)) {
    if (isPrimaryForest) return Repository.getPrimaryForestData(schemaName)
    return Repository.getGlobalStatisticalFactsheetData(schemaName, rowNames)
  }

  // - regionCode        - AF, AS, EU...
  const regions = await CountryRepository.getRegionCodes()
  if (regions.includes(level)) {
    // Get countries for region
    const countries = await CountryRepository.getCountryIsos(level)
    if (isPrimaryForest) return Repository.getPrimaryForestData(schemaName, countries)
    return Repository.getStatisticalFactsheetData(schemaName, rowNames, countries)
  }

  // - countryIso        - FIN, ITA...
  const countries = await CountryRepository.getCountryIsos()
  if (countries.includes(level)) {
    return Repository.getSingleCountryStatisticalFactsheetData(schemaName, rowNames, level)
  }

  // - [countryIso, ..]  - [FIN, ITA]
  if (Array.isArray(level)) {
    const filteredCountryIsos = level.filter((countryIso) => countries.includes(countryIso))
    return filteredCountryIsos.length > 0 ? Repository.getStatisticalFactsheetData(schemaName, rowNames, [level]) : []
  }
}

module.exports = {
  getStatisticalFactsheetData,
}
