import * as R from 'ramda'

import DataTableExporter from '../../exporter/dataTableExporter'

class DegradedForestExporter extends DataTableExporter {
  constructor() {
    super('degradedForest', ['y_n'], '5c')
  }

  parseResultRow(result: any, yearIdx: any) {
    const resultRow: { [key: string]: any } = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      resultRow[field] = R.path([fieldIdx, 0], result)
    })

    return resultRow
  }
}

const instance = new DegradedForestExporter()

export default instance
