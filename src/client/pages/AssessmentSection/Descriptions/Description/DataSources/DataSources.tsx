import './DataSources.scss'
import React, { useCallback } from 'react'

import { Objects } from '@utils/objects'

import { CommentableDescriptionValue, DataSource } from '@meta/assessment'

import DataGrid from '@client/components/DataGrid'
import DataColumn from '@client/components/DataGrid/DataColumn'
import DataSourceRow from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSourceRow'

type Props = {
  disabled: boolean
  sectionName: string
  onChange: (value: CommentableDescriptionValue) => void
  description: CommentableDescriptionValue
}

const placeholder: DataSource = {
  type: '',
  fraVariable: '',
  comments: '',
  year: '',
  reference: '',
}

export const DataSources: React.FC<Props> = (props: Props) => {
  const { sectionName, disabled, description, onChange } = props

  const { dataSources = [] } = description

  const _onChange = useCallback(
    (dataSource: DataSource, i: number) => {
      const updatedDescription = Objects.cloneDeep({
        ...description,
        dataSources,
      })
      // is it a placeholder?
      if (i === dataSources.length) {
        updatedDescription.dataSources.push(dataSource)
      } else {
        updatedDescription.dataSources[i] = dataSource
      }
      onChange(updatedDescription)
    },
    [dataSources, description, onChange]
  )

  const _onDelete = useCallback(
    (i: number) => {
      const updatedDescription = Objects.cloneDeep(description)
      updatedDescription.dataSources.splice(i, 1)
      onChange(updatedDescription)
    },
    [description, onChange]
  )

  if (!dataSources.length && disabled) return null

  return (
    <DataGrid className="data-source-grid">
      <DataColumn head>Reference to data source</DataColumn>
      <DataColumn head>Type of data source</DataColumn>
      <DataColumn head>FRA variable</DataColumn>
      <DataColumn head>Year for data source</DataColumn>
      <DataColumn head>Comments</DataColumn>
      <div className="data-source-review-indicator" />

      {dataSources.concat(disabled ? [] : placeholder).map((dataSource, i) => (
        <DataSourceRow
          onChange={(dataSource: DataSource) => _onChange(dataSource, i)}
          // eslint-disable-next-line react/no-array-index-key
          key={`dataSource_${i}`}
          disabled={disabled}
          sectionName={sectionName}
          dataSource={dataSource}
          // Last item is always placeholder
          placeholder={i === dataSources.length}
          onDelete={() => _onDelete(i)}
          index={i}
        />
      ))}
    </DataGrid>
  )
}

export default DataSources
