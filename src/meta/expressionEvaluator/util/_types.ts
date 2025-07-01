import { Country } from 'meta/area'
import { AssessmentName, RecordAssessments } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export type BaseContext = {
  assessments: RecordAssessments
  assessmentName: AssessmentName
  cycleName: CycleName
  country?: Country
}
