import { CycleParams } from 'meta/api/request'
import { CountryIso, RegionCode } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export type Props = CycleParams & {
  auth?: { assessmentName: AssessmentName; cycleName: CycleName }
  mergeOdp?: boolean
  tableNames: Array<string>
  countryISOs?: Array<CountryIso>
  regionCode?: RegionCode
}
