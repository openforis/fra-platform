import './DataSources.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { CommentableDescriptionName } from 'meta/assessment'
import { NationalDataDescription } from 'meta/assessment/description'

import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import { useSectionContext } from 'client/pages/Section/context'
import { useDescriptionErrorState } from 'client/pages/Section/Descriptions/CommentableDescription/hooks/useDescriptionErrorState'
import Title from 'client/pages/Section/Descriptions/CommentableDescription/Title'
import ButtonCopy from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/ButtonCopy'
import DataSourceRow from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/DataSourceRow'
import HistoryCompare from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/HistoryCompare'

import { useDataSourcesData } from './hooks/useDataSourcesData'
import { useDataSourcesHistory } from './hooks/useDataSourcesHistory'
import { useGetDataSourcesLinked } from './hooks/useGetDataSourcesLinked'

type Props = {
  nationalData: NationalDataDescription
}

const name: CommentableDescriptionName = CommentableDescriptionName.dataSources

export const DataSources: React.FC<Props> = (props: Props) => {
  const { nationalData } = props

  const { t } = useTranslation()
  const { assessmentName } = useCycleRouteParams()
  const { sectionName } = useSectionContext()
  const { dataSources, text } = useDataSourcesData({ sectionName })
  const { dataSourcesLinked } = useGetDataSourcesLinked({ nationalData, sectionName })
  const historyCompares = useDataSourcesHistory({ dataSources })
  const canEdit = useCanEditDescription({ sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name })
  const { empty } = useDescriptionErrorState({ name, sectionName })

  const renderGrid = Boolean(!Objects.isEmpty(dataSources) || !Objects.isEmpty(dataSourcesLinked) || editable)
  const keyPrefix = `${assessmentName}.description.dataSource`

  return (
    <DataGrid className="description" withActions={canEdit}>
      <Title name={name} title={t('description.dataSourcesPlus')} />

      {renderGrid && (
        <>
          {editable && <ButtonCopy disabled={dataSources.length !== 1} sectionName={sectionName} />}

          <DataGrid
            gridColumn={canEdit ? `1/3` : undefined}
            gridTemplateColumns="minmax(200px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr) minmax(150px, 300px) minmax(150px, 1fr)"
            withActions={canEdit}
          >
            <DataCell header>{t(`${keyPrefix}.referenceToTataSource`)}</DataCell>
            <DataCell header>{t(`${keyPrefix}.typeOfDataSource`)}</DataCell>
            <DataCell header>{t(`${keyPrefix}.variable`)}</DataCell>
            <DataCell header>{t(`${keyPrefix}.yearForDataSource`)}</DataCell>
            <DataCell header lastCol>
              {t(`${keyPrefix}.comments`)}
            </DataCell>
            {canEdit && <div />}

            {dataSourcesLinked &&
              dataSourcesLinked.map((dataSource, i) => (
                <React.Fragment key={`linkedDataSource_${dataSource.data.uuid}`}>
                  <DataSourceRow
                    dataSource={dataSource.data}
                    lastRow={i === dataSourcesLinked.length - 1}
                    meta={dataSource.meta}
                    readOnly
                    sectionName={sectionName}
                  />
                  {canEdit && <div />}
                </React.Fragment>
              ))}

            {historyCompares &&
              historyCompares.map((historyCompare, i) => (
                <HistoryCompare
                  key={historyCompare.dataItem?.uuid ?? historyCompare.historyItem?.uuid}
                  historyCompare={historyCompare}
                  lastRow={i === historyCompares.length - 1}
                  meta={nationalData.dataSources}
                />
              ))}

            {!historyCompares &&
              dataSources.map((dataSourceValue, i) => {
                return (
                  <DataSourceRow
                    key={String(`dataSource_${dataSourceValue.uuid}`)}
                    dataSource={dataSourceValue}
                    lastRow={i === dataSources.length - 1}
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
