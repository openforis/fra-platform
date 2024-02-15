import React from 'react'

import { DataSource, SectionName } from 'meta/assessment'

import { DataCell } from 'client/components/DataGrid'
import TextArea from 'client/components/Inputs/TextArea'

import { useOnChange } from './hook/useOnChange'

type Props = {
  dataSource: DataSource
  disabled: boolean
  lastRow: boolean
  sectionName: SectionName
}

const YearForDataSource: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, lastRow, sectionName } = props

  const onChange = useOnChange({ sectionName, dataSource })

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('year', event.target.value)

  return (
    <DataCell editable={!disabled} lastRow={lastRow}>
      <TextArea disabled={disabled} onChange={_onChange} value={dataSource.year} />
    </DataCell>
  )
}
export default YearForDataSource
