import * as R from 'ramda'

import CsvOutputWithVariables from '../csvOutputWithVariables'
import CountryConfigExporter from '../exporter/countryConfigExporter'
// 1
import ExtentOfForestExporter from '../fraYears/section_1/extentOfForestExporter'
import ForestCharacteristicsExporter from './section_1/forestCharacteristicsExporter'
import SpecificForestCategoriesExporter from './section_1/specificForestCategoriesExporter'
// 2
import GrowingStockExporter from './section_2/growingStockExporter'
import BiomassStockExporter from './section_2/biomassStockExporter'
import CarbonStockExporter from './section_2/carbonStockExporter'
// 3
import ForestAreaWithinProtectedAreasExporter from './section_3/forestAreaWithinProtectedAreasExporter'

export const YEARS = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020]
export const fetchCountryData = async (countryIso: any) =>
  await Promise.all([
    CountryConfigExporter.fetchData(countryIso),
    // 1a, 1b, 1e
    ExtentOfForestExporter.fetchData(countryIso),
    (ForestCharacteristicsExporter as any).fetchData(countryIso),
    SpecificForestCategoriesExporter.fetchData(countryIso),
    // 2a, 2c, 2d
    GrowingStockExporter.fetchData(countryIso),
    BiomassStockExporter.fetchData(countryIso),
    CarbonStockExporter.fetchData(countryIso),
    // 3b
    ForestAreaWithinProtectedAreasExporter.fetchData(countryIso),
  ])
export const getCountryData = async (country: any) => {
  const [
    countryConfig,
    // 1a, 1b, 1e
    extentOfForest,
    forestCharacteristics,
    specificForestCategories,
    // 2a, 2c
    growingStock,
    biomassStock,
    carbonStock,
    // 3b
    forestAreaWithinProtectedAreas,
  ] = await fetchCountryData(country.countryIso)
  // iterate over years
  return YEARS.map((year, yearIdx) => ({
    ...country,
    year,
    // forestArea2020
    forestArea2020: R.pipe(R.prop('fra'), R.find(R.propEq('year', 2020)), R.propOr('', 'forestArea'))(extentOfForest),
    // country config
    ...CountryConfigExporter.parseResultRow(countryConfig, yearIdx, year),
    // 1a, 1b, 1e
    ...ExtentOfForestExporter.parseResultRow(extentOfForest, yearIdx, year, countryConfig),
    ...(ForestCharacteristicsExporter as any).parseResultRow(forestCharacteristics, yearIdx, year),
    ...SpecificForestCategoriesExporter.parseResultRow(specificForestCategories, yearIdx),
    // 2a, 2c, 2d
    ...GrowingStockExporter.parseResultRow(growingStock, yearIdx, year),
    ...BiomassStockExporter.parseResultRow(biomassStock, yearIdx, year),
    ...CarbonStockExporter.parseResultRow(carbonStock, yearIdx, year),
    // 3b
    ...ForestAreaWithinProtectedAreasExporter.parseResultRow(forestAreaWithinProtectedAreas, yearIdx, year),
  }))
}
export const getCsvOutput = () => {
  const fieldsVariables = [
    // 1a, 1b, 1e
    ...ExtentOfForestExporter.fieldsWithLabels,
    ...(ForestCharacteristicsExporter as any).fieldsWithLabels,
    ...SpecificForestCategoriesExporter.fieldsWithLabels,
    // 2a, 2c, 2d
    ...GrowingStockExporter.fieldsWithLabels,
    ...BiomassStockExporter.fieldsWithLabels,
    ...CarbonStockExporter.fieldsWithLabels,
    // 3b
    ...ForestAreaWithinProtectedAreasExporter.fieldsWithLabels,
  ]
  const fieldsCountryConfig = CountryConfigExporter.fieldsWithLabels
  return new CsvOutputWithVariables('SDG_data', fieldsVariables, fieldsCountryConfig, YEARS)
}
export default {
  getCountryData,
  getCsvOutput,
}
