import { AssessmentNames } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleNames } from 'meta/assessment/cycle/names'
import { contextMock } from 'meta/expressionEvaluator/context.mock'

export const assessment = contextMock.assessments[AssessmentNames.fra]
export const cycle = Assessments.getCycle({ assessment, cycleName: CycleNames._2025 })
