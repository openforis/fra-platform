import { Assessment } from 'meta/assessment/assessment'

export type AssessmentState = {
  assessments: Array<Assessment>
}

export const initialState: AssessmentState = {
  assessments: [],
}
