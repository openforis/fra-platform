import * as R from 'ramda'

import TraditionalTableExporter from '../../exporter/traditionalTableExporter'

const yearsIdx: { [key: string]: number } = {
  '1990': 0,
  '2000': 1,
  '2010': 2,
  '2015': 3,
  '2020': 8,
}

class ForestAreaWithinProtectedAreasExporter extends TraditionalTableExporter {
  constructor() {
    super('forestAreaWithinProtectedAreas', ['protected', 'forMngt', 'mngtProt'], '3b')
  }

  parseResultRow(result: any, yearIdx: any, year: any) {
    const resultRow: { [key: string]: any } = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      const yearIdxTable = yearsIdx[year.toString()]
      resultRow[field] = R.path([fieldIdx, yearIdxTable], result)
    })

    return resultRow
  }
}

const instance = new ForestAreaWithinProtectedAreasExporter()

export default instance
