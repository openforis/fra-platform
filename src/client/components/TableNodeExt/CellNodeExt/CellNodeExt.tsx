import React from 'react'

import DataColumn from 'client/components/DataGrid/DataColumn'
import Select from 'client/components/Select'
import { Option } from 'client/components/Select/types'
import { ColumnNodeExt } from 'client/components/TableNodeExt/types'
import TextInput from 'client/components/TextInput'

type Props = {
  datum: Record<string, any>
  column: ColumnNodeExt
  onChange: (uuid: string, colName: string, value: any) => void
  disabled: boolean
}

type CellProps = {
  value: string | Array<string>
  onChange: (newValue: string | Option) => void
  disabled: boolean
  options?: Array<any>
  column: ColumnNodeExt
}

const components: Record<string, React.FC<CellProps>> = {
  text: (props) => (
    <TextInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange(event.target.value)}
    />
  ),
  select: Select,

  // TODO: Placeholder
  multiselect: (props) => {
    return <div>{typeof props.value !== 'string' ? props.value?.join(',') : props.value}</div>
  },
}

const CellNodeExt: React.FC<Props> = (props: Props) => {
  const { datum: row, column, onChange, disabled } = props
  const { uuid } = row

  const { type } = column
  const { colName } = column.props
  const Component = components[type]

  return (
    <DataColumn>
      <Component
        disabled={disabled}
        value={row[colName]}
        onChange={(value: string) => onChange(uuid, colName, value)}
        column={column}
      />
    </DataColumn>
  )
}

export default CellNodeExt
