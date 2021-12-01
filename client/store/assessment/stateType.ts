import { Country } from '@core/country'
import { Assessment } from '@core/meta/assessment'
import { RegionGroup } from '@core/meta/area'

export interface AssessmentState {
  assessment?: Assessment
  countries?: Array<Country>
  regionGroups?: Record<string, RegionGroup>
}
