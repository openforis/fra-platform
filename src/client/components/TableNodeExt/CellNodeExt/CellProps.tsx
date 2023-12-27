import { NodeValue } from 'meta/assessment'
import { NodeExt, NodeExtCellType } from 'meta/nodeExt'

import { NodeExtCell, NodeExtCellSelect } from '../types'

export type CellProps<Column extends NodeExtCell<NodeExtCellType>, Value extends string | Array<string> = string> = {
  column: Column
  disabled: boolean
  lastCol: boolean
  lastRow: boolean
  nodeExt: NodeExt<unknown, NodeValue & { raw: Value | null }>
  onChange: (value: string | Array<string> | null) => void
}

export type CellSelectProps = CellProps<NodeExtCellSelect, Array<string>>
