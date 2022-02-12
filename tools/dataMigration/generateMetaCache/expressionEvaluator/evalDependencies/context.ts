import { ExpressionContext } from '@arena/core'
import { AssessmentMetaCache, Row, VariableCache } from '../../../../../meta/assessment'

export type VariablesCache = Record<string, VariableCache>

export interface Context extends ExpressionContext {
  assessmentMetaCache: AssessmentMetaCache
  row: Row
  variablesCache: VariablesCache
}
