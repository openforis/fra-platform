import { CycledPropsObject } from '@core/meta/assessment/cycle'
import { Table } from '@core/meta/assessment/table'

export interface TableSectionProps {
  descriptionKey?: string
  labelKey?: string
}

export interface TableSection extends CycledPropsObject<TableSectionProps> {
  sectionId: number
  tables?: Array<Table>
}
