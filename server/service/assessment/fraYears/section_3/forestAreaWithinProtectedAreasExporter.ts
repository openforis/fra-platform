import * as R from 'ramda'

import DataTableExporter from '../../exporter/dataTableExporter'

const yearsIdx: { [key: string]: number } = {
  '1990': 0,
  '2000': 1,
  '2010': 2,
  '2015': 3,
  '2020': 8,
}

class ForestAreaWithinProtectedAreasExporter extends DataTableExporter {
  constructor() {
    super('forestAreaWithinProtectedAreas', ['protected', 'forMngt', 'mngtProt'], '3b')
  }

  parseResultRow(result: any, _yearIdx: any, year: any) {
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
