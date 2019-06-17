const R = require('ramda')

const FraTableExporter = require('./fraTableExporter')

const CountryService = require('../../../country/countryService')

class CountryConfigExporter extends FraTableExporter {

  constructor () {
    super(
      '',
      ['boreal', 'temperate', 'tropical', 'subtropical']
    )
  }

  fetchData (countryIso) {
    return CountryService.getCountryConfigFull(countryIso)
  }

  parseResultRow (result, yearIdx, year) {

    return ({
      boreal: R.path(['climaticDomainPercents', 'boreal'], result),
      temperate: R.path(['climaticDomainPercents', 'temperate'], result),
      tropical: R.path(['climaticDomainPercents', 'tropical'], result),
      subtropical: R.path(['climaticDomainPercents', 'subtropical'], result),
    })
  }

}

const instance = new CountryConfigExporter()

module.exports = instance
