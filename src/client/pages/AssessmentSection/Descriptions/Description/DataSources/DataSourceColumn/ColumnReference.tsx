import React, { useCallback } from 'react'

import classNames from 'classnames'

import { DataSource } from '@meta/assessment'

import DataColumn from '@client/components/DataGrid/DataColumn'
import Icon from '@client/components/Icon'
import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'
import { datasourceValidators } from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSourceColumn/DataSourceColumn'

interface DataSourceReferenceColumnProps {
  dataSource: DataSource
  placeholder: boolean
  disabled: boolean
  onDelete: () => void
  onChange: (key: string, value: Record<string, string>) => void
}

const ColumnReference: React.FC<DataSourceReferenceColumnProps> = (props: DataSourceReferenceColumnProps) => {
  const { dataSource, placeholder, disabled, onDelete, onChange } = props

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
          <button type="button" onClick={onDelete}>
            <Icon className="delete" name="remove" />
          </button>
        )}
        <VerticallyGrowingTextField
          disabled={disabled}
          onChange={(event) => _onChange('text', event.target.value)}
          value={dataSource.reference?.text ?? ''}
        />
      </div>
    </DataColumn>
  )
}

export default ColumnReference
