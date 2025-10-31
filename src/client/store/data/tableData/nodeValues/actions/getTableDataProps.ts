import { CycleParams } from 'meta/api/request'
import { CountryIso } from 'meta/area/countryIso'
import { RegionCode } from 'meta/area/regionCode'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export type Props = CycleParams & {
  auth?: { assessmentName: AssessmentName; cycleName: CycleName }
  mergeOdp?: boolean
  tableNames: Array<string>
  countryISOs?: Array<CountryIso>
  regionCode?: RegionCode
}
