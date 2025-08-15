import { ColName } from 'meta/assessment/col'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}

export interface SortState {
  colName: ColName | null
  order: SortOrder
}

export interface Props {
  rowsData: Array<Row>
  data: RecordAssessmentData
  table: Table
}
