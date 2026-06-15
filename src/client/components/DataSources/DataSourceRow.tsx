import React, { useMemo } from 'react'
import classNames from 'classnames'

import { DataSource, DataSourceValidation } from 'meta/assessment/descriptionValue/dataSource'
import { TooltipId } from 'meta/tooltip/id'
import { Objects } from 'utils/objects'

import { DataCell, DataRow } from 'client/components/DataGrid'
import Comments from 'client/components/DataSources/Columns/Comments'
import Reference from 'client/components/DataSources/Columns/Reference'
import TypeOfDataSource from 'client/components/DataSources/Columns/TypeOfDataSource'
import Variables from 'client/components/DataSources/Columns/Variables'
import YearForDataSource from 'client/components/DataSources/Columns/YearForDataSource'
import { PropsDataSourceComponent, PropsDataSources } from 'client/components/DataSources/types'

import { useComponentsOrder } from './hooks/useComponentsOrder'
import { useDataSourceActions } from './hooks/useDataSourceActions'

const Components: Partial<Record<keyof DataSource, React.FC<PropsDataSourceComponent>>> = {
  comments: Comments,
  reference: Reference,
  type: TypeOfDataSource,
  variables: Variables,
  year: YearForDataSource,
}

type Props = Pick<PropsDataSources, 'columns' | 'meta' | 'onChange' | 'onDelete' | 'options' | 'validator'> & {
  dataSource: DataSource
  lastRow: boolean
  readOnly?: boolean
}

const DataSourceRow: React.FC<Props> = (props: Props) => {
  const { columns, dataSource, lastRow, meta, onChange, onDelete, options, readOnly, validator } = props
  const { canEdit } = options
  const disabled = !canEdit || readOnly

  const actions = useDataSourceActions({ columns, dataSource, readOnly, onDelete, options })
  const componentsOrder = useComponentsOrder({ options })

  const errors = useMemo<DataSourceValidation>(() => {
    return canEdit && validator ? validator(dataSource) : {}
  }, [canEdit, dataSource, validator])

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
            <Component columns={columns} dataSource={dataSource} disabled={disabled} meta={meta} onChange={onChange} />
          </DataCell>
        )
      })}
    </DataRow>
  )
}

export default DataSourceRow
