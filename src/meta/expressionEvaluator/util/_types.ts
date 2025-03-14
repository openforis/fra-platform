import { AssessmentName, CycleName, RecordAssessments } from 'meta/assessment'

export type BaseContext = { assessments: RecordAssessments; assessmentName: AssessmentName; cycleName: CycleName }
