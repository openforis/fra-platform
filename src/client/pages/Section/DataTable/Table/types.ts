import { AssessmentName, Row, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

export type RowProps = {
  assessmentName: AssessmentName
  data: RecordAssessmentData
  disabled: boolean
  lastRow?: boolean
  row: Row
  rowCount: number
  rowIndex: number
  sectionName: string
  table: Table
}

export type ColHeader = {
  columnName: string
  odpYear?: ODPYear
}

export type ODPYear = {
  id: number
  year: string
}
