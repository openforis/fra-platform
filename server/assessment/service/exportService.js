const Promise = require('bluebird')
const R = require('ramda')
const { AsyncParser } = require('json2csv')

const AccessControl = require('../../utils/accessControl')

const CountryService = require('../../country/countryService')
const CountryConfigExporter = require('./_exportService/countryConfigExporter')
//1
const ExtentOfForestExporter = require('./_exportService/section_1/extentOfForestExporter')
const ForestCharacteristicsExporter = require('./_exportService/section_1/forestCharacteristicsExporter')
const SpecificForestCategoriesExporter = require('./_exportService/section_1/specificForestCategoriesExporter')
const OtherLandWithTreeCoverExporter = require('./_exportService/section_1/otherLandWithTreeCoverExporter')
//2
const GrowingStockExporter = require('./_exportService/section_2/growingStockExporter')
const GrowingStockCompositionExporter = require('./_exportService/section_2/growingStockCompositionExporter')
const BiomassStockExporter = require('./_exportService/section_2/biomassStockExporter')
const CarbonStockExporter = require('./_exportService/section_2/carbonStockExporter')
//3
const DesignatedManagementObjectiveExporter = require('./_exportService/section_3/designatedManagementObjectiveExporter')
const ForestAreaWithinProtectedAreasExporter = require('./_exportService/section_3/forestAreaWithinProtectedAreasExporter')
//4
const ForestOwnershipExporter = require('./_exportService/section_4/forestOwnershipExporter')
const HolderOfManagementRightsExporter = require('./_exportService/section_4/holderOfManagementRightsExporter')
//5
const DegradedForestExporter = require('./_exportService/section_5/degradedForestExporter')
//6
const PoliciesLegislationNationalPlatformExporter = require('./_exportService/section_6/policiesLegislationNationalPlatformExporter')
const AreaOfPermanentForestEstateExporter = require('./_exportService/section_6/areaOfPermanentForestEstateExporter')
//7
const EmploymentInForestryAndLoggingExporter = require('./_exportService/section_7/employmentInForestryAndLoggingExporter')
const GraduationOfStudentsExporter = require('./_exportService/section_7/graduationOfStudentsExporter')

const YEARS_FRA = [1990, 2000, 2010, 2015, 2020]

const getExporterFields = exporter =>
  exporter.fields.map(field => ({
    value: field,
    label: R.isEmpty(exporter.tableNo)
      ? field
      : `${exporter.tableNo}_${field}`,
  }))

const fetchCountryData = async countryIso => await Promise.all([
  CountryConfigExporter.fetchData(countryIso),
  //1a, 1b, 1e, 1f
  ExtentOfForestExporter.fetchData(countryIso),
  ForestCharacteristicsExporter.fetchData(countryIso),
  SpecificForestCategoriesExporter.fetchData(countryIso),
  OtherLandWithTreeCoverExporter.fetchData(countryIso),
  //2a, 2b, 2c, 2d
  GrowingStockExporter.fetchData(countryIso),
  GrowingStockCompositionExporter.fetchData(countryIso),
  BiomassStockExporter.fetchData(countryIso),
  CarbonStockExporter.fetchData(countryIso),
  //3a, 3b
  DesignatedManagementObjectiveExporter.fetchData(countryIso),
  ForestAreaWithinProtectedAreasExporter.fetchData(countryIso),
  //4a, 4b
  ForestOwnershipExporter.fetchData(countryIso),
  HolderOfManagementRightsExporter.fetchData(countryIso),
  //5c
  DegradedForestExporter.fetchData(countryIso),
  //6a, 6b
  PoliciesLegislationNationalPlatformExporter.fetchData(countryIso),
  AreaOfPermanentForestEstateExporter.fetchData(countryIso),
  //7a, 7b
  EmploymentInForestryAndLoggingExporter.fetchData(countryIso),
  GraduationOfStudentsExporter.fetchData(countryIso),
])

const getCountryData = async country => {
  const [
    countryConfig,
    //1a, 1b, 1e, 1f
    extentOfForest, forestCharacteristics, specificForestCategories, otherLandWithTreeCover,
    //2a, 2b, 2c, 2d
    growingStock, growingStockComposition, biomassStock, carbonStock,
    //3a, 3b
    designatedManagementObjective, forestAreaWithinProtectedAreas,
    //4a
    forestOwnership, holderOfManagementRights,
    //5c
    degradedForest,
    //6a, 6b
    policiesLegislationNationalPlatform, areaOfPermanentForestEstate,
    //7a, 7b
    employmentInForestryAndLogging, graduationOfStudents
  ] = await fetchCountryData(country.countryIso)

  // iterate over years
  return YEARS_FRA.map((year, yearIdx) => ({
    ...country,
    year,
    //country config
    ...CountryConfigExporter.parseResultRow(countryConfig, yearIdx, year),
    //1a, 1b, 1e, 1f
    ...ExtentOfForestExporter.parseResultRow(extentOfForest, yearIdx, year, countryConfig),
    ...ForestCharacteristicsExporter.parseResultRow(forestCharacteristics, yearIdx, year),
    ...SpecificForestCategoriesExporter.parseResultRow(specificForestCategories, yearIdx),
    ...OtherLandWithTreeCoverExporter.parseResultRow(otherLandWithTreeCover, yearIdx),
    //2a, 2b, 2c, 2d
    ...GrowingStockExporter.parseResultRow(growingStock, yearIdx, year),
    ...GrowingStockCompositionExporter.parseResultRow(growingStockComposition, yearIdx, year),
    ...BiomassStockExporter.parseResultRow(biomassStock, yearIdx, year),
    ...CarbonStockExporter.parseResultRow(carbonStock, yearIdx, year),
    //3a, 3b
    ...DesignatedManagementObjectiveExporter.parseResultRow(designatedManagementObjective, yearIdx, year),
    ...ForestAreaWithinProtectedAreasExporter.parseResultRow(forestAreaWithinProtectedAreas, yearIdx, year),
    //4a, 4b
    ...ForestOwnershipExporter.parseResultRow(forestOwnership, yearIdx, year, extentOfForest),
    ...HolderOfManagementRightsExporter.parseResultRow(holderOfManagementRights, yearIdx, year, forestOwnership),
    //5c
    ...DegradedForestExporter.parseResultRow(degradedForest, yearIdx, year),
    //6a, 6b
    ...PoliciesLegislationNationalPlatformExporter.parseResultRow(policiesLegislationNationalPlatform, yearIdx, year),
    ...AreaOfPermanentForestEstateExporter.parseResultRow(areaOfPermanentForestEstate, yearIdx, year),
    //7a, 7b
    ...EmploymentInForestryAndLoggingExporter.parseResultRow(employmentInForestryAndLogging, yearIdx, year),
    ...GraduationOfStudentsExporter.parseResultRow(graduationOfStudents, yearIdx, year),
  }))

}

const getData = async user => {
  AccessControl.checkAdminAccess(user)

  // prepare csv conversion
  const fields = [
    'region', 'countryIso', 'listNameEn', 'year',
    //country config
    ...CountryConfigExporter.fields,
    //1a, 1b, 1e, 1f
    ...getExporterFields(ExtentOfForestExporter),
    ...getExporterFields(ForestCharacteristicsExporter),
    ...getExporterFields(SpecificForestCategoriesExporter),
    ...getExporterFields(OtherLandWithTreeCoverExporter),
    //2a, 2b, 2c, 2d
    ...getExporterFields(GrowingStockExporter),
    ...getExporterFields(GrowingStockCompositionExporter),
    ...getExporterFields(BiomassStockExporter),
    ...getExporterFields(CarbonStockExporter),
    //3a, 3b
    ...getExporterFields(DesignatedManagementObjectiveExporter),
    ...getExporterFields(ForestAreaWithinProtectedAreasExporter),
    //4a, 4b
    ...getExporterFields(ForestOwnershipExporter),
    ...getExporterFields(HolderOfManagementRightsExporter),
    //5c
    ...getExporterFields(DegradedForestExporter),
    //6a, 6b
    ...getExporterFields(PoliciesLegislationNationalPlatformExporter),
    ...getExporterFields(AreaOfPermanentForestEstateExporter),
    //7a, 7b
    ...getExporterFields(EmploymentInForestryAndLoggingExporter),
    ...getExporterFields(GraduationOfStudentsExporter),

  ]
  const opts = { fields }
  const asyncParser = new AsyncParser(opts, {})

  let csv = ''
  asyncParser.processor
    .on('data', chunk => (csv += chunk.toString()))
    // .on('end', () => console.log(csv))
    .on('error', err => { throw new Error(err) })

  // prepare data
  const countriesAll = await CountryService.getAllCountriesList()
  const countries = R.reject(R.propEq('region', 'atlantis'), countriesAll)

  await Promise.each(
    countries.map(getCountryData),
    countryResult => {
      asyncParser.input.push(JSON.stringify(countryResult))
    }
  )

  asyncParser.input.push(null)

  return csv
}

module.exports = {
  getData
}
