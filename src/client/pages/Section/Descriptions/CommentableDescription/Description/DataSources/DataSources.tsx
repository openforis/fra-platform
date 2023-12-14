import './DataSources.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'
import { UUIDs } from 'utils/uuids'

import { CommentableDescriptionValue, DataSource } from 'meta/assessment'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useSection } from 'client/store/metadata'
import { DataCell, DataGrid } from 'client/components/DataGrid'

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
  const subSection = useSection(sectionName)
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
      <DataGrid gridTemplateColumns="0px minmax(0, 400px) auto minmax(0, 300px) minmax(0, 100px) minmax(0, 400px) 0px">
        <div />

        <DataCell header>{t(`${keyPrefix}.referenceToTataSource`)}</DataCell>
        <DataCell header>{t(`${keyPrefix}.typeOfDataSource`)}</DataCell>
        <DataCell header>{t(`${keyPrefix}.variable`)}</DataCell>
        <DataCell header>{t(`${keyPrefix}.yearForDataSource`)}</DataCell>
        <DataCell header lastCol>
          {t(`${keyPrefix}.comments`)}
        </DataCell>

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
              lastRow={i === dataSourcesLinked.length - 1}
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
              lastRow={disabled ? i === dataSourceValues.length - 1 : i === dataSourceValues.length}
            />
          )
        })}
      </DataGrid>
    </div>
  )
}

export default DataSources
