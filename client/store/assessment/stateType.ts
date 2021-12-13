import { CountryIso } from '@core/country'
import { Assessment } from '@meta/assessment'
import { RegionGroup } from '@meta/area'

export interface AssessmentState {
  assessment?: Assessment
  countryISOs?: Array<CountryIso>
  regionGroups?: Record<string, RegionGroup>
}
