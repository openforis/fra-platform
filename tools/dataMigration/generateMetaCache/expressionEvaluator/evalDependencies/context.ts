import { ExpressionContext } from '@arena/core'
import { AssessmentMetaCache } from '../../../../../meta/assessment/assessmentMetaCache'
import { Row } from '../../../../../meta/assessment/row'

export interface Context extends ExpressionContext {
  assessmentMetaCache: AssessmentMetaCache
  row: Row
  tableName: string
}
