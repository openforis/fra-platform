import React from 'react'

import DataColumn from 'client/components/DataGrid/DataColumn'
import { Components } from 'client/components/TableNodeExt/CellNodeExt/Components'
import { ColumnNodeExt } from 'client/components/TableNodeExt/types'

type Props = {
  datum: Record<string, any>
  column: ColumnNodeExt
  onChange: (uuid: string, colName: string, value: any) => void
  disabled: boolean
}

const CellNodeExt: React.FC<Props> = (props: Props) => {
  const { datum: row, column, onChange, disabled } = props
  const { uuid } = row

  const { type, colName, options } = column
  const Component = Components[type]

  return (
    <DataColumn>
      <Component
        disabled={disabled}
        value={row[colName]}
        onChange={(value: string) => onChange(uuid, colName, value)}
        options={options}
      />
    </DataColumn>
  )
}

export default CellNodeExt
