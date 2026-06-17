import React from 'react'
import classNames from 'classnames'

import { DataSource, DataSourceValidationErrors } from 'meta/assessment/descriptionValue/dataSource'
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
import { useGetErrorTooltipProps } from './hooks/useGetErrorTooltipProps'

const Components: Record<keyof DataSourceValidationErrors, React.FC<PropsDataSourceComponent>> = {
  comments: Comments,
  reference: Reference,
  type: TypeOfDataSource,
  variables: Variables,
  year: YearForDataSource,
}

type Props = Pick<PropsDataSources, 'columns' | 'meta' | 'onChange' | 'onDelete' | 'options'> & {
  dataSource: DataSource
  lastRow: boolean
  readOnly?: boolean
  validationErrors?: DataSourceValidationErrors
}

const DataSourceRow: React.FC<Props> = (props: Props) => {
  const { columns, dataSource, lastRow, meta, onChange, onDelete, options, readOnly, validationErrors = {} } = props
  const { canEdit } = options
  const disabled = !canEdit || readOnly

  const actions = useDataSourceActions({ columns, dataSource, readOnly, onDelete, options })
  const componentsOrder = useComponentsOrder({ options })
  const getErrorTooltipProps = useGetErrorTooltipProps({ validationErrors })

  return (
    <DataRow actions={actions}>
      {componentsOrder.map((componentKey) => {
        const Component = Components[componentKey]
        const { dataTooltipContent, dataTooltipId } = getErrorTooltipProps(componentKey)
        const referenceValidationErrors = componentKey === 'reference' ? validationErrors.reference : undefined

        return (
          <DataCell
            key={`${componentKey}-${dataSource.uuid}`}
            className={classNames({ 'validation-error': !Objects.isEmpty(dataTooltipContent) })}
            data-tooltip-content={dataTooltipContent}
            data-tooltip-id={dataTooltipId}
            editable={!disabled}
            lastRow={lastRow}
          >
            <Component
              columns={columns}
              dataSource={dataSource}
              disabled={disabled}
              meta={meta}
              onChange={onChange}
              validationErrors={referenceValidationErrors}
            />
          </DataCell>
        )
      })}
    </DataRow>
  )
}

export default DataSourceRow
