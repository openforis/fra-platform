// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableService = require('../../../../traditionalTable/traditionalTableRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sub'.
const { sub } = require('../../../../../common/bignumberUtils')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getForestA... Remove this comment to see the full error message
const { getForestAreaForYear } = require('../../../../../common/extentOfForestHelper')

const fieldsPrimary = [
  'prim_prod',
  'prim_prot',
  'prim_biodiv',
  'prim_socserv',
  'prim_multi',
  'prim_other',
  'prim_no_unknown',
]
const fieldsTotalArea = ['tot_prod', 'tot_prot', 'tot_biodiv', 'tot_socserv', 'tot_other']

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Designated... Remove this comment to see the full error message
class DesignatedManagementObjectiveExporter extends TraditionalTableExporter {
  constructor() {
    super('primaryDesignatedManagementObjective', [...fieldsPrimary, ...fieldsTotalArea], '3a')
  }

  fetchData(countryIso: any) {
    return Promise.all([
      TraditionalTableService.read(countryIso, this.tableName),
      TraditionalTableService.read(countryIso, 'totalAreaWithDesignatedManagementObjective'),
    ])
  }

  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'primary' implicitly has an 'any' ... Remove this comment to see the full error message
  parseResultRow([primary, totalArea], yearIdx: any, year: any, extentOfForest: any) {
    const resultRow = {}

    fieldsPrimary.forEach((field, fieldIdx) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      resultRow[field] = R.path([fieldIdx, yearIdx], primary)
    })

    const unknownValue = R.reduce(
      (value: any, row: any) => {
        const rowValue = R.pipe(R.path([row, yearIdx]), R.defaultTo(0))(primary)

        return sub(value, rowValue)
      },
      getForestAreaForYear(extentOfForest, year),
      R.range(0, 6)
    )

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'prim_no_unknown' does not exist on type ... Remove this comment to see the full error message
    resultRow.prim_no_unknown = unknownValue

    fieldsTotalArea.forEach((field, fieldIdx) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      resultRow[field] = R.path([fieldIdx, yearIdx], totalArea)
    })

    return resultRow
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new DesignatedManagementObjectiveExporter()

module.exports = instance
