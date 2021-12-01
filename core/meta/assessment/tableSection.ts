import { CycledPropsObject, Table } from '@core/meta/assessment'

export interface TableSectionProps {
  descriptionKey?: string
  labelKey?: string
}

export interface TableSection extends CycledPropsObject<TableSectionProps> {
  sectionId: number
  tables?: Array<Table>
}
