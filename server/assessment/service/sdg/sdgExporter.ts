// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CSVOutputW... Remove this comment to see the full error message
const CSVOutputWithVariables = require('../csvOutputWithVariables')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CountryCon... Remove this comment to see the full error message
const CountryConfigExporter = require('../exporter/countryConfigExporter')
// 1
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ExtentOfFo... Remove this comment to see the full error message
const ExtentOfForestExporter = require('../fraYears/section_1/extentOfForestExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ForestChar... Remove this comment to see the full error message
const ForestCharacteristicsExporter = require('./section_1/forestCharacteristicsExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'SpecificFo... Remove this comment to see the full error message
const SpecificForestCategoriesExporter = require('./section_1/specificForestCategoriesExporter')
// 2
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'GrowingSto... Remove this comment to see the full error message
const GrowingStockExporter = require('./section_2/growingStockExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'BiomassSto... Remove this comment to see the full error message
const BiomassStockExporter = require('./section_2/biomassStockExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CarbonStoc... Remove this comment to see the full error message
const CarbonStockExporter = require('./section_2/carbonStockExporter')
// 3
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ForestArea... Remove this comment to see the full error message
const ForestAreaWithinProtectedAreasExporter = require('./section_3/forestAreaWithinProtectedAreasExporter')

const YEARS = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020]
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchCount... Remove this comment to see the full error message
const fetchCountryData = async (countryIso: any) =>
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
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCountry... Remove this comment to see the full error message
const getCountryData = async (country: any) => {
  const [
    countryConfig,
    // 1a, 1b, 1e
    extentOfForest,
    forestCharacteristics,
    specificForestCategories,
    // 2a, 2c
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    growingStock,
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    biomassStock,
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    carbonStock,
    // 3b
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    forestAreaWithinProtectedAreas,
  ] = await fetchCountryData(country.countryIso)
  // iterate over years
  return YEARS.map((year, yearIdx) => ({
    ...country,
    year,
    // forestArea2020
    forestArea2020: R.pipe(R.prop('fra'), R.find(R.propEq('year', 2020)), R.propOr('', 'forestArea'))(extentOfForest),
    // country config
    ...CountryConfigExporter.parseResultRow(countryConfig, yearIdx, year, extentOfForest),
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
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCsvOutp... Remove this comment to see the full error message
const getCsvOutput = () => {
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
  return new CSVOutputWithVariables('SDG_data', fieldsVariables, fieldsCountryConfig, YEARS)
}
module.exports = {
  getCountryData,
  getCsvOutput,
}
