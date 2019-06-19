const R = require('ramda')
const Promise = require('bluebird')

const AccessControl = require('../../utils/accessControl')

const CountryService = require('../../country/countryService')

const FRAYearsExporter = require('./fraYears/fraYearsExporter')
const IntervalYearsExporter = require('./intervals/intervalYearsExporter')
const AnnualYearsExporter = require('./annual/annualYearsExporter')

const exportData = async user => {
  AccessControl.checkAdminAccess(user)

  const countriesAll = await CountryService.getAllCountriesList()
  const countries = R.reject(R.propEq('region', 'atlantis'), countriesAll)

  const [
    fraYearsExport,
    intervalsExport,
    annualExport,
  ] = await Promise.all([
    FRAYearsExporter.exportData(countries),
    IntervalYearsExporter.exportData(countries),
    AnnualYearsExporter.exportData(countries),
  ])

  return {
    ...fraYearsExport,
    ...intervalsExport,
    ...annualExport,
  }
}

module.exports = {
  exportData
}
