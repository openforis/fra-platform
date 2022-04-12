import { CountryIso } from '@core/country'
import { Assessment, Section } from '@meta/assessment'
import { Country, RegionGroup } from '@meta/area'

export interface AssessmentState {
  assessment?: Assessment
  countryISOs?: Array<CountryIso>
  regionGroups?: Record<string, RegionGroup>
  sections?: Array<Section>
  country?: Country
}
