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

const Comments: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, lastRow, sectionName } = props

  const onChange = useOnChange({ sectionName, dataSource })
  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('comments', event.target.value)

  return (
    <DataCell editable={!disabled} lastCol lastRow={lastRow}>
      <TextArea disabled={disabled} onChange={_onChange} value={dataSource.comments} />
    </DataCell>
  )
}
export default Comments
