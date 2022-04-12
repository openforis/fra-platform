import { CountryIso } from '@core/country'
import { Assessment, Section } from '@meta/assessment'
import { Country, RegionGroup } from '@meta/area'

export interface AssessmentState {
  assessment?: Assessment
  countries?: Record<CountryIso, Country>
  regionGroups?: Record<string, RegionGroup>
  sections?: Array<Section>
}
