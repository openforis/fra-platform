const R = require('ramda')
const Promise = require('bluebird')

const AccessControl = require('../../utils/accessControl')

const CountryService = require('../../country/countryService')

const FRAYearsExporter = require('./fraYears/fraYearsExporter')
const IntervalYearsExporter = require('./intervals/intervalYearsExporter')
const AnnualYearsExporter = require('./annual/annualYearsExporter')

const JSONOutput = require('./jsonOutput')

const EXPORT_TYPE = {
  JSON: 'json',
  CSV: 'csv',
}

const exportData = async (user, exportType = EXPORT_TYPE.JSON) => {
  AccessControl.checkAdminAccess(user)

  const countriesAll = await CountryService.getAllCountriesList()
  const countries = R.reject(R.propEq('region', 'atlantis'), countriesAll)

  const isExportTypeJson = exportType === EXPORT_TYPE.JSON

  const fraYearsOutput = isExportTypeJson ? new JSONOutput('fraYears') : FRAYearsExporter.getCsvOutput()
  const intervalsOutput = isExportTypeJson ? new JSONOutput('intervals') : IntervalYearsExporter.getCsvOutput()
  const annualOutput = isExportTypeJson ? new JSONOutput('annual') : AnnualYearsExporter.getCsvOutput()

  await Promise.each(
    countries.map(async country =>
      await Promise.all([
        FRAYearsExporter.getCountryData(country),
        IntervalYearsExporter.getCountryData(country),
        AnnualYearsExporter.getCountryData(country),
      ])
    ),

    ([fraYearsRes, intervalsRes, annualRes]) => {
      fraYearsOutput.pushContent(fraYearsRes)
      intervalsOutput.pushContent(intervalsRes)
      annualOutput.pushContent(annualRes)
    }
  )

  fraYearsOutput.pushContentDone()
  intervalsOutput.pushContentDone()
  annualOutput.pushContentDone()

  return {
    ...fraYearsOutput.output,
    ...intervalsOutput.output,
    ...annualOutput.output,
  }
}

module.exports = {
  EXPORT_TYPE,

  exportData,
}
