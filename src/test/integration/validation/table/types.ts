import { ColName } from 'meta/assessment/col'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

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

export type Cell = {
  colName: ColName
  tableName: TableName
  variableName: VariableName
}

type CellValue = Cell & {
  raw: string
}

export type TableValidationTestCase = {
  cell: Cell
  data: Array<CellValue>
  // Valid cells have no stored validation entry.
  expected?: NodeValueValidation
  name: string
  rows: Array<RowMetadata>
}
