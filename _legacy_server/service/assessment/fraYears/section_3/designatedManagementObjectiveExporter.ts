import * as R from 'ramda'

import { Numbers } from '@core/utils/numbers'
import { getForestAreaForYear } from '@common/extentOfForestHelper'
import { DataTableService } from '../../../dataTable'

import DataTableExporter from '../../exporter/dataTableExporter'

const fieldsPrimary = [
  'prim_prod',
  'prim_prot',
  'prim_biodiv',
  'prim_socserv',
  'prim_multi',
  'prim_other',
  'prim_no_unknown',
]
const fieldsTotalArea = ['tot_prod', 'tot_prot', 'tot_biodiv', 'tot_socserv', 'tot_other']

class DesignatedManagementObjectiveExporter extends DataTableExporter {
  constructor() {
    super('primaryDesignatedManagementObjective', [...fieldsPrimary, ...fieldsTotalArea], '3a')
  }

  fetchData(countryIso: any) {
    return Promise.all([
      DataTableService.read({ countryIso, tableSpecName: this.tableName }),
      DataTableService.read({ countryIso, tableSpecName: 'totalAreaWithDesignatedManagementObjective' }),
    ])
  }

  parseResultRow([primary, totalArea]: any[], yearIdx: any, year: any, extentOfForest: any) {
    const resultRow: { [key: string]: any } = {}

    fieldsPrimary.forEach((field, fieldIdx) => {
      resultRow[field] = R.path([fieldIdx, yearIdx], primary)
    })

    const unknownValue = R.reduce(
      (value: any, row: any) => {
        const rowValue = R.pipe(R.path([row, yearIdx]), R.defaultTo(0))(primary)

        // @ts-ignore
        return Numbers.sub(value, rowValue)
      },
      getForestAreaForYear(extentOfForest, year),
      R.range(0, 6)
    )

    resultRow.prim_no_unknown = unknownValue

    fieldsTotalArea.forEach((field, fieldIdx) => {
      resultRow[field] = R.path([fieldIdx, yearIdx], totalArea)
    })

    return resultRow
  }
}

const instance = new DesignatedManagementObjectiveExporter()

export default instance
