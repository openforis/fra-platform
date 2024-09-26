import { CycleParams } from 'meta/api/request'
import { CountryIso, RegionCode } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'

export type Props = CycleParams & {
  auth?: { assessmentName: AssessmentName; cycleName: CycleName }
  mergeOdp?: boolean
  tableNames: Array<string>
  countryISOs?: Array<CountryIso>
  regionCode?: RegionCode
}
