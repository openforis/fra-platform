// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'FraTableEx... Remove this comment to see the full error message
const FraTableExporter = require('./fraTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CountrySer... Remove this comment to see the full error message
const CountryService = require('../../../country/countryService')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CountryCon... Remove this comment to see the full error message
class CountryConfigExporter extends FraTableExporter {
  constructor() {
    super('', ['boreal', 'temperate', 'tropical', 'subtropical'])
  }

  fetchData(countryIso: any) {
    return CountryService.getCountryConfigFull(countryIso)
  }

  parseResultRow(result: any, yearIdx: any, year: any) {
    return {
      boreal: R.path(['climaticDomainPercents', 'boreal'], result),
      temperate: R.path(['climaticDomainPercents', 'temperate'], result),
      tropical: R.path(['climaticDomainPercents', 'tropical'], result),
      subtropical: R.path(['climaticDomainPercents', 'subtropical'], result),
    }
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new CountryConfigExporter()

module.exports = instance
