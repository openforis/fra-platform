import { CycledPropsObject, Label, Table } from './index'

export interface TableSectionProps {
  descriptions: Record<string, Label> // label by cycle uuid
  labels: Record<string, Label> // label by cycle uuid
}

export interface TableSection extends CycledPropsObject<TableSectionProps> {
  sectionId?: number
  tables?: Array<Table>
}
