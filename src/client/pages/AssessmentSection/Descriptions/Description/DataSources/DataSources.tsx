import React, { useCallback } from 'react'

import { Objects } from '@utils/objects'

import { CommentableDescriptionValue, DataSource } from '@meta/assessment'

import DataSourceRow from './DataSourceRow'

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
    <table className="fra-table data-table">
      <thead>
        <tr>
          <th className="fra-table__header-cell">Reference to data source</th>
          <th className="fra-table__header-cell">Type of data source</th>
          <th className="fra-table__header-cell">FRA variable</th>
          <th className="fra-table__header-cell">Year for data source</th>
          <th className="fra-table__header-cell">Comments</th>
        </tr>
      </thead>
      <tbody>
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
          />
        ))}
      </tbody>
    </table>
  )
}

export default DataSources
