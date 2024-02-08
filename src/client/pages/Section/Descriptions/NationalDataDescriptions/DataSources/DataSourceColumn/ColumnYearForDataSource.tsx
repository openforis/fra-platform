import React from 'react'

import { DataSource } from 'meta/assessment'

import { DataCell } from 'client/components/DataGrid'
import TextArea from 'client/components/Inputs/TextArea'

type Props = {
  disabled: boolean
  dataSourceValue: DataSource
  onChange: (key: string, value: string) => void
  lastRow: boolean
}

const ColumnVariable: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, disabled, onChange, lastRow } = props

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('year', event.target.value)

  return (
    <DataCell lastRow={lastRow}>
      <TextArea disabled={disabled} onChange={_onChange} value={dataSourceValue.year} />
    </DataCell>
  )
}
export default ColumnVariable
