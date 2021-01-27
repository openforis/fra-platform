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
const ExtentOfForestExporter = require('./section_1/extentOfForestExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ForestChar... Remove this comment to see the full error message
const ForestCharacteristicsExporter = require('./section_1/forestCharacteristicsExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'SpecificFo... Remove this comment to see the full error message
const SpecificForestCategoriesExporter = require('./section_1/specificForestCategoriesExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'OtherLandW... Remove this comment to see the full error message
const OtherLandWithTreeCoverExporter = require('./section_1/otherLandWithTreeCoverExporter')
// 2
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'GrowingSto... Remove this comment to see the full error message
const GrowingStockExporter = require('./section_2/growingStockExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'GrowingSto... Remove this comment to see the full error message
const GrowingStockCompositionExporter = require('./section_2/growingStockCompositionExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'BiomassSto... Remove this comment to see the full error message
const BiomassStockExporter = require('./section_2/biomassStockExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CarbonStoc... Remove this comment to see the full error message
const CarbonStockExporter = require('./section_2/carbonStockExporter')
// 3
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Designated... Remove this comment to see the full error message
const DesignatedManagementObjectiveExporter = require('./section_3/designatedManagementObjectiveExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ForestArea... Remove this comment to see the full error message
const ForestAreaWithinProtectedAreasExporter = require('./section_3/forestAreaWithinProtectedAreasExporter')
// 4
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ForestOwne... Remove this comment to see the full error message
const ForestOwnershipExporter = require('./section_4/forestOwnershipExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'HolderOfMa... Remove this comment to see the full error message
const HolderOfManagementRightsExporter = require('./section_4/holderOfManagementRightsExporter')
// 5
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'DegradedFo... Remove this comment to see the full error message
const DegradedForestExporter = require('./section_5/degradedForestExporter')
// 6
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PoliciesLe... Remove this comment to see the full error message
const PoliciesLegislationNationalPlatformExporter = require('./section_6/policiesLegislationNationalPlatformExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'AreaOfPerm... Remove this comment to see the full error message
const AreaOfPermanentForestEstateExporter = require('./section_6/areaOfPermanentForestEstateExporter')
// 7
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Employment... Remove this comment to see the full error message
const EmploymentInForestryAndLoggingExporter = require('./section_7/employmentInForestryAndLoggingExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Graduation... Remove this comment to see the full error message
const GraduationOfStudentsExporter = require('./section_7/graduationOfStudentsExporter')

const YEARS_FRA = [1990, 2000, 2010, 2015, 2020]
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchCount... Remove this comment to see the full error message
const fetchCountryData = async (countryIso: any) =>
  await Promise.all([
    CountryConfigExporter.fetchData(countryIso),
    // 1a, 1b, 1e, 1f
    ExtentOfForestExporter.fetchData(countryIso),
    (ForestCharacteristicsExporter as any).fetchData(countryIso),
    SpecificForestCategoriesExporter.fetchData(countryIso),
    OtherLandWithTreeCoverExporter.fetchData(countryIso),
    // 2a, 2b, 2c, 2d
    GrowingStockExporter.fetchData(countryIso),
    GrowingStockCompositionExporter.fetchData(countryIso),
    BiomassStockExporter.fetchData(countryIso),
    CarbonStockExporter.fetchData(countryIso),
    // 3a, 3b
    DesignatedManagementObjectiveExporter.fetchData(countryIso),
    ForestAreaWithinProtectedAreasExporter.fetchData(countryIso),
    // 4a, 4b
    ForestOwnershipExporter.fetchData(countryIso),
    HolderOfManagementRightsExporter.fetchData(countryIso),
    // 5c
    DegradedForestExporter.fetchData(countryIso),
    // 6a, 6b
    PoliciesLegislationNationalPlatformExporter.fetchData(countryIso),
    AreaOfPermanentForestEstateExporter.fetchData(countryIso),
    // 7a, 7b
    EmploymentInForestryAndLoggingExporter.fetchData(countryIso),
    GraduationOfStudentsExporter.fetchData(countryIso),
  ])
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCountry... Remove this comment to see the full error message
const getCountryData = async (country: any) => {
  const [
    countryConfig,
    // 1a, 1b, 1e, 1f
    extentOfForest,
    forestCharacteristics,
    specificForestCategories,
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    otherLandWithTreeCover,
    // 2a, 2b, 2c, 2d
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    growingStock,
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    growingStockComposition,
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    biomassStock,
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    carbonStock,
    // 3a, 3b
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    designatedManagementObjective,
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    forestAreaWithinProtectedAreas,
    // 4a
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    forestOwnership,
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    holderOfManagementRights,
    // 5c
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    degradedForest,
    // 6a, 6b
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    policiesLegislationNationalPlatform,
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    areaOfPermanentForestEstate,
    // 7a, 7b
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    employmentInForestryAndLogging,
    // @ts-expect-error ts-migrate(2493) FIXME: Tuple type '[any, any, any, any]' of length '4' ha... Remove this comment to see the full error message
    graduationOfStudents,
  ] = await fetchCountryData(country.countryIso)
  // iterate over years
  return YEARS_FRA.map((year, yearIdx) => ({
    ...country,
    year,
    // forestArea2020
    forestArea2020: R.pipe(R.prop('fra'), R.find(R.propEq('year', 2020)), R.propOr('', 'forestArea'))(extentOfForest),
    // country config
    ...CountryConfigExporter.parseResultRow(countryConfig, yearIdx, year, extentOfForest),
    // 1a, 1b, 1e, 1f
    ...ExtentOfForestExporter.parseResultRow(extentOfForest, yearIdx, year, countryConfig),
    ...(ForestCharacteristicsExporter as any).parseResultRow(forestCharacteristics, yearIdx, year),
    ...SpecificForestCategoriesExporter.parseResultRow(specificForestCategories, yearIdx),
    ...OtherLandWithTreeCoverExporter.parseResultRow(otherLandWithTreeCover, yearIdx),
    // 2a, 2b, 2c, 2d
    ...GrowingStockExporter.parseResultRow(growingStock, yearIdx, year),
    ...GrowingStockCompositionExporter.parseResultRow(growingStockComposition, yearIdx, year),
    ...BiomassStockExporter.parseResultRow(biomassStock, yearIdx, year),
    ...CarbonStockExporter.parseResultRow(carbonStock, yearIdx, year),
    // 3a, 3b
    ...DesignatedManagementObjectiveExporter.parseResultRow(
      designatedManagementObjective,
      yearIdx,
      year,
      extentOfForest
    ),
    ...ForestAreaWithinProtectedAreasExporter.parseResultRow(forestAreaWithinProtectedAreas, yearIdx, year),
    // 4a, 4b
    ...ForestOwnershipExporter.parseResultRow(forestOwnership, yearIdx, year, extentOfForest),
    ...HolderOfManagementRightsExporter.parseResultRow(holderOfManagementRights, yearIdx, year, forestOwnership),
    // 5c
    ...DegradedForestExporter.parseResultRow(degradedForest, yearIdx, year),
    // 6a, 6b
    ...PoliciesLegislationNationalPlatformExporter.parseResultRow(policiesLegislationNationalPlatform, yearIdx, year),
    ...AreaOfPermanentForestEstateExporter.parseResultRow(areaOfPermanentForestEstate, yearIdx, year),
    // 7a, 7b
    ...EmploymentInForestryAndLoggingExporter.parseResultRow(employmentInForestryAndLogging, yearIdx, year),
    ...GraduationOfStudentsExporter.parseResultRow(graduationOfStudents, yearIdx, year),
  }))
}
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCsvOutp... Remove this comment to see the full error message
const getCsvOutput = (noVariablesFolder: any) => {
  const fieldsVariables = [
    // 1a, 1b, 1e, 1f
    ...ExtentOfForestExporter.fieldsWithLabels,
    ...(ForestCharacteristicsExporter as any).fieldsWithLabels,
    ...SpecificForestCategoriesExporter.fieldsWithLabels,
    ...OtherLandWithTreeCoverExporter.fieldsWithLabels,
    // 2a, 2b, 2c, 2d
    ...GrowingStockExporter.fieldsWithLabels,
    ...GrowingStockCompositionExporter.fieldsWithLabels,
    ...BiomassStockExporter.fieldsWithLabels,
    ...CarbonStockExporter.fieldsWithLabels,
    // 3a, 3b
    ...DesignatedManagementObjectiveExporter.fieldsWithLabels,
    ...ForestAreaWithinProtectedAreasExporter.fieldsWithLabels,
    // 4a, 4b
    ...ForestOwnershipExporter.fieldsWithLabels,
    ...HolderOfManagementRightsExporter.fieldsWithLabels,
    // 5c
    ...DegradedForestExporter.fieldsWithLabels,
    // 6a, 6b
    ...PoliciesLegislationNationalPlatformExporter.fieldsWithLabels,
    ...AreaOfPermanentForestEstateExporter.fieldsWithLabels,
    // 7a, 7b
    ...EmploymentInForestryAndLoggingExporter.fieldsWithLabels,
    ...GraduationOfStudentsExporter.fieldsWithLabels,
  ]
  const fieldsCountryConfig = CountryConfigExporter.fieldsWithLabels
  return new CSVOutputWithVariables('FRA_Years', fieldsVariables, fieldsCountryConfig, YEARS_FRA, noVariablesFolder)
}
module.exports = {
  getCountryData,
  getCsvOutput,
}
