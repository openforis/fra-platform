import { Table } from '@meta/assessment'
import { TableData } from '@meta/data'

export type AssessmentSectionState = {
  data?: TableData
  metaData?: Array<Table>
}
