import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

export type ContextBuilderProps = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}
