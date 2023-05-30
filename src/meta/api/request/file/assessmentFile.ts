import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

export type AssessmentFileBody = {
  assessmentName: AssessmentName
  fileCountryIso?: CountryIso
}
