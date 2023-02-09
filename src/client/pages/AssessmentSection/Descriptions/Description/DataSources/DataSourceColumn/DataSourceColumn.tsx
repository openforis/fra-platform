import React, { useCallback } from 'react'

import { Objects } from '@utils/objects'

import { DataSource, Table } from '@meta/assessment'
import { DataSourceColumn as DataSourceColumnType } from '@meta/assessment/description'

import ColumnComments from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSourceColumn/ColumnComments'
import ColumnFraVariable from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSourceColumn/ColumnFraVariable'
import ColumnReference from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSourceColumn/ColumnReference'
import ColumnTypeOfDataSource from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSourceColumn/ColumnTypeOfDataSource'
import ColumnVariable from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSourceColumn/ColumnVariable'
import ColumnYearForDataSource from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSourceColumn/ColumnYearForDataSource'

export const datasourceValidators: Record<string, (x: string) => boolean> = {
  // check at least one character exists
  referenceText: (text) => !(Objects.isEmpty(text) || /[A-Za-z]/.test(text)),
  // check that reference link is link format
  referenceLink: (link) => !Objects.isEmpty(link) || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(link),
  // check that is number
  year: (yearString) => !(Objects.isEmpty(yearString) || Number.isInteger(Number(yearString))),
  // check at least one character exists
  comment: (commentString) => !(Objects.isEmpty(commentString) || /[A-Za-z]/.test(commentString)),
}

interface Props {
  column: DataSourceColumnType
  dataSource: DataSource
  disabled: boolean
  onChange: (dataSource: DataSource) => void
  onDelete: () => void
  placeholder: boolean
  table: Table
}
const DataSourceColumn: React.FC<Props> = (props: Props) => {
  const { column, disabled, placeholder, onChange, onDelete, dataSource, table } = props
  const Components: Record<string, React.FC<any>> = {
    referenceToTataSource: ColumnReference,
    typeOfDataSource: ColumnTypeOfDataSource,
    fraVariable: ColumnFraVariable,
    variable: ColumnVariable,
    yearForDataSource: ColumnYearForDataSource,
    comments: ColumnComments,
  }

  const Component = Components[column]

  const _onChange = useCallback(
    (field: string, value: string | Record<string, string>) => {
      if (dataSource[field as keyof DataSource] === value) return
      onChange({
        ...dataSource,
        [field]: value,
      })
    },
    [dataSource, onChange]
  )

  if (!Component) return null

  return (
    <Component
      disabled={disabled}
      dataSource={dataSource}
      onChange={_onChange}
      placeholder={placeholder}
      onDelete={onDelete}
      table={table}
    />
  )
}

export default DataSourceColumn
