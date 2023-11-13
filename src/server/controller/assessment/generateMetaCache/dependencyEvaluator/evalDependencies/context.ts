import { ExpressionContext } from '@openforis/arena-core'

import { Assessment, AssessmentName, CycleName, RowCache } from 'meta/assessment'

export interface Context extends ExpressionContext {
  assessments: Array<Assessment>
  assessmentName: AssessmentName
  cycleName: CycleName
  row: RowCache
  type: 'calculations' | 'validations'
}
