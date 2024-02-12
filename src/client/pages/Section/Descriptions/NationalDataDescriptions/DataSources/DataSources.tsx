import './DataSources.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'
import { NationalDataDescription } from 'meta/assessment/description'

import { useIsDescriptionEditable } from 'client/store/user/hooks'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import { useDescriptionErrorState } from 'client/pages/Section/Descriptions/CommentableDescription/hooks/useDescriptionErrorState'
import Title from 'client/pages/Section/Descriptions/CommentableDescription/Title'
import ButtonCopy from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/ButtonCopy'
import DataSourceRow from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/DataSourceRow'

import { useDataSourcesData } from './hooks/useDataSourcesData'
import { useGetDataSourcesLinked } from './hooks/useGetDataSourcesLinked'
import { useGridTemplateColumns } from './hooks/useGridTemplateColumns'

type Props = {
  nationalData: NationalDataDescription
  sectionName: SectionName
}

const name: CommentableDescriptionName = CommentableDescriptionName.dataSources

export const DataSources: React.FC<Props> = (props: Props) => {
  const { nationalData, sectionName } = props

  const { t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const { dataSources, text } = useDataSourcesData({ sectionName })
  const { dataSourcesLinked } = useGetDataSourcesLinked({ nationalData, sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name })
  const { empty } = useDescriptionErrorState({ name, sectionName, showAlertEmptyContent: false })
  const gridTemplateColumns = useGridTemplateColumns({ sectionName })

  const renderGrid = Boolean(dataSources?.length || dataSourcesLinked?.length || editable)
  const keyPrefix = `${assessmentName}.${cycleName}.description.dataSource`

  return (
    <DataGrid className="description">
      <Title name={name} sectionName={sectionName} title={t('description.dataSourcesPlus')} />

      {renderGrid && (
        <>
          {editable && <ButtonCopy disabled={dataSources.length !== 0} sectionName={sectionName} />}

          <DataGrid gridTemplateColumns={gridTemplateColumns}>
            <DataCell header>{t(`${keyPrefix}.referenceToTataSource`)}</DataCell>
            <DataCell header>{t(`${keyPrefix}.typeOfDataSource`)}</DataCell>
            <DataCell header>{t(`${keyPrefix}.variable`)}</DataCell>
            <DataCell header>{t(`${keyPrefix}.yearForDataSource`)}</DataCell>
            <DataCell header lastCol>
              {t(`${keyPrefix}.comments`)}
            </DataCell>
            {editable && <div />}

            {dataSourcesLinked &&
              dataSourcesLinked.map((dataSource, i) => (
                <React.Fragment key={`linkedDataSource_${dataSource.data.uuid}`}>
                  <DataSourceRow
                    meta={dataSource.meta}
                    dataSource={dataSource.data}
                    disabled
                    lastRow={i === dataSourcesLinked.length - 1}
                    sectionName={sectionName}
                  />
                  {editable && <div />}
                </React.Fragment>
              ))}

            {dataSources.map((dataSourceValue, i) => {
              return (
                <DataSourceRow
                  dataSource={dataSourceValue}
                  disabled={!editable}
                  key={String(`dataSource_${dataSourceValue.uuid}`)}
                  lastRow={i === dataSources.length - (editable ? 0 : 1)}
                  meta={nationalData.dataSources}
                  sectionName={sectionName}
                />
              )
            })}
          </DataGrid>

          {nationalData.dataSources?.text?.readOnly && !empty && editable && (
            <div className="data-sources__readOnlyText">
              <h5>{t('nationalDataPoint.dataSource2025ExplanatoryText')}</h5>
              <div className="description__editor-container">
                <EditorWYSIWYG disabled onChange={() => ({})} value={text} />
              </div>
            </div>
          )}
        </>
      )}
    </DataGrid>
  )
}

export default DataSources
