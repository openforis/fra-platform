import { Numbers } from 'utils/numbers'

import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data'
import { ExpressionFunction } from 'meta/expressions/function'

import { Context } from '../context'

export const maxForestArea: ExpressionFunction<Context> = {
  name: 'maxForestArea',
  minArity: 0,
  executor: (context) => {
    return (): string | undefined => {
      const { assessment, countryIso, cycle, data } = context
      const tableData = RecordAssessmentDatas.getTableData({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,

        countryIso,
        data,
        tableName: TableNames.extentOfForest,
      })

      return Object.keys(tableData).reduce((acc, col) => {
        const currentValue = RecordAssessmentDatas.getDatum({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          data,
          countryIso,
          tableName: TableNames.extentOfForest,
          variableName: 'forestArea',
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
