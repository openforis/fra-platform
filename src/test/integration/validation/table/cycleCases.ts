import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'

import { cases as fra2025 } from './cases/fra'
import { cases as panEuropean2025 } from './cases/panEuropean'
import { TableValidationCycleCases } from './types'

export const cycleCases: Array<TableValidationCycleCases> = [
  { assessmentName: AssessmentNames.fra, cases: fra2025, cycleName: CycleNames._2025 },
  { assessmentName: AssessmentNames.panEuropean, cases: panEuropean2025, cycleName: CycleNames._2025 },
]
