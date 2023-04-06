import React, { useCallback, useState } from 'react'

import classNames from 'classnames'

import { DataSource } from '@meta/assessment'

import DataColumn from '@client/components/DataGrid/DataColumn'
import Icon from '@client/components/Icon'
import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'

import { datasourceValidators } from './DataSourceColumn'

interface DataSourceReferenceColumnProps {
  dataSource: DataSource
  placeholder: boolean
  disabled: boolean
  onDelete: () => void
  onChange: (key: string, value: Record<string, string>) => void
}

const ColumnReference: React.FC<DataSourceReferenceColumnProps> = (props: DataSourceReferenceColumnProps) => {
  const { dataSource, placeholder, disabled, onDelete, onChange } = props

  const [toggleLinkField, setToggleLinkField] = useState(false)

  const _onChange = useCallback(
    (field: string, value: string) => {
      onChange('reference', {
        ...(dataSource.reference ?? {}),
        [field]: value,
      })
    },
    [dataSource.reference, onChange]
  )

  return (
    <DataColumn
      className={classNames('data-source-column', {
        'validation-error': datasourceValidators.referenceText(dataSource.reference?.text),
      })}
    >
      <div className="data-source__delete-wrapper">
        {!placeholder && !disabled && (
          <>
            <button type="button" onClick={onDelete}>
              <Icon className="delete" name="remove" />
            </button>
            <button type="button" onClick={() => setToggleLinkField(!toggleLinkField)}>
              <Icon className={classNames({ delete: toggleLinkField })} name="insert_link" />
            </button>
          </>
        )}

        {!disabled && !toggleLinkField && (
          <VerticallyGrowingTextField
            disabled={disabled}
            onChange={(event) => _onChange('text', event.target.value)}
            value={dataSource.reference?.text ?? ''}
          />
        )}

        {!disabled && toggleLinkField && (
          <VerticallyGrowingTextField
            disabled={disabled}
            onChange={(event) => _onChange('link', event.target.value)}
            value={dataSource.reference?.link ?? ''}
          />
        )}

        {disabled && (
          <span className="text-input__readonly-view">
            {dataSource.reference?.link ? (
              <a href={dataSource.reference?.link}>{dataSource.reference?.text}</a>
            ) : (
              dataSource.reference?.text
            )}
          </span>
        )}
      </div>
    </DataColumn>
  )
}

export default ColumnReference
