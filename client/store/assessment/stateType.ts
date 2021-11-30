import { Assessment } from '@core/meta/assessment'
import { Country } from '@core/country'
import { RegionGroup } from '@core/meta/regionGroup'

export interface AssessmentState {
  assessment?: Assessment
  countries?: Array<Country>
  regionGroups?: Record<string, RegionGroup>
}
