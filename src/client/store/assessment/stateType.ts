import { Country, CountryIso, RegionGroup } from 'meta/area'
import { Assessment, Section } from 'meta/assessment'

type Countries = {
  [key in CountryIso]?: Country
}

export interface AssessmentState {
  assessment?: Assessment
  countries?: Countries
  regionGroups?: Record<string, RegionGroup>
  sections?: Array<Section>

  appInitialized: boolean
}
