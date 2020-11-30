const Repository = require('./statisticalFactsheetsRepository')
const Area = require('../../common/country/area')

const getStatisticalFactsheetData = async (schemaName, level, rowNames) => {
  /*
    CountryIsos can be
    - WO                - all countries
    - regionCode        - AF, AS, EU...
    - countryIso        - FIN, ITA...
    - [countryIso, ..]  - [FIN, ITA]
  */
  // - WO - all countries
  if (Area.isISOGlobal(level)) {
    return Repository.getGlobalStatisticalFactsheetData(schemaName, rowNames)
  }

  // - regionCode        - AF, AS, EU...
  const regions = await Repository.getRegions()
  if (regions.includes(level)) {
    // Get countries for region
    const countries = await Repository.getCountries(level)
    return Repository.getStatisticalFactsheetData(schemaName, rowNames, countries)
  }

  // - countryIso        - FIN, ITA...
  const countries = await Repository.getCountries()
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
