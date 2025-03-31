import { AssessmentName } from 'meta/assessment/assessment'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
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
  odp?: ODPColHeader
}

export type ODPColHeader = {
  id: number
  year: string
}
