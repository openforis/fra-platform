import { NodeValue } from '@meta/assessment'

/**
 * @deprecated
 */
export type EstimateBody = {
  fields: Array<{ annualChangeRates: { past: string; future: string }; variableName: string }>
  method: string
  tableName: string
}

export type NodesBodyValue = {
  variableName: string
  colName: string
  value: NodeValue
}

export type NodesBody = {
  tableName: string
  values: Array<NodesBodyValue>
}
