// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'FraTableEx... Remove this comment to see the full error message
const FraTableExporter = require('./fraTableExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableService = require('../../../traditionalTable/traditionalTableRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
class TraditionalTableExporter extends FraTableExporter {
  fetchData(countryIso: any) {
    return TraditionalTableService.read(countryIso, this.tableName)
  }

  parseResultRow(result: any, yearIdx: any) {
    const resultRow = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      resultRow[field] = R.path([fieldIdx, yearIdx], result)
    })

    return resultRow
  }
}

module.exports = TraditionalTableExporter
