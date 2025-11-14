import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { RecordAssessmentData } from 'meta/data/recordData'

export type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  data: RecordAssessmentData
  countryIso: CountryIso
  tableName: string
  variableName: string
  colName: string
}
