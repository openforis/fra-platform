import './DataSources.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks/auth'
import { useCycleRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import ButtonCopy from 'client/components/DataSources/ButtonCopy'
import DataSourceRow from 'client/components/DataSources/DataSourceRow'
import HistoryCompare from 'client/components/DataSources/HistoryCompare'
import { PropsDataSources } from 'client/components/DataSources/types'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import Title from 'client/pages/Section/Descriptions/CommentableDescription/Title'
import { DOMs } from 'client/utils/doms'

const name: CommentableDescriptionName = CommentableDescriptionName.dataSources

const defaults: Partial<PropsDataSources> = {
  options: {
    canCopy: false,
    canToggleEdit: false,
    canToggleHistory: false,
    displayHistory: false,
  },
}

export const DataSources: React.FC<PropsDataSources> = (props: PropsDataSources) => {
  const { data, dataSourcesLinked, historyCompares, meta, options = defaults.options, sectionName } = props
  const { dataSources, text } = data
  const { canCopy, displayHistory } = options

  const { t } = useTranslation()
  const { assessmentName } = useCycleRouteParams()

  const canEdit = useCanEditDescription({ sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name })
  const textEmpty = useMemo<boolean>(() => DOMs.isHTMLEmpty(text), [text])

  const { print } = useIsPrintRoute()

  const hasDataSources = !Objects.isEmpty(dataSources) || !Objects.isEmpty(dataSourcesLinked)
  const renderGrid = Boolean(hasDataSources || editable)
  const keyPrefix = `${assessmentName}.description.dataSource`

  return (
    <DataGrid className="description" withActions={canEdit}>
      <Title name={name} options={options} title={t('description.dataSourcesPlus')} />

      {print && !hasDataSources && <div className="editorWYSIWYG jodit-wysiwyg textarea-print">-</div>}
      {renderGrid && (
        <>
          {editable && canCopy && <ButtonCopy disabled={dataSources.length !== 1} sectionName={sectionName} />}

          <DataGrid
            className="data-source"
            gridColumn={canEdit ? `1/3` : undefined}
            gridTemplateColumns="minmax(200px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr)"
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

            {displayHistory &&
              historyCompares.map((historyCompare, i) => (
                <HistoryCompare
                  key={`${String(i)}-${historyCompare.dataItem?.uuid ?? historyCompare.historyItem?.uuid}`}
                  historyCompare={historyCompare}
                  lastRow={i === historyCompares.length - 1}
                  meta={meta}
                />
              ))}

            {!displayHistory &&
              dataSources.map((dataSourceValue, i) => {
                return (
                  <DataSourceRow
                    key={String(`dataSource_${dataSourceValue.uuid}`)}
                    dataSource={dataSourceValue}
                    lastRow={i === dataSources.length - 1}
                    meta={meta}
                    sectionName={sectionName}
                  />
                )
              })}
          </DataGrid>

          {meta?.text?.readOnly && editable && !textEmpty && (
            <div className="data-sources__readOnlyText">
              <h5>{t('nationalDataPoint.dataSource2025ExplanatoryText')}</h5>
              <div className="description__editor-container">
                <EditorWYSIWYG disabled onChange={(): object => ({})} value={text} />
              </div>
            </div>
          )}
        </>
      )}
    </DataGrid>
  )
}

export default DataSources
