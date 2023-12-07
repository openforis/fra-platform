import React from 'react'

import { DataCell } from 'client/components/DataGrid'

import { ColumnNodeExt } from '../types'
import CellMultiselect from './CellMultiselect'
import { CellProps } from './CellProps'
import CellSelect from './CellSelect'
import CellText from './CellText'

type Props = {
  uuid: string
  datum: Record<string, any>
  column: ColumnNodeExt
  onChange: (uuid: string, colName: string, value: any) => void
  disabled: boolean
  lastRow: boolean
  lastCol: boolean
}

const components: Record<string, React.FC<CellProps>> = {
  text: CellText,
  select: CellSelect,
  multiselect: CellMultiselect,
}

const CellNodeExt: React.FC<Props> = (props: Props) => {
  const { column, datum, disabled, lastRow, onChange, uuid, lastCol } = props

  const { type } = column
  const { colName } = column.props
  const Component = components[type]

  return (
    <DataCell lastCol={lastCol} lastRow={lastRow}>
      <Component
        disabled={disabled}
        value={datum[colName]}
        onChange={(value: string) => onChange(uuid, colName, value)}
        column={column}
      />
    </DataCell>
  )
}

export default CellNodeExt
