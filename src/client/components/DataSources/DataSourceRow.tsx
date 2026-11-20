import React from 'react'
import classNames from 'classnames'

import {
  DataSource,
  DataSourceEditableField,
  DataSourceValidationErrors,
} from 'meta/assessment/descriptionValue/dataSource'
import { InvalidLink } from 'meta/assessment/validation/validation'
import { Objects } from 'utils/objects'

import { DataCell, DataRow } from 'client/components/DataGrid'
import Comments from 'client/components/DataSources/Columns/Comments'
import Reference from 'client/components/DataSources/Columns/Reference'
import TypeOfDataSource from 'client/components/DataSources/Columns/TypeOfDataSource'
import Variables from 'client/components/DataSources/Columns/Variables'
import YearForDataSource from 'client/components/DataSources/Columns/YearForDataSource'
import { DataSourcesFocusedLink, PropsDataSourceComponent, PropsDataSources } from 'client/components/DataSources/types'

import { useComponentsOrder } from './hooks/useComponentsOrder'
import { useDataSourceActions } from './hooks/useDataSourceActions'
import { useGetErrorTooltip } from './hooks/useGetErrorTooltip'

const Components: Record<DataSourceEditableField, React.FC<PropsDataSourceComponent>> = {
  comments: Comments,
  reference: Reference,
  type: TypeOfDataSource,
  variables: Variables,
  year: YearForDataSource,
}

type Props = Pick<PropsDataSources, 'columns' | 'meta' | 'onChange' | 'onDelete' | 'options'> & {
  dataSource: DataSource
  focusedLink?: DataSourcesFocusedLink
  invalidLinks?: Array<InvalidLink>
  lastRow: boolean
  readOnly?: boolean
  validationErrors?: DataSourceValidationErrors
}

const DataSourceRow: React.FC<Props> = (props: Props) => {
  const {
    columns,
    dataSource,
    focusedLink,
    invalidLinks,
    lastRow,
    meta,
    onChange,
    onDelete,
    options,
    readOnly,
    validationErrors = {},
  } = props
  const { canEdit } = options
  const disabled = !canEdit || readOnly

  const actions = useDataSourceActions({ columns, dataSource, readOnly, onDelete, options })
  const componentsOrder = useComponentsOrder({ options })
  const getErrorTooltip = useGetErrorTooltip({ validationErrors })

  return (
    <DataRow actions={actions}>
      {componentsOrder.map((componentKey) => {
        const Component = Components[componentKey]
        const tooltip = getErrorTooltip(componentKey)
        // The Reference component renders an editor WYSIWYG, which receives validation errors.
        const isReference = componentKey === 'reference'
        const isFocused = isReference && !Objects.isNil(focusedLink) && focusedLink.dataSourceUuid === dataSource.uuid
        const referenceFocusedLink = isFocused ? focusedLink.link : undefined
        const referenceInvalidLinks = isReference ? invalidLinks : undefined
        const referenceValidationErrors = isReference ? validationErrors.reference : undefined

        return (
          <DataCell
            key={`${componentKey}-${dataSource.uuid}`}
            className={classNames(`datasource-column-${componentKey}`, `datasource-row-${dataSource.uuid}`, {
              'validation-error': !Objects.isEmpty(tooltip),
            })}
            editable={!disabled}
            lastRow={lastRow}
            tooltip={tooltip}
          >
            <Component
              columns={columns}
              dataSource={dataSource}
              disabled={disabled}
              focusedLink={referenceFocusedLink}
              invalidLinks={referenceInvalidLinks}
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
