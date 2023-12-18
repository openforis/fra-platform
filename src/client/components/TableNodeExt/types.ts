import { Label } from 'meta/assessment'
import { ColumnNodeExtType } from 'meta/nodeExt'

import { Option } from 'client/components/Inputs/Select/types'

type Props = {
  colName: string
  header: {
    label: Label
  }
}

type ColumnNode = {
  type: ColumnNodeExtType
  props: Props
}

export type SelectableColumnNode = ColumnNode & {
  type: ColumnNodeExtType.select
  props: Props & {
    // label is passed as Label, but translated before rendering
    options: Array<{
      label: Label
      value: Option['value']
      type?: 'header'
    }>
  }
}

export type ColumnNodeExt = ColumnNode | SelectableColumnNode
