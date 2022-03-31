import { CountryIso } from '@core/country'
import { Assessment, Section } from '@meta/assessment'
import { RegionGroup } from '@meta/area'
import { CountryStatus } from '@meta/area/country'

export interface AssessmentState {
  assessment?: Assessment
  countryISOs?: Array<CountryIso>
  regionGroups?: Record<string, RegionGroup>
  sections?: Array<Section>
  countryStatus?: CountryStatus
}
