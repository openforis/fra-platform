import { VariableCache } from 'meta/assessment'

export type RowsMetadata = Array<{
  id: number
  label: string
  variableName: string
  calculateFn: string
  calculationDependencies: Array<VariableCache>
}>
