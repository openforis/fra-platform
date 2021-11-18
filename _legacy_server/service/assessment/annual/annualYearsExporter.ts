import * as R from 'ramda'

import CsvOutputWithVariables from '../csvOutputWithVariables'

import CountryConfigExporter from '../exporter/countryConfigExporter'
// 1a
import ExtentOfForestExporter from '../fraYears/section_1/extentOfForestExporter'

// 5
import DisturbancesExporter from './section_5/disturbancesExporter'
import AreaAffectedByFireExporter from './section_5/areaAffectedByFireExporter'

export const YEARS_ANNUAL = R.range(2000, 2018)

export const fetchCountryData = async (countryIso: any) =>
  await Promise.all([
    CountryConfigExporter.fetchData(countryIso),
    // 1a,
    ExtentOfForestExporter.fetchData(countryIso),
    // 5a, 5b
    DisturbancesExporter.fetchData(countryIso),
    AreaAffectedByFireExporter.fetchData(countryIso),
  ])

export const getCountryData = async (country: any) => {
  const [
    countryConfig,
    // 1a
    extentOfForest,
    // 5a
    disturbances,
    areaAffectedByFire,
  ] = await fetchCountryData(country.countryIso)

  // iterate over years
  return YEARS_ANNUAL.map((year: any, yearIdx: any) => ({
    ...country,
    year,

    // forestArea2020
    forestArea2020: R.pipe(R.prop('fra'), R.find(R.propEq('year', 2020)), R.propOr('', 'forestArea'))(extentOfForest),

    // country config
    ...CountryConfigExporter.parseResultRow(countryConfig),
    // 5a, 5b
    ...DisturbancesExporter.parseResultRow(disturbances, yearIdx, year),
    ...AreaAffectedByFireExporter.parseResultRow(areaAffectedByFire, yearIdx, year),
  }))
}

export const getCsvOutput = (includeVariableFolders = true) => {
  const fieldsVariables = [
    // 5a, 5b
    ...DisturbancesExporter.fieldsWithLabels,
    ...AreaAffectedByFireExporter.fieldsWithLabels,
  ]

  const fieldsCountryConfig = CountryConfigExporter.fieldsWithLabels

  return new CsvOutputWithVariables(
    'Annual',
    fieldsVariables,
    fieldsCountryConfig,
    YEARS_ANNUAL,
    includeVariableFolders
  )
}

export default {
  getCountryData,
  getCsvOutput,
}
