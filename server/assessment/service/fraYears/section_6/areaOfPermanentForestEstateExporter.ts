// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'AreaOfPerm... Remove this comment to see the full error message
class AreaOfPermanentForestEstateExporter extends TraditionalTableExporter {
  constructor() {
    super('areaOfPermanentForestEstate', ['pfe_y_n', 'pfe_area'], '6b')
  }

  parseResultRow(result: any, yearIdx: any) {
    const resultRow = {}

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'pfe_y_n' does not exist on type '{}'.
    resultRow.pfe_y_n = R.path([0, 0], result)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'pfe_area' does not exist on type '{}'.
    resultRow.pfe_area = R.path([0, yearIdx + 1], result)

    return resultRow
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new AreaOfPermanentForestEstateExporter()

module.exports = instance
