import { ExpressionContext } from '@openforis/arena-core'

import { AssessmentName, CycleName, RecordAssessments, RowCache } from 'meta/assessment'

export interface Context extends ExpressionContext {
  assessments: RecordAssessments
  assessmentName: AssessmentName
  cycleName: CycleName
  row: RowCache
  type: 'calculations' | 'validations'
}
