import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

export type AssessmentCycle = { assessment: Assessment; cycle: Cycle }

export type Failure = {
  assessmentName: string
  countryIso: CountryIso
  cycleName: string
  error: unknown
}
