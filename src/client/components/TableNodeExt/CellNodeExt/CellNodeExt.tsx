import React from 'react'

import { NodeExt } from 'meta/nodeExt'

import { DataCell } from 'client/components/DataGrid'

import { ColumnNodeExt } from '../types'
import CellMultiselect from './CellMultiselect'
import { CellValueMultiProps, CellValueSingleProps } from './CellProps'
import CellSelect from './CellSelect'
import CellText from './CellText'

type Props = {
  column: ColumnNodeExt
  disabled: boolean
  lastCol: boolean
  lastRow: boolean
  nodeExt: NodeExt<unknown>
  onChange: (value: any) => void
}

type ComponentPropType = CellValueMultiProps | CellValueSingleProps

const components: Record<string, React.FC<ComponentPropType>> = {
  multiselect: CellMultiselect,
  select: CellSelect,
  text: CellText,
}

const CellNodeExt: React.FC<Props> = (props: Props) => {
  const { column, disabled, lastRow, nodeExt, onChange, lastCol } = props

  const Component = components[column.type]

  return (
    <DataCell lastCol={lastCol} lastRow={lastRow}>
      <Component
        column={column}
        disabled={disabled}
        onChange={(value: string) => onChange(value)}
        value={nodeExt.value.raw}
      />
    </DataCell>
  )
}

export default CellNodeExt
