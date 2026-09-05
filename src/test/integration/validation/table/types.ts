import { ColName } from 'meta/assessment/col'
import { VariableCache } from 'meta/assessment/metaCache'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'

type ColMetadata = {
  colName: ColName
  validateFns?: Array<string>
}

type RowMetadata = {
  cols: Array<ColMetadata>
  tableName: TableName
  validateFns?: Array<string>
  variableName: VariableName
}

type Cell = Required<Pick<VariableCache, 'colName' | 'tableName' | 'variableName'>>

export type TableValidationTestCase = {
  // The cell whose validation is executed and checked
  cell: Cell
  data: Array<NodeUpdate>
  // Valid cells have no stored validation entry, so valid cases state expected: undefined
  expected: NodeValueValidation | undefined
  name: string
  rows: Array<RowMetadata>
}
