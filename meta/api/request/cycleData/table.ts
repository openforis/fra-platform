import { NodeValue } from '@meta/assessment'

export type NodesBodyValue = {
  variableName: string
  colName: string
  value: NodeValue
}

export type NodesBody = {
  tableName: string
  values: Array<NodesBodyValue>
}
