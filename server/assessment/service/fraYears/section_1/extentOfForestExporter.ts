// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'FraValueSe... Remove this comment to see the full error message
const FraValueService = require('../../../../eof/fraValueService')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'FraTableEx... Remove this comment to see the full error message
const FraTableExporter = require('../../exporter/fraTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ExtentOfFo... Remove this comment to see the full error message
class ExtentOfForestExporter extends FraTableExporter {
  constructor() {
    super('extentOfForest', ['forestArea', 'otherWoodedLand', 'landArea'], '1a')
  }

  fetchData(countryIso: any) {
    return FraValueService.getFraValues(this.tableName, countryIso)
  }

  // @ts-expect-error ts-migrate(2416) FIXME: Property 'parseResultRow' in type 'ExtentOfForestE... Remove this comment to see the full error message
  parseResultRow(result: any, yearIdx: any, year: any, countryConfig: any) {
    const eofYear = R.pipe(R.prop('fra'), R.find(R.propEq('year', year)), R.defaultTo({}))(result)

    return {
      forestArea: R.prop('forestArea', eofYear),
      otherWoodedLand: R.prop('otherWoodedLand', eofYear),
      landArea: R.path(['faoStat', year, 'area'], countryConfig),
    }
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new ExtentOfForestExporter()

module.exports = instance
