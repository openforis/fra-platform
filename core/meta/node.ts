import { CycledPropsObject } from '@core/meta/cycle'

export interface NodeProps {
  value: string
}

export interface Node extends CycledPropsObject<NodeProps> {
  colId: number
  rowId: number
}
