import { VariableCache } from 'meta/assessment'
import { Label } from 'meta/assessment/label'

export type RowMetadata = {
  id: number
  label: Label
  variableName: string
  calculateFn: string
  calculationDependencies: Array<VariableCache>
}
export type RowsMetadata = Array<RowMetadata>
