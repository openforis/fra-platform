import { CycleParams } from 'meta/api/request/cycle'
import { CountryIso } from 'meta/area/countryIso'
import { Global } from 'meta/area/global'
import { RegionCode } from 'meta/area/regionCode'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export type Props = CycleParams & {
  auth?: { assessmentName: AssessmentName; cycleName: CycleName }
  countryISOs?: Array<CountryIso>
  countryIso?: CountryIso
  mergeOdp?: boolean
  regionCode?: RegionCode | Global.WO
  tableNames: Array<string>
}
