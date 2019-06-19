const R = require('ramda')

const AccessControl = require('../../utils/accessControl')

const CountryService = require('../../country/countryService')

const FRAYearsExporter = require('./fraYears/fraYearsExporter')

const exportData = async user => {
  AccessControl.checkAdminAccess(user)

  const countriesAll = await CountryService.getAllCountriesList()
  const countries = R.reject(R.propEq('region', 'atlantis'), countriesAll)

  const fraYearsExport = await FRAYearsExporter.exportData(countries)

  return {
    ...fraYearsExport
  }
}

module.exports = {
  exportData
}
