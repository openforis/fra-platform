import { Table } from '@meta/assessment'
import { TableData } from '@meta/data'

export type AssessmentSectionState = {
  data?: Record<string, TableData>
  metaData?: Array<Table>
}
