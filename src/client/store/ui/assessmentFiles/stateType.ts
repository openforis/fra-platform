import { CountryIso } from 'meta/area'
import { AssessmentFile } from 'meta/cycleData'

export type AssessmentFileLoading = AssessmentFile & { loading?: boolean }

export type AssessmentFilesState = {
  [key in CountryIso | string]: Array<AssessmentFileLoading>
}
