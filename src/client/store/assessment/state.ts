import { Assessment } from 'meta/assessment/assessment'

export interface AssessmentState {
  appInitialized: boolean
  assessments: Array<Assessment>
}

export const initialState: AssessmentState = {
  appInitialized: false,
  assessments: [],
}
