import './DataSources.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'
import { UUIDs } from '@utils/uuids'

import { CommentableDescriptionValue, DataSource } from '@meta/assessment'
import { DataSourceDescription } from '@meta/assessment/description/nationalDataDataSourceDescription'

import { useAssessment, useAssessmentSection, useCycle } from '@client/store/assessment'
import DataGrid from '@client/components/DataGrid'
import DataColumn from '@client/components/DataGrid/DataColumn'

import { useDescriptions } from '../../../Descriptions'
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
  const {
    nationalData: { dataSources: dataSourceMetadata },
  } = useDescriptions({
    disabled,
    sectionName,
    descriptions: subSection.props.descriptions[cycle.uuid],
  })

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

  if (!dataSourceValues.length && disabled) return null
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

        {dataSourceValues.concat(disabled ? [] : placeholder).map((dataSourceValue) => {
          return (
            <DataSourceRow
              dataSourceMetadata={dataSourceMetadata as unknown as DataSourceDescription}
              dataSourceValue={dataSourceValue}
              disabled={disabled}
              key={`dataSource_${dataSourceValue.uuid ?? 'placeholder'}`}
              onChange={_onChange}
              onDelete={() => _onDelete(dataSourceValue.uuid)}
              placeholder={!dataSourceValue.uuid}
            />
          )
        })}

        {/*  {dataSources.concat(disabled ? [] : placeholder).map((dataSource, i) => ( */}
        {/*    <DataSourceRow */}
        {/*      descriptionDataSource={descriptionDataSource} */}
        {/*      onChange={(dataSource: DataSource) => _onChange(dataSource)} */}
        {/*      // eslint-disable-next-line react/no-array-index-key */}
        {/*      key={`dataSource_${i}`} */}
        {/*      disabled={disabled} */}
        {/*      sectionName={sectionName} */}
        {/*      dataSource={dataSource} */}
        {/*      // if we don't have uuid, it's a placeholder */}
        {/*      placeholder={!dataSource.uuid} */}
        {/*      onDelete={() => _onDelete(dataSource.uuid)} */}
        {/*    /> */}
        {/*  ))} */}
      </DataGrid>
    </div>
  )
}

export default DataSources
