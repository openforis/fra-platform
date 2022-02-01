export interface NodeValue {
  raw: string | null
  estimated?: boolean
}

export interface Node {
  colId: number
  rowId: number
  uuid: string
  value: NodeValue
}
