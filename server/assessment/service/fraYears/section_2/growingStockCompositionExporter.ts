// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sum'.
const { sum } = require('../../../../../common/bignumberUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fieldsIdx'... Remove this comment to see the full error message
const fieldsIdx = {
  'native_#1': 0,
  'native_#2': 1,
  'native_#3': 2,
  'native_#4': 3,
  'native_#5': 4,
  'native_#6': 5,
  'native_#7': 6,
  'native_#8': 7,
  'native_#9': 8,
  'native_#10': 9,
  native_remaining: 10,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'native_total' implicitl... Remove this comment to see the full error message
  native_total: null,
  'introduced_#1': 13,
  'introduced_#2': 14,
  'introduced_#3': 15,
  'introduced_#4': 16,
  'introduced_#5': 17,
  introduced_remaining: 18,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'introduced_total' impli... Remove this comment to see the full error message
  introduced_total: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'total_gs' implicitly ha... Remove this comment to see the full error message
  total_gs: null,
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'GrowingSto... Remove this comment to see the full error message
class GrowingStockCompositionExporter extends TraditionalTableExporter {
  constructor() {
    super(
      'growingStockComposition',
      [
        'native_#1',
        'native_#2',
        'native_#3',
        'native_#4',
        'native_#5',
        'native_#6',
        'native_#7',
        'native_#8',
        'native_#9',
        'native_#10',
        'native_remaining',
        'native_total',
        'introduced_#1',
        'introduced_#2',
        'introduced_#3',
        'introduced_#4',
        'introduced_#5',
        'introduced_remaining',
        'introduced_total',
        'total_gs',
      ],
      '2b'
    )
  }

  parseResultRow(result: any, yearIdx: any) {
    const resultRow = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const idx = fieldsIdx[field]
      if (idx !== null) {
        const value = R.path([idx, yearIdx + 2], result)
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        resultRow[field] = value
      }
    })

    const nativeFields = R.filter((f: any) => R.startsWith('native', f) && !R.endsWith('total', f), this.fields)
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const nativeValues = nativeFields.map((f: any) => resultRow[f])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'native_total' does not exist on type '{}... Remove this comment to see the full error message
    resultRow.native_total = sum(nativeValues)

    const introducedFields = R.filter((f: any) => R.startsWith('introduced', f) && !R.endsWith('total', f), this.fields)
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const introducedValues = introducedFields.map((f: any) => resultRow[f])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'introduced_total' does not exist on type... Remove this comment to see the full error message
    resultRow.introduced_total = sum(introducedValues)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'total_gs' does not exist on type '{}'.
    resultRow.total_gs = sum([resultRow.native_total, resultRow.introduced_total])

    return resultRow
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new GrowingStockCompositionExporter()

module.exports = instance
