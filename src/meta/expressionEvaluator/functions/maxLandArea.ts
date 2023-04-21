import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from '@utils/numbers'

import { TableNames } from '@meta/assessment'
import { TableDatas } from '@meta/data'

import { Context } from '../context'

export const maxLandArea: ExpressionFunction<Context> = {
  name: 'maxLandArea',
  minArity: 0,
  executor: (context) => {
    return (): string | undefined => {
      const { data, countryIso } = context
      const tableData = TableDatas.getTableData({
        countryIso,
        data,
        tableName: TableNames.extentOfForest,
      })
      return Object.keys(tableData).reduce((acc, col) => {
        const currentValue = TableDatas.getDatum({
          data,
          countryIso,
          tableName: TableNames.extentOfForest,
          variableName: 'totalLandArea',
          colName: col,
        })
        if (!acc || Numbers.greaterThan(currentValue, acc)) {
          return currentValue
        }
        return acc
      }, undefined)
    }
  },
}
