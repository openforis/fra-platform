import { ColName } from 'meta/assessment/col'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

export type TableValidations = Record<ColName, Record<VariableName, NodeValueValidation>>

export type RecordTableValidationsState = Record<TableName, TableValidations>
