import { ExpressionContext } from '@openforis/arena-core'

import { RowCache } from 'meta/assessment'
import { AssessmentName, RecordAssessments } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export interface Context extends ExpressionContext {
  assessments: RecordAssessments
  assessmentName: AssessmentName
  cycleName: CycleName
  row: RowCache
  type: 'calculations' | 'validations'
}
