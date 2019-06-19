const R = require('ramda')
const Promise = require('bluebird')

const AccessControl = require('../../utils/accessControl')

const CountryService = require('../../country/countryService')

const FRAYearsExporter = require('./fraYears/fraYearsExporter')
const IntervalYearsExporter = require('./intervals/intervalYearsExporter')

const exportData = async user => {
  AccessControl.checkAdminAccess(user)

  const countriesAll = await CountryService.getAllCountriesList()
  const countries = R.reject(R.propEq('region', 'atlantis'), countriesAll)

  const [fraYearsExport, intervalsExport] = await Promise.all([
    FRAYearsExporter.exportData(countries),
    IntervalYearsExporter.exportData(countries)
  ])

  return {
    ...fraYearsExport,
    ...intervalsExport,
  }
}

module.exports = {
  exportData
}
