export interface NodeValue {
  raw: string | null
  estimated?: boolean
  calculated?: boolean
}

export interface Node {
  colId: number
  rowId: number
  uuid: string
  value: NodeValue
}
