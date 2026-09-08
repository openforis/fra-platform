import { VariableCache } from 'meta/assessment/metaCache'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { NodeUpdate } from 'meta/data/nodeUpdates'

type Cell = Required<Pick<VariableCache, 'colName' | 'tableName' | 'variableName'>>

export type TableValidationTestCase = {
  // The cell whose validation is executed and checked
  cell: Cell
  data: Array<NodeUpdate>
  // Valid cells have no stored validation entry, so valid cases state expected: undefined
  expected: NodeValueValidation | undefined
  name: string
}
