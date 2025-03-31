import { ExpressionContext } from '@openforis/arena-core'

import { AssessmentName, RecordAssessments } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { RowCache } from 'meta/assessment/rowCache'

export interface Context extends ExpressionContext {
  assessments: RecordAssessments
  assessmentName: AssessmentName
  cycleName: CycleName
  row: RowCache
  type: 'calculations' | 'validations'
}
