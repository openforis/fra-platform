import './DataSources.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'

import { CommentableDescriptionValue, DataSource } from '@meta/assessment'

import { useAssessmentSection, useCycle } from '@client/store/assessment'
import DataGrid from '@client/components/DataGrid'
import DataColumn from '@client/components/DataGrid/DataColumn'
import ButtonCopyDataSources from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/ButtonCopyDataSources'
import DataSourceRow from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSourceRow'

type Props = {
  disabled: boolean
  sectionName: string
  onChange: (value: CommentableDescriptionValue) => void
  description: CommentableDescriptionValue
}

const placeholder: DataSource = {
  type: '',
  fraVariables: [],
  comments: '',
  year: '',
  reference: {
    text: '',
    link: undefined,
  },
}

export const DataSources: React.FC<Props> = (props: Props) => {
  const { sectionName, disabled, description, onChange } = props
  const cycle = useCycle()
  const subSection = useAssessmentSection(sectionName)
  const descriptions = subSection.props.descriptions[cycle.uuid]
  const { dataSources: descriptionDataSource } = descriptions.nationalData

  const { t } = useTranslation()

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
  const copyDisabled = dataSources.length !== 0

  return (
    <div className="data-source wrapper">
      <ButtonCopyDataSources disabled={copyDisabled} sectionName={sectionName} />
      <DataGrid className="data-source-grid">
        {descriptionDataSource.table.columns.map((column) => (
          <DataColumn key={column} head>
            {t(`dataSource.${column}`)}
          </DataColumn>
        ))}

        <div className="data-source-review-indicator" />

        {dataSources.concat(disabled ? [] : placeholder).map((dataSource, i) => (
          <DataSourceRow
            descriptionDataSource={descriptionDataSource}
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
    </div>
  )
}

export default DataSources
