import { Assessment } from 'meta/assessment/assessment'
import { Settings } from 'meta/assessment/settings'

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
