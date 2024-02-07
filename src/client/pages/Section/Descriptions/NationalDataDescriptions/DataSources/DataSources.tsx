import './DataSources.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName, CommentableDescriptionValue, DataSource } from 'meta/assessment'
import { NationalDataDescription } from 'meta/assessment/description'

import { useCommentableDescriptionValue } from 'client/store/data'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import ButtonCopyDataSources from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/ButtonCopyDataSources'
import DataSourceRow from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/DataSourceRow'

import { useActions } from './hooks/useActions'
import { useGetDataSourcesLinked } from './hooks/useGetDataSourcesLinked'

type Props = {
  disabled: boolean
  nationalData: NationalDataDescription
  sectionName: string
}

const placeholder: DataSource = {
  type: '',
  variables: [],
  comments: '',
  year: '',
  reference: '',
}

const template: CommentableDescriptionValue = { text: '' }
const name: CommentableDescriptionName = CommentableDescriptionName.dataSources

export const DataSources: React.FC<Props> = (props: Props) => {
  const { disabled, nationalData, sectionName } = props

  const { t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const value = useCommentableDescriptionValue({ name, sectionName, template })
  const { dataSourcesLinked } = useGetDataSourcesLinked({ nationalData, sectionName })
  const { onChange, onDelete } = useActions({ sectionName })

  const { dataSources: dataSourceValues = [] } = value

  // const _onChange = useCallback(
  //   (dataSource: DataSource) => {
  //     const { uuid } = dataSource
  //     const updatedDescription = Objects.cloneDeep({
  //       ...commentableDescriptionValue,
  //       dataSources: Objects.cloneDeep(dataSourceValues),
  //     })
  //     // If we don't have UUID, it's a new data source
  //     if (uuid) {
  //       const i = updatedDescription.dataSources.findIndex((dataSource) => dataSource.uuid === uuid)
  //       updatedDescription.dataSources[i] = dataSource
  //     } else {
  //       updatedDescription.dataSources.push({ ...dataSource, uuid: UUIDs.v4() })
  //     }
  //     onChange(updatedDescription)
  //   },
  //   [dataSourceValues, commentableDescriptionValue, onChange]
  // )
  //
  // const _onDelete = useCallback(
  //   (uuid: string) => {
  //     onChange({
  //       ...commentableDescriptionValue,
  //       dataSources: commentableDescriptionValue.dataSources.filter((dataSource) => dataSource.uuid !== uuid),
  //     })
  //   },
  //   [commentableDescriptionValue, onChange]
  // )

  if (!dataSourceValues.length && !dataSourcesLinked?.length && disabled) return null

  const copyDisabled = dataSourceValues.length !== 0

  const keyPrefix = `${assessmentName}.${cycleName}.description.dataSource`

  return (
    <div className="data-source wrapper">
      {!disabled && <ButtonCopyDataSources disabled={copyDisabled} currentValue={value} sectionName={sectionName} />}

      <DataGrid gridTemplateColumns="0px minmax(200px, 1fr) minmax(200px, 1fr) minmax(250px, 1fr) minmax(150px, 300px) minmax(100px, 1fr) min-content">
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
              dataSourceMetadata={nationalData.dataSources}
              dataSourceValue={dataSourceValue}
              disabled={disabled}
              key={String(`data-source-row-${i}`)}
              onChange={onChange}
              onDelete={() => onDelete(dataSourceValue.uuid)}
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
