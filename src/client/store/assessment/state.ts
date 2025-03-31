import { Settings } from 'meta/assessment'
import { Assessment } from 'meta/assessment/assessment'

export interface AssessmentState {
  appInitialized: boolean
  assessments: Array<Assessment>
  settings: Settings
}

export const initialState: AssessmentState = {
  appInitialized: false,
  assessments: [],
  settings: { defaultAssessmentId: -1 },
}
