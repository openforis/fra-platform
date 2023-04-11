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
  onChange: (key: string, value: Record<string, string>) => void
}

const ColumnReference: React.FC<DataSourceReferenceColumnProps> = (props: DataSourceReferenceColumnProps) => {
  const { dataSource, placeholder, disabled, onChange } = props

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
              <a href={dataSource.reference?.link} target="_blank" rel="noreferrer">
                {dataSource.reference?.text}
              </a>
            ) : (
              dataSource.reference?.text
            )}
          </span>
        )}

        {!placeholder && !disabled && (
          <button type="button" onClick={() => setToggleLinkField(!toggleLinkField)}>
            {toggleLinkField ? <Icon name="text_fields" /> : <Icon name="insert_link" />}
          </button>
        )}
      </div>
    </DataColumn>
  )
}

export default ColumnReference
