import * as Area from '@common/country/area'
import { CountryService } from '@server/service'
import * as Repository from '../../repository/statisticalFactsheets/statisticalFactsheetsRepository'

export const getStatisticalFactsheetData = async (schemaName: any, level: any, rowNames: any) => {
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
  const regions = await CountryService.getRegionCodes()
  if (regions.includes(level)) {
    // Get countries for region
    const countries = await CountryService.getCountryIsos(level)
    if (isPrimaryForest) return Repository.getPrimaryForestData(schemaName, countries)
    return Repository.getStatisticalFactsheetData(schemaName, rowNames, countries)
  }

  // - countryIso        - FIN, ITA...
  const countries = await CountryService.getCountryIsos()
  if (countries.includes(level)) {
    return Repository.getSingleCountryStatisticalFactsheetData(schemaName, rowNames, level)
  }

  // - [countryIso, ..]  - [FIN, ITA]
  if (Array.isArray(level)) {
    const filteredCountryIsos = level.filter((countryIso) => countries.includes(countryIso))
    return filteredCountryIsos.length > 0
      ? Repository.getStatisticalFactsheetData(schemaName, rowNames, filteredCountryIsos)
      : []
  }
}

export default {
  getStatisticalFactsheetData,
}
