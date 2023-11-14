import { CountryIso } from 'meta/area'
import { AssessmentFile } from 'meta/cycleData'

export type AssessmentFilesState = {
  [key in CountryIso | string]: Array<AssessmentFile>
}
