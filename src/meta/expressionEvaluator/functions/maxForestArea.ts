import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from '@utils/numbers'

import { TableNames } from '@meta/assessment'
import { RecordAssessmentDatas } from '@meta/data'

import { Context } from '../context'

export const maxForestArea: ExpressionFunction<Context> = {
  name: 'maxForestArea',
  minArity: 0,
  executor: (context) => {
    return (): string | undefined => {
      const { data, countryIso, assessment, cycle } = context
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
