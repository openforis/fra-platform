import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'

export type CountryProps = {
  assessment: Assessment
  country: Country
  cycle: Cycle
}

export type Failure = {
  assessmentName: AssessmentName
  countryIso?: CountryIso
  cycleName: CycleName
  error: unknown
}
