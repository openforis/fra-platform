import { ExpressionContext } from '@openforis/arena-core'

import { AssessmentName, RecordAssessments, RowCache } from 'meta/assessment'
import { CycleName } from 'meta/assessment/cycle'

export interface Context extends ExpressionContext {
  assessments: RecordAssessments
  assessmentName: AssessmentName
  cycleName: CycleName
  row: RowCache
  type: 'calculations' | 'validations'
}
