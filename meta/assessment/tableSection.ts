import { CycledPropsObject, Table } from './index'

export interface TableSectionProps {
  descriptionKey?: string
  labelKey?: string
}

export interface TableSection extends CycledPropsObject<TableSectionProps> {
  sectionId: number
  tables?: Array<Table>
}
