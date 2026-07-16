import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export type Failure = {
  assessmentName: AssessmentName
  countryIso?: CountryIso
  cycleName: CycleName
  error: unknown
}
