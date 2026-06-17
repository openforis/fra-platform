import './DataSources.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import DataSourceRow from 'client/components/DataSources/DataSourceRow'
import HistoryCompare from 'client/components/DataSources/HistoryCompare'
import { PropsDataSources } from 'client/components/DataSources/types'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import { DOMs } from 'client/utils/doms'

import { useGridTemplateColumns } from './hooks/useGridTemplateColumns'

const defaults: Partial<PropsDataSources> = {
  options: {
    canEdit: false,
    canReview: false,
    displayHistory: false,
    includeVariables: false,
    includeYears: false,
  },
}

export const DataSources: React.FC<PropsDataSources> = (props: PropsDataSources) => {
  const {
    columns,
    data,
    dataSourcesLinked,
    historyCompares,
    meta,
    onChange,
    onDelete,
    options = defaults.options,
    validationErrors,
  } = props
  const { dataSources, text } = data
  const { canEdit, canReview, displayHistory, includeVariables, includeYears } = options

  const { t } = useTranslation()
  const { assessmentName } = useCycleRouteParams()
  const { print } = useIsPrintRoute()
  const gridTemplateColumns = useGridTemplateColumns({ options })

  const textEmpty = useMemo<boolean>(() => DOMs.isHTMLEmpty(text), [text])
  const hasPlaceholder = useMemo<boolean>(() => Boolean(dataSources?.find((d) => d.placeholder)), [dataSources])

  const hasDataSources = !Objects.isEmpty(dataSources) || !Objects.isEmpty(dataSourcesLinked)
  const renderGrid = Boolean(hasDataSources || canEdit)
  const keyPrefix = `${assessmentName}.description.dataSource`
  const withActions = canEdit || canReview

  return (
    <>
      {print && !hasDataSources && <div className="editorWYSIWYG jodit-wysiwyg textarea-print">-</div>}
      {renderGrid && (
        <>
          <DataGrid
            className="data-source"
            gridColumn={canEdit ? `1/3` : undefined}
            gridTemplateColumns={gridTemplateColumns}
            withActions={withActions}
          >
            <DataCell header>{t(`${keyPrefix}.referenceToTataSource`)}</DataCell>
            <DataCell header>{t(`${keyPrefix}.typeOfDataSource`)}</DataCell>
            {includeVariables && <DataCell header>{t(`${keyPrefix}.variable`)}</DataCell>}
            {includeYears && <DataCell header>{t(`${keyPrefix}.yearForDataSource`)}</DataCell>}
            <DataCell header lastCol>
              {t(`${keyPrefix}.comments`)}
            </DataCell>
            {withActions && <div />}

            {dataSourcesLinked &&
              dataSourcesLinked.map((dataSource, i) => (
                <React.Fragment key={`linkedDataSource_${dataSource.data.uuid}`}>
                  <DataSourceRow
                    columns={columns}
                    dataSource={dataSource.data}
                    lastRow={i === dataSourcesLinked.length - 1}
                    meta={dataSource.meta}
                    onChange={onChange}
                    onDelete={onDelete}
                    options={options}
                    readOnly
                    validationErrors={validationErrors?.[dataSource.data.uuid]}
                  />
                  {canReview && <div />}
                </React.Fragment>
              ))}

            {displayHistory &&
              historyCompares.map((historyCompare, i) => (
                <HistoryCompare
                  key={`${String(i)}-${historyCompare.dataItem?.uuid ?? historyCompare.historyItem?.uuid}`}
                  columns={columns}
                  historyCompare={historyCompare}
                  lastRow={i === historyCompares.length - 1}
                  meta={meta}
                  options={options}
                />
              ))}

            {!displayHistory &&
              dataSources.map((dataSourceValue, i) => {
                if (!canEdit && dataSourceValue.placeholder) return null

                return (
                  <DataSourceRow
                    key={String(`dataSource_${dataSourceValue.uuid}`)}
                    columns={columns}
                    dataSource={dataSourceValue}
                    lastRow={i === dataSources.length - (hasPlaceholder && !canEdit ? 2 : 1)}
                    meta={meta}
                    onChange={onChange}
                    onDelete={onDelete}
                    options={options}
                    validationErrors={validationErrors?.[dataSourceValue.uuid]}
                  />
                )
              })}
          </DataGrid>

          {meta?.text?.readOnly && canEdit && !textEmpty && (
            <div className="data-sources__readOnlyText">
              <h5>{t('nationalDataPoint.dataSource2025ExplanatoryText')}</h5>
              <div className="description__editor-container">
                <EditorWYSIWYG disabled onChange={(): object => ({})} value={text} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default DataSources
