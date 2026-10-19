import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

export type Props = {
  assessment: Assessment
  countryISOs?: Array<CountryIso>
  cycle: Cycle
  force?: boolean
}
