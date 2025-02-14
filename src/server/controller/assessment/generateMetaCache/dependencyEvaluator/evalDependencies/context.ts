import { ExpressionContext } from '@openforis/arena-core'

import { Assessment, AssessmentName, Cycle, CycleName, RecordAssessments, RowCache } from 'meta/assessment'

export interface Context extends ExpressionContext {
  assessments: RecordAssessments
  assessment: Assessment
  assessmentName: AssessmentName
  cycle: Cycle
  cycleName: CycleName
  row: RowCache
  type: 'calculations' | 'validations'
}
