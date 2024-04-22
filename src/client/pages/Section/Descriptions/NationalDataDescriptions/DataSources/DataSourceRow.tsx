import React from 'react'

import { CommentableDescriptionName, DataSource, DataSourceDescription, SectionName } from 'meta/assessment'

import { useIsDescriptionEditable } from 'client/store/user/hooks'
import { DataRow } from 'client/components/DataGrid'
import Comments from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/Columns/Comments'
import Reference from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/Columns/Reference'
import TypeOfDataSource from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/Columns/TypeOfDataSource'
import Variables from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/Columns/Variables'
import YearForDataSource from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/Columns/YearForDataSource'

import { useDataSourceActions } from './hooks/useDataSourceActions'

type Props = {
  dataSource: DataSource
  lastRow: boolean
  meta: DataSourceDescription
  readOnly?: boolean
  sectionName: SectionName
}

const DataSourceRow: React.FC<Props> = (props: Props) => {
  const { dataSource, lastRow, meta, readOnly, sectionName } = props

  const actions = useDataSourceActions({ dataSource, readOnly, sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name: CommentableDescriptionName.dataSources })
  const disabled = !editable || readOnly

  return (
    <DataRow actions={actions}>
      <Reference dataSource={dataSource} disabled={disabled} lastRow={lastRow} sectionName={sectionName} />
      <TypeOfDataSource
        dataSource={dataSource}
        disabled={disabled}
        lastRow={lastRow}
        meta={meta}
        sectionName={sectionName}
      />
      <Variables dataSource={dataSource} disabled={disabled} lastRow={lastRow} meta={meta} sectionName={sectionName} />
      <YearForDataSource dataSource={dataSource} disabled={disabled} lastRow={lastRow} sectionName={sectionName} />
      <Comments dataSource={dataSource} disabled={disabled} lastRow={lastRow} sectionName={sectionName} />
    </DataRow>
  )
}

DataSourceRow.defaultProps = {
  readOnly: false,
}

export default DataSourceRow
