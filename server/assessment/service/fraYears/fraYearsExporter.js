const R = require('ramda')
const Promise = require('bluebird')
const CSVOutputFile = require('../csvOutputFile')

const CountryConfigExporter = require('../exporter/countryConfigExporter')
//1
const ExtentOfForestExporter = require('./section_1/extentOfForestExporter')
const ForestCharacteristicsExporter = require('./section_1/forestCharacteristicsExporter')
const SpecificForestCategoriesExporter = require('./section_1/specificForestCategoriesExporter')
const OtherLandWithTreeCoverExporter = require('./section_1/otherLandWithTreeCoverExporter')
//2
const GrowingStockExporter = require('./section_2/growingStockExporter')
const GrowingStockCompositionExporter = require('./section_2/growingStockCompositionExporter')
const BiomassStockExporter = require('./section_2/biomassStockExporter')
const CarbonStockExporter = require('./section_2/carbonStockExporter')
//3
const DesignatedManagementObjectiveExporter = require('./section_3/designatedManagementObjectiveExporter')
const ForestAreaWithinProtectedAreasExporter = require('./section_3/forestAreaWithinProtectedAreasExporter')
//4
const ForestOwnershipExporter = require('./section_4/forestOwnershipExporter')
const HolderOfManagementRightsExporter = require('./section_4/holderOfManagementRightsExporter')
//5
const DegradedForestExporter = require('./section_5/degradedForestExporter')
//6
const PoliciesLegislationNationalPlatformExporter = require('./section_6/policiesLegislationNationalPlatformExporter')
const AreaOfPermanentForestEstateExporter = require('./section_6/areaOfPermanentForestEstateExporter')
//7
const EmploymentInForestryAndLoggingExporter = require('./section_7/employmentInForestryAndLoggingExporter')
const GraduationOfStudentsExporter = require('./section_7/graduationOfStudentsExporter')

const YEARS_FRA = [1990, 2000, 2010, 2015, 2020]

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

const exportData = async countries => {

  const fieldsVariables = [
    //1a, 1b, 1e, 1f
    ...ExtentOfForestExporter.fieldsWithLabels,
    ...ForestCharacteristicsExporter.fieldsWithLabels,
    ...SpecificForestCategoriesExporter.fieldsWithLabels,
    ...OtherLandWithTreeCoverExporter.fieldsWithLabels,
    //2a, 2b, 2c, 2d
    ...GrowingStockExporter.fieldsWithLabels,
    ...GrowingStockCompositionExporter.fieldsWithLabels,
    ...BiomassStockExporter.fieldsWithLabels,
    ...CarbonStockExporter.fieldsWithLabels,
    //3a, 3b
    ...DesignatedManagementObjectiveExporter.fieldsWithLabels,
    ...ForestAreaWithinProtectedAreasExporter.fieldsWithLabels,
    //4a, 4b
    ...ForestOwnershipExporter.fieldsWithLabels,
    ...HolderOfManagementRightsExporter.fieldsWithLabels,
    //5c
    ...DegradedForestExporter.fieldsWithLabels,
    //6a, 6b
    ...PoliciesLegislationNationalPlatformExporter.fieldsWithLabels,
    ...AreaOfPermanentForestEstateExporter.fieldsWithLabels,
    //7a, 7b
    ...EmploymentInForestryAndLoggingExporter.fieldsWithLabels,
    ...GraduationOfStudentsExporter.fieldsWithLabels,
  ]

  const fieldsCountryConfig = CountryConfigExporter.fieldsWithLabels

  const fieldsFraYears = [
    'year',
    //country config
    ...fieldsCountryConfig,
    ...fieldsVariables,
  ]

  const fraYears = new CSVOutputFile('FRA_Years', fieldsFraYears)

  // variable output fields
  const variablesOutputFiles = {}
  fieldsVariables.forEach(field => {
    const variableOutputFile = new CSVOutputFile(
      `fraYearVariables/${field.label}`,
      [
        ...fieldsCountryConfig,
        ...YEARS_FRA.map(R.toString)
      ]
    )
    variablesOutputFiles[field.label] = variableOutputFile
  })

  await Promise.each(
    countries.map(getCountryData),
    countryResult => {

      // push content to fraYears output file
      fraYears.pushContent(countryResult)

      // push content to each variable output file
      fieldsVariables.forEach(field => {

        // create row for variable output file
        const countryResultRowFirst = countryResult[0]
        const rowVariableOutputFile = {
          ...R.pick(
            [
              'region', 'countryIso', 'listNameEn',
              ...fieldsCountryConfig.map(R.prop('value'))
            ],
            countryResultRowFirst
          )
        }

        countryResult.forEach((rowResult, i) => {
          const year = YEARS_FRA[i]
          rowVariableOutputFile[R.toString(year)] = rowResult[field.value]
        })

        const variableOutputFile = variablesOutputFiles[field.label]
        variableOutputFile.pushContent(rowVariableOutputFile)
      })
    }
  )

  fraYears.pushContentDone()
  Object.values(variablesOutputFiles).forEach(variableOutputFiles => {
    variableOutputFiles.pushContentDone()
  })

  return {
    fraYears,
    ...variablesOutputFiles
  }
}

module.exports = {
  exportData
}
