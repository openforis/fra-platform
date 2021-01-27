// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'DegradedFo... Remove this comment to see the full error message
class DegradedForestExporter extends TraditionalTableExporter {
  constructor() {
    super('degradedForest', ['y_n'], '5c')
  }

  parseResultRow(result: any, yearIdx: any) {
    const resultRow = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      resultRow[field] = R.path([fieldIdx, 0], result)
    })

    return resultRow
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new DegradedForestExporter()

module.exports = instance
