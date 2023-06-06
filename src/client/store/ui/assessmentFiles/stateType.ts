import { CountryIso } from 'meta/area'
import { AssessmentFile } from 'meta/assessment'

export type AssessmentFilesState = {
  [key in CountryIso | string]: Array<AssessmentFile>
}
