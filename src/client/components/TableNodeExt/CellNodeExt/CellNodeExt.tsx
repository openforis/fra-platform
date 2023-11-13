import React from 'react'

import DataColumn from 'client/components/DataGrid/DataColumn'

import { ColumnNodeExt } from '../types'
import CellMultiselect from './CellMultiselect'
import { CellProps } from './CellProps'
import CellSelect from './CellSelect'
import CellText from './CellText'

type Props = {
  datum: Record<string, any>
  column: ColumnNodeExt
  onChange: (rowIndex: number, colName: string, value: any) => void
  disabled: boolean
  rowIndex: number
}

const components: Record<string, React.FC<CellProps>> = {
  text: CellText,
  select: CellSelect,
  multiselect: CellMultiselect,
}

const CellNodeExt: React.FC<Props> = (props: Props) => {
  const { datum, column, onChange, disabled, rowIndex } = props

  const { type } = column
  const { colName } = column.props
  const Component = components[type]

  return (
    <DataColumn>
      <Component
        disabled={disabled}
        value={datum[colName]}
        onChange={(value: string) => onChange(rowIndex, colName, value)}
        column={column}
      />
    </DataColumn>
  )
}

export default CellNodeExt
