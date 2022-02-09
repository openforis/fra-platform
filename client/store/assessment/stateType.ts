import { CountryIso } from '@core/country'
import { Assessment, Section, CountryStatus } from '@meta/assessment'
import { RegionGroup } from '@meta/area'

export interface AssessmentState {
  assessment?: Assessment
  countryISOs?: Array<CountryIso>
  regionGroups?: Record<string, RegionGroup>
  sections?: Array<Section>
  countryStatus?: CountryStatus
}
