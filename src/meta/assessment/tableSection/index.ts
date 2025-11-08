import { CycledPropsObject } from 'meta/assessment/cycledObject'
import { Label } from 'meta/assessment/label'
import { Table } from 'meta/assessment/table'
import { UUID } from 'meta/uuid'

export interface TableSectionProps {
  descriptions: Record<string, Label> // label by cycle uuid
  labels: Record<string, Label> // label by cycle uuid
}

export interface TableSection extends CycledPropsObject<TableSectionProps> {
  sectionUuid?: UUID
  tables?: Array<Table>
}
