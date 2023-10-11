import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { ODPDataSourceMethod, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Topics } from 'meta/messageCenter'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import MarkdownPreview from 'client/components/MarkdownPreview'
import MultiSelect from 'client/components/MultiSelect'
import ReviewIndicator from 'client/components/ReviewIndicator'
import VerticallyGrowingTextField from 'client/components/VerticallyGrowingTextField'
import { useUpdateDataSources } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useUpdateDataSources'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const DataSources: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props

  const { t } = useTranslation()
  const { print } = useIsPrintRoute()
  const updateOriginalDataPoint = useUpdateDataSources()

  const displayReviewIndicator = originalDataPoint.id && !print && canEditData
  const editorOptions = useMemo(() => ({ buttons: ['link'], statusbar: false }), [])

  const isDisabled = print || !canEditData || !originalDataPoint.year

  return (
    <div className="odp__section">
      {!print && <h3 className="subhead">{t('nationalDataPoint.dataSources')}</h3>}

      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper odp__data-source-table-wrapper">
          <table className="fra-table">
            <tbody>
              <tr>
                {print && (
                  <th className="fra-table__header-cell odp__year-column" rowSpan={3}>
                    {originalDataPoint.year}
                  </th>
                )}
                <th className="fra-table__header-cell-left">{t('nationalDataPoint.references')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  {isDisabled && (
                    <div className="vgtf__textarea">
                      <MarkdownPreview value={originalDataPoint.dataSourceReferences ?? ''} />
                    </div>
                  )}

                  {!isDisabled && (
                    <EditorWYSIWYG
                      onChange={(value) => {
                        const dataSourceReferences = Objects.isEmpty(value) ? null : value
                        const originalDataPointUpdate = { ...originalDataPoint, dataSourceReferences }
                        updateOriginalDataPoint(originalDataPointUpdate)
                      }}
                      options={editorOptions}
                      value={originalDataPoint.dataSourceReferences ?? ''}
                    />
                  )}
                </td>
                {displayReviewIndicator && (
                  <td className="fra-table__review-cell no-print">
                    <ReviewIndicator
                      title={t('nationalDataPoint.references')}
                      subtitle={t('nationalDataPoint.dataSources')}
                      topicKey={Topics.getOdpReviewTopicKey(originalDataPoint.id, 'dataSourceReferences')}
                    />
                  </td>
                )}
              </tr>

              <tr>
                <th className="fra-table__header-cell-left">{t('nationalDataPoint.methodsUsed')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  <MultiSelect
                    disabled={isDisabled}
                    values={originalDataPoint.dataSourceMethods ?? []}
                    options={Object.values(ODPDataSourceMethod).map((method) => ({
                      value: method,
                      label: t(`nationalDataPoint.dataSourceMethodsOptions.${method}`),
                    }))}
                    onChange={(values: Array<ODPDataSourceMethod>) => {
                      const originalDataPointUpdate = { ...originalDataPoint, dataSourceMethods: values }
                      updateOriginalDataPoint(originalDataPointUpdate)
                    }}
                  />
                </td>
                {displayReviewIndicator && (
                  <td className="fra-table__review-cell no-print">
                    <ReviewIndicator
                      title={t('nationalDataPoint.methodsUsed')}
                      subtitle={t('nationalDataPoint.dataSources')}
                      topicKey={Topics.getOdpReviewTopicKey(originalDataPoint.id, 'dataSourceMethods')}
                    />
                  </td>
                )}
              </tr>

              <tr>
                <th className="fra-table__header-cell-left">{t('nationalDataPoint.additionalComments')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  <VerticallyGrowingTextField
                    value={originalDataPoint.dataSourceAdditionalComments || ''}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                      const caret = event.target.selectionStart
                      const element = event.target
                      window.requestAnimationFrame(() => {
                        element.selectionStart = caret
                        element.selectionEnd = caret
                      })
                      const originalDataPointUpdate = {
                        ...originalDataPoint,
                        dataSourceAdditionalComments: event.target.value,
                      }
                      updateOriginalDataPoint(originalDataPointUpdate)
                    }}
                    disabled={isDisabled}
                  />
                </td>
                {displayReviewIndicator && (
                  <td className="fra-table__review-cell no-print">
                    <ReviewIndicator
                      title={t('nationalDataPoint.additionalComments')}
                      subtitle={t('nationalDataPoint.dataSources')}
                      topicKey={Topics.getOdpReviewTopicKey(originalDataPoint.id, 'dataSourceAdditionalComments')}
                    />
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DataSources
