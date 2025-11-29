import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

const tableName = TableNames.extentOfForest
const variableName = 'totalLandArea'

export const maxLandArea: ExpressionFunction<Context> = {
  name: 'maxLandArea',
  minArity: 0,
  executor: (context) => {
    return (): string | undefined => {
      const { assessmentName, countryIso, cycleName, data } = context

      return RecordAssessmentDatas.getMaxValue({ assessmentName, countryIso, cycleName, data, tableName, variableName })
    }
  },
}
