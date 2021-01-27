// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sub'.
const { sub } = require('../../../../../common/bignumberUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'HolderOfMa... Remove this comment to see the full error message
class HolderOfManagementRightsExporter extends TraditionalTableExporter {
  constructor() {
    super('holderOfManagementRights', ['pub_admin', 'individuals', 'bus_inst_mr', 'indigenous_mr', 'unknown'], '4b')
  }

  parseResultRow(result: any, yearIdx: any, year: any, forestOwnership: any) {
    const resultRow = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      const value = R.path([fieldIdx, yearIdx], result)
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      resultRow[field] = value
    })

    const unknownValue = R.reduce(
      (value: any, row: any) => {
        const rowValue = R.pipe(R.path([row, yearIdx]), R.defaultTo(0))(result)

        return sub(value, rowValue)
      },
      R.path([4, yearIdx], forestOwnership),
      [0, 1, 2, 3]
    )

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'unknown' does not exist on type '{}'.
    resultRow.unknown = year < 2020 ? unknownValue : null

    return resultRow
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new HolderOfManagementRightsExporter()

module.exports = instance
