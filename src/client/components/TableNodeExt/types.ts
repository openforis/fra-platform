import { Label } from 'meta/assessment'
import { NodeExtCellType } from 'meta/nodeExt'

import { OptionsOrGroups } from 'client/components/Inputs/Select'

type NodeExtCellProps<P = unknown> = P & {
  header: {
    label: Label
  }
}

export type NodeExtCell<Type extends NodeExtCellType, Props extends NodeExtCellProps = NodeExtCellProps> = {
  props: Props
  type: Type
}

export type NodeExtCellPropsSelect = NodeExtCellProps<{ options: OptionsOrGroups }>

export type NodeExtCellSelect = NodeExtCell<
  NodeExtCellType.select | NodeExtCellType.multiselect,
  NodeExtCellPropsSelect
>
