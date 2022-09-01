import { AssessmentType, TableData, TableDatumODP } from '@core/assessment'
import { RowSpec, TableSpec } from '@webapp/sectionSpec'

export type Props = {
  assessmentType: AssessmentType
  sectionName: string
  tableSpec: TableSpec
  rowSpec: RowSpec
  variableName: keyof TableDatumODP
  disabled: boolean
  data: TableData
  datum: TableDatumODP
}
