import React from 'react'

import { CommentableDescriptionName, DataSource, SectionName } from 'meta/assessment'

import { useIsDescriptionEditable } from 'client/store/user/hooks'
import { DataCell } from 'client/components/DataGrid'
import TextArea from 'client/components/Inputs/TextArea'

import { useOnChange } from './hook/useOnChange'

type Props = {
  dataSource: DataSource
  lastRow: boolean
  sectionName: SectionName
}

const YearForDataSource: React.FC<Props> = (props: Props) => {
  const { dataSource, lastRow, sectionName } = props

  const editable = useIsDescriptionEditable({ sectionName, name: CommentableDescriptionName.dataSources })
  const onChange = useOnChange({ sectionName, dataSource })

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('year', event.target.value)

  return (
    <DataCell editable={editable} lastRow={lastRow}>
      <TextArea disabled={!editable} onChange={_onChange} value={dataSource.year} />
    </DataCell>
  )
}
export default YearForDataSource
