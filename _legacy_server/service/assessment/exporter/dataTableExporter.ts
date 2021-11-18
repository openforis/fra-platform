import * as R from 'ramda'

import { DataTableService } from '@server/service'
import FraTableExporter from './fraTableExporter'

class DataTableExporter extends FraTableExporter {
  fetchData(countryIso: any) {
    return DataTableService.read({ countryIso, tableSpecName: this.tableName })
  }

  parseResultRow(result: any, yearIdx: any, _year?: any, _x?: any) {
    const resultRow: { [key: string]: any } = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      resultRow[field] = R.path([fieldIdx, yearIdx], result)
    })

    return resultRow
  }
}

export default DataTableExporter
