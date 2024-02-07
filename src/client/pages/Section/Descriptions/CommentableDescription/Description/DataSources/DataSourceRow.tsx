import React, { useCallback } from 'react'

import { DataSource } from 'meta/assessment'
import { DataSourceDescription } from 'meta/assessment/description/nationalDataDataSourceDescription'

import { useIsDataLocked } from 'client/store/ui/dataLock'
import { DataCell } from 'client/components/DataGrid'
import Icon from 'client/components/Icon'
import ReviewIndicator from 'client/components/ReviewIndicator'

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
  lastRow: boolean
}

const DataSourceRow: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, dataSourceMetadata, disabled, onChange, onDelete, placeholder, lastRow } = props
  const isDataLocked = useIsDataLocked()

  const _onChange = useCallback(
    (field: string, value: string) => {
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

      <ColumnReference dataSourceValue={dataSourceValue} onChange={_onChange} disabled={disabled} lastRow={lastRow} />
      <ColumnTypeOfDataSource
        dataSourceMetadata={dataSourceMetadata}
        dataSourceValue={dataSourceValue}
        onChange={_onChange}
        disabled={disabled}
        lastRow={lastRow}
      />
      <ColumnVariables
        dataSourceValue={dataSourceValue}
        dataSourceMetadata={dataSourceMetadata}
        onChange={_onChange}
        disabled={disabled}
        lastRow={lastRow}
      />
      <ColumnYearForDataSource
        disabled={disabled}
        dataSourceValue={dataSourceValue}
        onChange={_onChange}
        lastRow={lastRow}
      />
      <ColumnComments disabled={disabled} dataSourceValue={dataSourceValue} onChange={_onChange} lastRow={lastRow} />

      <DataCell actions>
        {!isDataLocked && dataSourceValue.uuid && <ReviewIndicator title={title} topicKey={dataSourceValue.uuid} />}
      </DataCell>
    </>
  )
}

export default DataSourceRow
