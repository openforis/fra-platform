import { AssessmentType, TableData } from '@core/assessment'
import { RowSpec, TableSpec } from '../../../../../sectionSpec'

export type Props = {
  assessmentType: AssessmentType
  data: TableData
  sectionName: string
  tableSpec: TableSpec
  row: RowSpec
  disabled: boolean
}
