import { Label, VariableCache } from 'meta/assessment'

export type RowMetadata = {
  id: number
  label: Label
  variableName: string
  calculateFn: string
  calculationDependencies: Array<VariableCache>
}
export type RowsMetadata = Array<RowMetadata>
