import { CountryIso } from '@core/country'
import { Assessment } from '@core/meta/assessment'
import { RegionGroup } from '@core/meta/area'

export interface AssessmentState {
  assessment?: Assessment
  countryISOs?: Array<CountryIso>
  regionGroups?: Record<string, RegionGroup>
}
