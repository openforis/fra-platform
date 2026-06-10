import React from 'react'
import classNames from 'classnames'

import { DataSourceDescription } from 'meta/assessment/description'
import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { SectionName } from 'meta/assessment/section'
import { TooltipId } from 'meta/tooltip/id'
import { Objects } from 'utils/objects'

import { DataCell, DataRow } from 'client/components/DataGrid'
import Comments from 'client/components/DataSources/Columns/Comments'
import Reference from 'client/components/DataSources/Columns/Reference'
import TypeOfDataSource from 'client/components/DataSources/Columns/TypeOfDataSource'
import Variables from 'client/components/DataSources/Columns/Variables'
import YearForDataSource from 'client/components/DataSources/Columns/YearForDataSource'
import { PropsDataSources } from 'client/components/DataSources/types'

import { useDataSourceActions } from './hooks/useDataSourceActions'
import { useValidationErrors } from './hooks/useValidationErrors'

const Components: Record<'comments' | 'reference' | 'type' | 'variables' | 'year', React.FC<any>> = {
  comments: Comments,
  reference: Reference,
  type: TypeOfDataSource,
  variables: Variables,
  year: YearForDataSource,
}

type Props = Pick<PropsDataSources, 'options'> & {
  dataSource: DataSource
  lastRow: boolean
  meta: DataSourceDescription
  readOnly?: boolean
  sectionName: SectionName
}

const DataSourceRow: React.FC<Props> = (props: Props) => {
  const { dataSource, lastRow, meta, options, readOnly, sectionName } = props
  const { canEdit } = options
  const disabled = !canEdit || readOnly

  const actions = useDataSourceActions({ dataSource, readOnly, options, sectionName })
  const errors = useValidationErrors({ dataSource })
  const componentsOrder: Array<keyof typeof Components> = ['reference', 'type', 'variables', 'year', 'comments']

  return (
    <DataRow actions={actions}>
      {componentsOrder.map((componentKey) => {
        const Component = Components[componentKey]
        const validationError = errors[componentKey]
        const dataTooltipContent = Objects.isEmpty(validationError) ? undefined : validationError
        const dataTooltipId = Objects.isEmpty(validationError) ? undefined : TooltipId.error

        return (
          <DataCell
            key={`${componentKey}-${dataSource.uuid}`}
            className={classNames({ 'validation-error': !Objects.isEmpty(validationError) })}
            data-tooltip-content={dataTooltipContent}
            data-tooltip-id={dataTooltipId}
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

export default DataSourceRow
