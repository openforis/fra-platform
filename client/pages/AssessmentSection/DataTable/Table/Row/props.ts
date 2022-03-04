import { AssessmentName, Row, Table } from '@meta/assessment'
import { TableData } from '@meta/data'

export type Props = {
  assessmentName: AssessmentName
  data: TableData
  sectionName: string
  table: Table
  row: Row
  disabled: boolean
}
