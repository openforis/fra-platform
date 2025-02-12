import { ExpressionContext } from '@openforis/arena-core'

import { Assessment, AssessmentName, Cycle, CycleName, RowCache } from 'meta/assessment'

export interface Context extends ExpressionContext {
  assessments: Array<Assessment>
  assessment: Assessment
  assessmentName: AssessmentName
  cycle: Cycle
  cycleName: CycleName
  row: RowCache
  type: 'calculations' | 'validations'
}
