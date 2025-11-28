import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Numbers } from 'utils/numbers'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

const tableName = TableNames.extentOfForest
const variableName = 'forestArea'

export const maxForestArea: ExpressionFunction<Context> = {
  name: 'maxForestArea',
  minArity: 0,
  executor: (context) => {
    return (): string | undefined => {
      const { assessmentName, countryIso, cycleName, data } = context
      const tableData = RecordAssessmentDatas.getTableData({ assessmentName, cycleName, countryIso, data, tableName })

      return Object.keys(tableData).reduce((acc, colName) => {
        const propsDatum = { assessmentName, cycleName, data, countryIso, tableName, variableName, colName }
        const currentValue = RecordAssessmentDatas.getDatum(propsDatum)

        if (!acc || Numbers.greaterThan(currentValue, acc)) {
          return currentValue
        }
        return acc
      }, undefined)
    }
  },
}
