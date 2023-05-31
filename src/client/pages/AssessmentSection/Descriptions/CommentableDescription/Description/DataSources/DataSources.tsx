import './DataSources.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'
import { UUIDs } from 'utils/uuids'

import { CommentableDescriptionValue, DataSource } from 'meta/assessment'

import { useAssessment, useAssessmentSection, useCycle } from 'client/store/assessment'
import DataGrid from 'client/components/DataGrid'
import DataColumn from 'client/components/DataGrid/DataColumn'

import { useDescriptions } from '../../../Descriptions'
import { useGetDataSourcesLinked } from './hooks/useGetDataSourcesLinked'
import ButtonCopyDataSources from './ButtonCopyDataSources'
import DataSourceRow from './DataSourceRow'

type Props = {
  disabled: boolean
  sectionName: string
  onChange: (value: CommentableDescriptionValue) => void
  commentableDescriptionValue: CommentableDescriptionValue
}

const placeholder: DataSource = {
  type: '',
  variables: [],
  comments: '',
  year: '',
  reference: {
    text: '',
    link: undefined,
  },
}

export const DataSources: React.FC<Props> = (props: Props) => {
  const { sectionName, disabled, commentableDescriptionValue, onChange } = props
  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const subSection = useAssessmentSection(sectionName)
  const descriptionMeta = subSection.props.descriptions[cycle.uuid]
  const descriptions = useDescriptions({ disabled, sectionName, descriptions: descriptionMeta })
  const { dataSourcesLinked } = useGetDataSourcesLinked({ descriptions, sectionName })

  const { dataSources: dataSourceValues = [] } = commentableDescriptionValue

  const _onChange = useCallback(
    (dataSource: DataSource) => {
      const { uuid } = dataSource
      const updatedDescription = Objects.cloneDeep({
        ...commentableDescriptionValue,
        dataSources: Objects.cloneDeep(dataSourceValues),
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
    [dataSourceValues, commentableDescriptionValue, onChange]
  )

  const _onDelete = useCallback(
    (uuid: string) => {
      onChange({
        ...commentableDescriptionValue,
        dataSources: commentableDescriptionValue.dataSources.filter((dataSource) => dataSource.uuid !== uuid),
      })
    },
    [commentableDescriptionValue, onChange]
  )

  if (!dataSourceValues.length && !dataSourcesLinked?.length && disabled) return null

  const copyDisabled = dataSourceValues.length !== 0
  const keyPrefix = `${assessment.props.name}.${cycle.name}.description.dataSource`

  return (
    <div className="data-source wrapper">
      {!disabled && (
        <ButtonCopyDataSources
          disabled={copyDisabled}
          currentValue={commentableDescriptionValue}
          sectionName={sectionName}
        />
      )}

      <DataGrid className="data-source-grid">
        <div />

        <DataColumn head>{t(`${keyPrefix}.referenceToTataSource`)}</DataColumn>
        <DataColumn head>{t(`${keyPrefix}.typeOfDataSource`)}</DataColumn>
        <DataColumn head>{t(`${keyPrefix}.variable`)}</DataColumn>
        <DataColumn head>{t(`${keyPrefix}.yearForDataSource`)}</DataColumn>
        <DataColumn head>{t(`${keyPrefix}.comments`)}</DataColumn>

        <div />

        {dataSourcesLinked &&
          dataSourcesLinked.map((dataSource, i) => (
            <DataSourceRow
              dataSourceMetadata={dataSource.meta}
              dataSourceValue={dataSource.data}
              disabled
              key={String(`linkedDataSource_${i}`)}
              onChange={() => ({})}
              onDelete={() => ({})}
              placeholder={false}
            />
          ))}

        {dataSourceValues.concat(disabled ? [] : placeholder).map((dataSourceValue, i) => {
          return (
            <DataSourceRow
              dataSourceMetadata={descriptions.nationalData.dataSources}
              dataSourceValue={dataSourceValue}
              disabled={disabled}
              key={String(`data-source-row-${i}`)}
              onChange={_onChange}
              onDelete={() => _onDelete(dataSourceValue.uuid)}
              placeholder={!dataSourceValue.uuid}
            />
          )
        })}
      </DataGrid>
    </div>
  )
}

export default DataSources
