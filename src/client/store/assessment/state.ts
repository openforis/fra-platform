import { Country, CountryIso, RegionGroup } from 'meta/area'
import { Assessment, Section, Settings } from 'meta/assessment'

type Countries = {
  [key in CountryIso]?: Country
}

export interface AssessmentState {
  appInitialized: boolean
  assessments: Array<Assessment>
  settings: Settings
  // TODO: move to areas slice and store by cycle?
  countries?: Countries
  regionGroups?: Record<string, RegionGroup>
  // TODO: move to metadata slice and store by cycle?
  sections?: Array<Section>
}

export const initialState: AssessmentState = {
  appInitialized: false,
  assessments: [],
  settings: { defaultAssessmentId: -1 },
}
