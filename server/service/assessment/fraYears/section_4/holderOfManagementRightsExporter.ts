import * as R from 'ramda'

import { Numbers } from '@core/utils/numbers'

import DataTableExporter from '../../exporter/dataTableExporter'

class HolderOfManagementRightsExporter extends DataTableExporter {
  constructor() {
    super('holderOfManagementRights', ['pub_admin', 'individuals', 'bus_inst_mr', 'indigenous_mr', 'unknown'], '4b')
  }

  parseResultRow(result: any, yearIdx: any, year: any, forestOwnership: any) {
    const resultRow: { [key: string]: any } = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      const value = R.path([fieldIdx, yearIdx], result)
      resultRow[field] = value
    })

    const unknownValue = R.reduce(
      (value: any, row: any) => {
        const rowValue = R.pipe(R.path([row, yearIdx]), R.defaultTo(0))(result)

        // @ts-ignore
        return Numbers.sub(value, rowValue)
      },
      R.path([4, yearIdx], forestOwnership),
      [0, 1, 2, 3]
    )

    resultRow.unknown = year < 2020 ? unknownValue : null

    return resultRow
  }
}

const instance = new HolderOfManagementRightsExporter()

export default instance
