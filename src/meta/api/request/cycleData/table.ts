import { ColName } from 'meta/assessment/col'
import { NodeValue } from 'meta/assessment/node'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

/**
 * @deprecated
 */
export type EstimateBody = {
  fields: Array<{ annualChangeRates: { past: string; future: string }; variableName: VariableName }>
  method: string
  tableName: TableName
}

export type NodesBodyValue = {
  colName: ColName
  value: NodeValue
  variableName: VariableName
}

export type NodesBody = {
  tableName: TableName
  values: Array<NodesBodyValue>
}
