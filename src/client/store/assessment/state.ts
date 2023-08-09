import { Assessment, Section, Settings } from 'meta/assessment'

export interface AssessmentState {
  appInitialized: boolean
  assessments: Array<Assessment>
  settings: Settings
  // TODO: move to metadata slice and store by cycle?
  sections?: Array<Section>
}

export const initialState: AssessmentState = {
  appInitialized: false,
  assessments: [],
  settings: { defaultAssessmentId: -1 },
}
