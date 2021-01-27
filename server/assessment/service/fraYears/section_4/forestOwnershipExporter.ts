// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sub'.
const { sub } = require('../../../../../common/bignumberUtils')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getForestA... Remove this comment to see the full error message
const { getForestAreaForYear } = require('../../../../../common/extentOfForestHelper')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ForestOwne... Remove this comment to see the full error message
class ForestOwnershipExporter extends TraditionalTableExporter {
  constructor() {
    super('forestOwnership', ['priv_own', 'individ', 'bus_inst_fo', 'indigenous_fo', 'pub_own', 'fo_unknown'], '4a')
  }

  parseResultRow(result: any, yearIdx: any, year: any, extentOfForest: any) {
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
      getForestAreaForYear(extentOfForest, year),
      [0, 4]
    )

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fo_unknown' does not exist on type '{}'.
    resultRow.fo_unknown = year < 2020 ? unknownValue : null

    return resultRow
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new ForestOwnershipExporter()

module.exports = instance
