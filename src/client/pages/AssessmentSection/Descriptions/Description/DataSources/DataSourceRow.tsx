import React from 'react'

import { DataSource } from '@meta/assessment'
import { NationalDataDataSourceDescription } from '@meta/assessment/description'

import { useTableSections } from '@client/store/ui/assessmentSection'
import { useIsDataLocked } from '@client/store/ui/dataLock'
import DataColumn from '@client/components/DataGrid/DataColumn'
import Icon from '@client/components/Icon'
import ReviewIndicator from '@client/components/ReviewIndicator'

import DataSourceColumn from './DataSourceColumn/DataSourceColumn'

type Props = {
  disabled: boolean
  dataSource: DataSource
  sectionName: string
  placeholder: boolean
  descriptionDataSource: NationalDataDataSourceDescription

  onChange: (dataSource: DataSource) => void
  onDelete: () => void
}

const DataSourceRow: React.FC<Props> = (props: Props) => {
  const { disabled, dataSource, descriptionDataSource, sectionName, placeholder, onChange, onDelete } = props
  const isDataLocked = useIsDataLocked()
  const tableSections = useTableSections({ sectionName })

  const table = tableSections?.[0]?.tables?.[0]
  if (!table) return null

  const titleVariable = dataSource.fraVariables ? dataSource.fraVariables.join(', ') : dataSource.variable
  const title = `${titleVariable} | ${dataSource.year}`
  return (
    <>
      <DataColumn className="data-source-review-indicator">
        {!placeholder && !disabled && (
          <button type="button" onClick={onDelete}>
            <Icon className="delete" name="trash-simple" />
          </button>
        )}
      </DataColumn>

      {descriptionDataSource.table.columns.map((column) => (
        <DataSourceColumn
          key={column}
          dataSource={dataSource}
          table={table}
          onDelete={onDelete}
          onChange={onChange}
          column={column}
          disabled={disabled}
          placeholder={placeholder}
          dataSourceVariables={descriptionDataSource?.table?.dataSourceVariables}
        />
      ))}

      <DataColumn className="data-source-review-indicator">
        {!isDataLocked && dataSource.uuid && <ReviewIndicator title={title} topicKey={dataSource.uuid} />}
      </DataColumn>
    </>
  )
}

export default DataSourceRow
