import React from 'react'

import { DataSource } from 'meta/assessment'

import DataColumn from 'client/components/DataGrid/DataColumn'
import VerticallyGrowingTextField from 'client/components/VerticallyGrowingTextField'

type Props = {
  disabled: boolean
  dataSourceValue: DataSource
  onChange: (key: string, value: string) => void
}

const ColumnVariable: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, disabled, onChange } = props

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('year', event.target.value)

  return (
    <DataColumn className="data-source-column">
      <VerticallyGrowingTextField disabled={disabled} onChange={_onChange} value={dataSourceValue.year} />
    </DataColumn>
  )
}
export default ColumnVariable
