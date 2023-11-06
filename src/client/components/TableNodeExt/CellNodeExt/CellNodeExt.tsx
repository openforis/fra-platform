import React from 'react'

import DataColumn from 'client/components/DataGrid/DataColumn'
import CellMultiselect from 'client/components/TableNodeExt/CellNodeExt/CellMultiselect/CellMultiselect'
import { CellProps } from 'client/components/TableNodeExt/CellNodeExt/CellProps'
import { ColumnNodeExt } from 'client/components/TableNodeExt/types'

import CellSelect from './CellSelect'
import CellText from './CellText'

type Props = {
  uuid: string
  datum: Record<string, any>
  column: ColumnNodeExt
  onChange: (uuid: string, colName: string, value: any) => void
  disabled: boolean
}

const components: Record<string, React.FC<CellProps>> = {
  text: CellText,
  select: CellSelect,
  multiselect: CellMultiselect,
}

const CellNodeExt: React.FC<Props> = (props: Props) => {
  const { datum, column, onChange, disabled, uuid } = props

  const { type } = column
  const { colName } = column.props
  const Component = components[type]

  return (
    <DataColumn>
      <Component
        disabled={disabled}
        value={datum[colName]}
        onChange={(value: string) => onChange(uuid, colName, value)}
        column={column}
      />
    </DataColumn>
  )
}

export default CellNodeExt
