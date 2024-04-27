import React from 'react'

import classNames from 'classnames'

import { CommentableDescriptionName, DataSource, DataSourceDescription, SectionName } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import { useIsDescriptionEditable } from 'client/store/user/hooks'
import { DataCell, DataRow } from 'client/components/DataGrid'
import Comments from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/Columns/Comments'
import Reference from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/Columns/Reference'
import TypeOfDataSource from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/Columns/TypeOfDataSource'
import Variables from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/Columns/Variables'
import YearForDataSource from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/Columns/YearForDataSource'

import { useDataSourceActions } from './hooks/useDataSourceActions'
import { useValidationErrors } from './hooks/useValidationErrors'

const Components: Record<'comments' | 'reference' | 'type' | 'variables' | 'year', React.FC<any>> = {
  comments: Comments,
  reference: Reference,
  type: TypeOfDataSource,
  variables: Variables,
  year: YearForDataSource,
}

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
  const errors = useValidationErrors({ dataSource })
  const componentsOrder: Array<keyof typeof Components> = ['reference', 'type', 'variables', 'year', 'comments']

  return (
    <DataRow actions={actions}>
      {componentsOrder.map((componentKey) => {
        const Component = Components[componentKey]
        return (
          <DataCell
            key={`${componentKey}-${dataSource.uuid}`}
            className={classNames({ 'validation-error': errors[componentKey] })}
            data-tooltip-content={errors[componentKey]}
            data-tooltip-id={TooltipId.error}
            editable={!disabled}
            lastRow={lastRow}
          >
            <Component dataSource={dataSource} disabled={disabled} meta={meta} sectionName={sectionName} />
          </DataCell>
        )
      })}
    </DataRow>
  )
}

DataSourceRow.defaultProps = {
  readOnly: false,
}

export default DataSourceRow
