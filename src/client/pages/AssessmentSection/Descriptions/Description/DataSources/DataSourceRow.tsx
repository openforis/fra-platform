import React from 'react'

import { DataSource } from '@meta/assessment'
import { NationalDataDataSourceDescription } from '@meta/assessment/description'

import { useTableSections } from '@client/store/ui/assessmentSection'
import { useIsDataLocked } from '@client/store/ui/dataLock'
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
      <div className="data-source__relative-cell">
        {!placeholder && !disabled && (
          <button type="button" onClick={onDelete} className="data-source__delete-button">
            <Icon className="delete" name="trash-simple" />
          </button>
        )}
      </div>

      {descriptionDataSource.table.columns.map((column) => (
        <DataSourceColumn
          key={column}
          dataSource={dataSource}
          table={table}
          onChange={onChange}
          column={column}
          disabled={disabled}
          placeholder={placeholder}
          dataSourceVariables={descriptionDataSource?.table?.dataSourceVariables}
        />
      ))}

      <div className="data-source__relative-cell">
        {!isDataLocked && dataSource.uuid && <ReviewIndicator title={title} topicKey={dataSource.uuid} />}
      </div>
    </>
  )
}

export default DataSourceRow
