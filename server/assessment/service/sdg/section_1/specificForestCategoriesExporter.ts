// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'SpecificFo... Remove this comment to see the full error message
class SpecificForestCategoriesExporter extends TraditionalTableExporter {
  constructor() {
    super('specificForestCategories', ['mangroves'], '1c')
  }

  parseResultRow(result: any, yearIdx: any) {
    const resultRow = {
      mangroves: R.path([3, yearIdx], result),
    }

    return resultRow
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new SpecificForestCategoriesExporter()

module.exports = instance
