import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { RecordAssessmentData } from '../RecordAssessmentData'

export type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  data: RecordAssessmentData
  countryIso: CountryIso
  tableName: string
  variableName: string
  colName: string
}
