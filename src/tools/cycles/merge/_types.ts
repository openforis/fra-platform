import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

export type PropsMerge = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycleFrom: Cycle
  cycleTo: Cycle
}
