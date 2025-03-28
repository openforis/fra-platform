import { AssessmentName, RecordAssessments } from 'meta/assessment'
import { CycleName } from 'meta/assessment/cycle'

export type BaseContext = { assessments: RecordAssessments; assessmentName: AssessmentName; cycleName: CycleName }
