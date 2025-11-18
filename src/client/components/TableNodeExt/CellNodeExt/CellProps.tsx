import { NodeValue } from 'meta/assessment/node'
import { NodeExtCellType } from 'meta/nodeExt/cellType'
import { NodeExt } from 'meta/nodeExt/nodeExt'

import { NodeExtCell, NodeExtCellSelect } from '../types'

export type CellProps<Column extends NodeExtCell<NodeExtCellType>, Value extends string | Array<string> = string> = {
  column: Column
  disabled: boolean
  nodeExt: NodeExt<unknown, NodeValue & { raw: Value | null }>
  onChange: (value: string | Array<string> | null) => void
}

export type CellSelectProps = CellProps<NodeExtCellSelect, Array<string>>
