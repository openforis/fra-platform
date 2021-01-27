// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'yearsIdx'.
const yearsIdx = {
  '1990': 0,
  '2000': 1,
  '2010': 2,
  '2015': 3,
  '2020': 8,
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ForestArea... Remove this comment to see the full error message
class ForestAreaWithinProtectedAreasExporter extends TraditionalTableExporter {
  constructor() {
    super('forestAreaWithinProtectedAreas', ['protected', 'forMngt', 'mngtProt'], '3b')
  }

  parseResultRow(result: any, yearIdx: any, year: any) {
    const resultRow = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const yearIdxTable = yearsIdx[year.toString()]
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      resultRow[field] = R.path([fieldIdx, yearIdxTable], result)
    })

    return resultRow
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new ForestAreaWithinProtectedAreasExporter()

module.exports = instance
