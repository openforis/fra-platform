import { AssessmentName, Row, Table } from '@meta/assessment'

export type Props = {
  assessmentName: AssessmentName
  data: any[] // TODO
  sectionName: string
  table: Table
  row: Row
  disabled: boolean
}
