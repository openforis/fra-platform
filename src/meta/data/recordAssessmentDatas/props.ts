import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'

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
