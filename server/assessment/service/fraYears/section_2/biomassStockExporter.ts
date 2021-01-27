import * as R from 'ramda'

import TraditionalTableExporter from '../../exporter/traditionalTableExporter'

const yearsIdx: { [key: string]: any } = {
  '1990': 0,
  '2000': 1,
  '2010': 2,
  '2015': 3,
  '2020': 8,
}

class BiomassStockExporter extends TraditionalTableExporter {
  constructor() {
    super('biomassStock', ['agb', 'bgb', 'dwb'], '2c')
  }

  parseResultRow(result: any, yearIdx: any, year: any) {
    const resultRow: { [key: string]: any } = {}

    this.fields.forEach((field: string, fieldIdx: any) => {
      const yearIdxTable = yearsIdx[year.toString()]
      resultRow[field] = R.path([fieldIdx, yearIdxTable], result)
    })

    return resultRow
  }
}

const instance = new BiomassStockExporter()

export default instance
