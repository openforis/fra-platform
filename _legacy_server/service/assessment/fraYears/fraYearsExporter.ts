import * as R from 'ramda'

import CSVOutputWithVariables from '../csvOutputWithVariables'
import CountryConfigExporter from '../exporter/countryConfigExporter'
import ExtentOfForestExporter from './section_1/extentOfForestExporter'
import ForestCharacteristicsExporter from './section_1/forestCharacteristicsExporter'
import SpecificForestCategoriesExporter from './section_1/specificForestCategoriesExporter'
import OtherLandWithTreeCoverExporter from './section_1/otherLandWithTreeCoverExporter'
import GrowingStockExporter from './section_2/growingStockExporter'
import GrowingStockCompositionExporter from './section_2/growingStockCompositionExporter'
import BiomassStockExporter from './section_2/biomassStockExporter'
import CarbonStockExporter from './section_2/carbonStockExporter'
import DesignatedManagementObjectiveExporter from './section_3/designatedManagementObjectiveExporter'
import ForestAreaWithinProtectedAreasExporter from './section_3/forestAreaWithinProtectedAreasExporter'
import ForestOwnershipExporter from './section_4/forestOwnershipExporter'
import HolderOfManagementRightsExporter from './section_4/holderOfManagementRightsExporter'
import DegradedForestExporter from './section_5/degradedForestExporter'
import PoliciesLegislationNationalPlatformExporter from './section_6/policiesLegislationNationalPlatformExporter'
import AreaOfPermanentForestEstateExporter from './section_6/areaOfPermanentForestEstateExporter'
import EmploymentInForestryAndLoggingExporter from './section_7/employmentInForestryAndLoggingExporter'
import GraduationOfStudentsExporter from './section_7/graduationOfStudentsExporter'

export const YEARS_FRA = [1990, 2000, 2010, 2015, 2020]
export const fetchCountryData = async (countryIso: any) =>
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
export const getCountryData = async (country: any) => {
  const [
    countryConfig,
    // 1a, 1b, 1e, 1f
    extentOfForest,
    forestCharacteristics,
    specificForestCategories,
    otherLandWithTreeCover,
    // 2a, 2b, 2c, 2d
    growingStock,
    growingStockComposition,
    biomassStock,
    carbonStock,
    // 3a, 3b
    designatedManagementObjective,
    forestAreaWithinProtectedAreas,
    // 4a
    forestOwnership,
    holderOfManagementRights,
    // 5c
    degradedForest,
    // 6a, 6b
    policiesLegislationNationalPlatform,
    areaOfPermanentForestEstate,
    // 7a, 7b
    employmentInForestryAndLogging,
    graduationOfStudents,
  ] = await fetchCountryData(country.countryIso)
  // iterate over years
  return YEARS_FRA.map((year, yearIdx) => ({
    ...country,
    year,
    // forestArea2020
    forestArea2020: R.pipe(R.prop('fra'), R.find(R.propEq('year', 2020)), R.propOr('', 'forestArea'))(extentOfForest),
    // country config
    ...CountryConfigExporter.parseResultRow(countryConfig),
    // 1a, 1b, 1e, 1f
    ...ExtentOfForestExporter.parseResultRow(extentOfForest, yearIdx, year, countryConfig),
    ...(ForestCharacteristicsExporter as any).parseResultRow(forestCharacteristics, yearIdx, year),
    ...SpecificForestCategoriesExporter.parseResultRow(specificForestCategories, yearIdx),
    ...OtherLandWithTreeCoverExporter.parseResultRow(otherLandWithTreeCover, yearIdx),
    // 2a, 2b, 2c, 2d
    ...GrowingStockExporter.parseResultRow(growingStock, yearIdx, year),
    ...GrowingStockCompositionExporter.parseResultRow(growingStockComposition, yearIdx),
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
    ...DegradedForestExporter.parseResultRow(degradedForest, yearIdx),
    // 6a, 6b
    ...PoliciesLegislationNationalPlatformExporter.parseResultRow(policiesLegislationNationalPlatform, yearIdx),
    ...AreaOfPermanentForestEstateExporter.parseResultRow(areaOfPermanentForestEstate, yearIdx),
    // 7a, 7b
    ...EmploymentInForestryAndLoggingExporter.parseResultRow(employmentInForestryAndLogging, yearIdx, year),
    ...GraduationOfStudentsExporter.parseResultRow(graduationOfStudents, yearIdx, year),
  }))
}
export const getCsvOutput = (noVariablesFolder: any) => {
  const fieldsVariables = [
    // 1a, 1b, 1e, 1f
    ...ExtentOfForestExporter.fieldsWithLabels,
    ...ForestCharacteristicsExporter.fieldsWithLabels,
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
export default {
  getCountryData,
  getCsvOutput,
}
