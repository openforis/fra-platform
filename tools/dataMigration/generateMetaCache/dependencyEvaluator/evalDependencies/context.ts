import { ExpressionContext } from '@openforis/arena-core'

import { AssessmentMetaCache } from '../../../../../src/meta/assessment/assessmentMetaCache'
import { Row } from '../../../../../src/meta/assessment/row'

export interface Context extends ExpressionContext {
  assessmentMetaCache: AssessmentMetaCache
  row: Row
  tableName: string
  type: 'calculations' | 'validations'
}
