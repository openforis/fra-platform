import React, { useCallback } from 'react'

import { DataSource } from '@meta/assessment'
import { DataSourceDescription } from '@meta/assessment/description/nationalDataDataSourceDescription'

import { useIsDataLocked } from '@client/store/ui/dataLock'
import Icon from '@client/components/Icon'
import ReviewIndicator from '@client/components/ReviewIndicator'

import ColumnComments from './DataSourceColumn/ColumnComments'
import ColumnReference from './DataSourceColumn/ColumnReference'
import ColumnTypeOfDataSource from './DataSourceColumn/ColumnTypeOfDataSource'
import ColumnVariables from './DataSourceColumn/ColumnVariables'
import ColumnYearForDataSource from './DataSourceColumn/ColumnYearForDataSource'

type Props = {
  dataSourceValue: DataSource
  dataSourceMetadata: DataSourceDescription
  disabled: boolean
  placeholder: boolean
  onChange: (dataSource: DataSource) => void
  onDelete: () => void
}

const DataSourceRow: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, dataSourceMetadata, disabled, onChange, onDelete, placeholder } = props
  const isDataLocked = useIsDataLocked()

  const _onChange = useCallback(
    (field: string, value: string | Record<string, string>) => {
      if (dataSourceValue[field as keyof DataSource] === value) return
      onChange({
        ...dataSourceValue,
        [field]: value,
      })
    },
    [dataSourceValue, onChange]
  )

  const titleVariable = dataSourceValue.variables?.join(', ')
  const title = `${titleVariable} | ${dataSourceValue.year}`

  return (
    <>
      <div className="data-source__relative-cell">
        {!placeholder && !disabled && (
          <button type="button" onClick={onDelete} className="data-source__delete-button">
            <Icon className="delete" name="trash-simple" />
          </button>
        )}
      </div>

      <ColumnReference
        dataSourceValue={dataSourceValue}
        onChange={_onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
      <ColumnTypeOfDataSource
        dataSourceMetadata={dataSourceMetadata}
        dataSourceValue={dataSourceValue}
        onChange={_onChange}
        disabled={disabled}
      />
      <ColumnVariables
        dataSourceValue={dataSourceValue}
        dataSourceMetadata={dataSourceMetadata}
        onChange={_onChange}
        disabled={disabled}
      />
      <ColumnYearForDataSource disabled={disabled} dataSourceValue={dataSourceValue} onChange={_onChange} />
      <ColumnComments disabled={disabled} dataSourceValue={dataSourceValue} onChange={_onChange} />

      <div className="data-source__relative-cell">
        {!isDataLocked && dataSourceValue.uuid && <ReviewIndicator title={title} topicKey={dataSourceValue.uuid} />}
      </div>
    </>
  )
}

export default DataSourceRow
