import { Assessment } from '@core/meta/assessment'
import { Country, Region } from '@core/country'
import { RegionGroup } from '@core/meta/regionGroup'

export interface AssessmentState {
  assessment?: Assessment
  countries?: Array<Country>
  regions?: Array<Region>
  regionGroups?: Array<RegionGroup>
}
