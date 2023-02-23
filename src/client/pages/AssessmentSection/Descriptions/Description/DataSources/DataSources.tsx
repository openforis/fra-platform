import './DataSources.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'
import { UUIDs } from '@utils/uuids'

import { CommentableDescriptionValue, DataSource } from '@meta/assessment'

import { useAssessment, useAssessmentSection, useCycle } from '@client/store/assessment'
import DataGrid from '@client/components/DataGrid'
import DataColumn from '@client/components/DataGrid/DataColumn'
import ButtonCopyDataSources from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/ButtonCopyDataSources'
import DataSourceRow from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSourceRow'

import { useDescriptions } from '../../Descriptions'

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
  const assessment = useAssessment()
  const cycle = useCycle()
  const subSection = useAssessmentSection(sectionName)
  const descriptions = useDescriptions({
    disabled,
    sectionName,
    descriptions: subSection.props.descriptions[cycle.uuid],
  })

  const { dataSources: descriptionDataSource } = descriptions.nationalData

  const { t } = useTranslation()

  const { dataSources = [] } = description

  const _onChange = useCallback(
    (dataSource: DataSource) => {
      const { uuid } = dataSource
      const updatedDescription = Objects.cloneDeep({
        ...description,
        dataSources: Objects.cloneDeep(dataSources),
      })
      // If we don't have UUID, it's a new data source
      if (uuid) {
        const i = updatedDescription.dataSources.findIndex((dataSource) => dataSource.uuid === uuid)
        updatedDescription.dataSources[i] = dataSource
      } else {
        updatedDescription.dataSources.push({ ...dataSource, uuid: UUIDs.v4() })
      }
      onChange(updatedDescription)
    },
    [dataSources, description, onChange]
  )

  const _onDelete = useCallback(
    (uuid: string) => {
      onChange({
        ...description,
        dataSources: description.dataSources.filter((dataSource) => dataSource.uuid !== uuid),
      })
    },
    [description, onChange]
  )

  if (!dataSources.length && disabled) return null
  const copyDisabled = dataSources.length !== 0

  return (
    <div className="data-source wrapper">
      {!disabled && (
        <ButtonCopyDataSources disabled={copyDisabled} currentValue={description} sectionName={sectionName} />
      )}

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
            onChange={(dataSource: DataSource) => _onChange(dataSource)}
            // eslint-disable-next-line react/no-array-index-key
            key={`dataSource_${i}`}
            disabled={disabled}
            sectionName={sectionName}
            dataSource={dataSource}
            // if we don't have uuid, it's a placeholder
            placeholder={!dataSource.uuid}
            onDelete={() => _onDelete(dataSource.uuid)}
          />
        ))}
      </DataGrid>

      {assessment?.props?.name === 'fra' && cycle?.name === '2025' && (
        <p>{t('nationalDataPoint.dataSource2025ExplanatoryText')}</p>
      )}
    </div>
  )
}

export default DataSources
