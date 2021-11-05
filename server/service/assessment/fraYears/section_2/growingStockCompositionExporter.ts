import * as R from 'ramda'
import { Numbers } from '@core/utils/numbers'

import DataTableExporter from '../../exporter/dataTableExporter'

const fieldsIdx: { [key: string]: number | null } = {
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
  native_total: null,
  'introduced_#1': 13,
  'introduced_#2': 14,
  'introduced_#3': 15,
  'introduced_#4': 16,
  'introduced_#5': 17,
  introduced_remaining: 18,
  introduced_total: null,
  total_gs: null,
}

class GrowingStockCompositionExporter extends DataTableExporter {
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
    const resultRow: { [key: string]: any } = {}

    this.fields.forEach((field: string) => {
      const idx = fieldsIdx[field]
      if (idx !== null) {
        const value = R.path([idx, yearIdx + 2], result)
        resultRow[field] = value
      }
    })

    const nativeFields = R.filter((f: any) => R.startsWith('native', f) && !R.endsWith('total', f), this.fields)
    const nativeValues = nativeFields.map((f: any) => resultRow[f])
    resultRow.native_total = Numbers.sum(nativeValues)

    const introducedFields = R.filter((f: any) => R.startsWith('introduced', f) && !R.endsWith('total', f), this.fields)
    const introducedValues = introducedFields.map((f: any) => resultRow[f])
    resultRow.introduced_total = Numbers.sum(introducedValues)

    resultRow.total_gs = Numbers.sum([resultRow.native_total, resultRow.introduced_total])

    return resultRow
  }
}

const instance = new GrowingStockCompositionExporter()

export default instance
