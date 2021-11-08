import { CycledPropsObject } from '@core/meta/cycle'
import { Table } from '@core/meta/table'

export interface TableSectionProps {
  descriptionKey?: string
  labelKey?: string
}

export interface TableSection extends CycledPropsObject<TableSectionProps> {
  sectionId: number
  tables?: Array<Table>
}
