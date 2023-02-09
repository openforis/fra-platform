import React from 'react'

import { DataSource } from '@meta/assessment'
import { NationalDataDataSourceDescription } from '@meta/assessment/description'

import { useTableSections } from '@client/store/ui/assessmentSection'
import { useCountryIso } from '@client/hooks'
import DataColumn from '@client/components/DataGrid/DataColumn'
import ReviewIndicator from '@client/components/ReviewIndicator'

import DataSourceColumn from './DataSourceColumn/DataSourceColumn'

type Props = {
  disabled: boolean
  dataSource: DataSource
  sectionName: string
  placeholder: boolean
  index: number
  descriptionDataSource: NationalDataDataSourceDescription

  onChange: (dataSource: DataSource) => void
  onDelete: () => void
}

const DataSourceRow: React.FC<Props> = (props: Props) => {
  const { disabled, dataSource, descriptionDataSource, sectionName, onChange, placeholder, onDelete, index } = props
  const countryIso = useCountryIso()
  const tableSections = useTableSections({ sectionName })

  const table = tableSections?.[0]?.tables?.[0]
  if (!table) return null

  const titleVariable = dataSource.fraVariables ? dataSource.fraVariables.join(', ') : dataSource.variable
  const title = `${titleVariable} | ${dataSource.year}`
  return (
    <>
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
        />
      ))}

      <DataColumn className="data-source-review-indicator">
        {!disabled && <ReviewIndicator title={title} topicKey={`dataSource-${countryIso}-${sectionName}-${index}`} />}
      </DataColumn>
    </>
  )
}

export default DataSourceRow
