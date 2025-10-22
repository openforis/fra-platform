import { ExpressionContext } from 'lib/expressionEvaluator/context'

import { AssessmentName, RecordAssessments } from 'meta/assessment/assessment'
import { Col } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { RowCache } from 'meta/assessment/rowCache'

export interface Context extends ExpressionContext {
  assessments: RecordAssessments
  assessmentName: AssessmentName
  cycleName: CycleName
  row: RowCache
  col?: Col
  type: 'calculations' | 'validations' | 'enablers'
}
