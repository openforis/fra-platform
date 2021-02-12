import * as R from 'ramda'

import FraTableExporter from './fraTableExporter'
import * as TraditionalTableService from '../../../traditionalTable/traditionalTableRepository'

class TraditionalTableExporter extends FraTableExporter {
  fetchData(countryIso: any) {
    return TraditionalTableService.read(countryIso, this.tableName)
  }

  parseResultRow(result: any, yearIdx: any, year?: any, x?: any) {
    const resultRow: { [key: string]: any } = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      resultRow[field] = R.path([fieldIdx, yearIdx], result)
    })

    return resultRow
  }
}

export default TraditionalTableExporter
