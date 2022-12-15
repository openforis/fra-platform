import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'

import { ODPDataSourceMethod, OriginalDataPoint } from '@meta/assessment/originalDataPoint'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { OriginalDataPointActions } from '@client/store/pages/originalDataPoint'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'
import MultiSelect from '@client/components/MultiSelect'
import ReviewIndicator from '@client/components/ReviewIndicator'
import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const DataSources: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props

  const dispatch = useAppDispatch()
  const i18n = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const { print } = useIsPrint()

  const displayReviewIndicator = originalDataPoint.id && !print && canEditData

  const updateOriginalDataPoint = (originalDataPointUpdate: OriginalDataPoint) => {
    dispatch(
      OriginalDataPointActions.updateOriginalDataPoint({
        countryIso,
        cycleName: cycle.name,
        assessmentName: assessment.props.name,
        originalDataPoint: originalDataPointUpdate,
      })
    )
  }

  const isDisabled = print || !canEditData || !originalDataPoint.year
  return (
    <div className="odp__section">
      {!print && <h3 className="subhead">{i18n.t('nationalDataPoint.dataSources')}</h3>}

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
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.references')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  <VerticallyGrowingTextField
                    value={originalDataPoint.dataSourceReferences || ''}
                    onChange={(event) => {
                      const { value } = event.target
                      const originalDataPointUpdate = {
                        ...originalDataPoint,
                        dataSourceReferences: Objects.isEmpty(value) ? null : value,
                      }
                      updateOriginalDataPoint(originalDataPointUpdate)
                    }}
                    disabled={isDisabled}
                  />
                </td>
                {displayReviewIndicator && (
                  <td className="fra-table__review-cell no-print">
                    <ReviewIndicator
                      title={i18n.t('nationalDataPoint.references')}
                      subtitle={i18n.t('nationalDataPoint.dataSources')}
                      topicKey={`${originalDataPoint.id}-dataSourceReferences`}
                    />
                  </td>
                )}
              </tr>

              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.methodsUsed')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  <MultiSelect
                    disabled={isDisabled}
                    i18n={i18n}
                    localizationPrefix="nationalDataPoint.dataSourceMethodsOptions"
                    values={originalDataPoint.dataSourceMethods ?? []}
                    options={Object.values(ODPDataSourceMethod)}
                    onChange={(values: Array<ODPDataSourceMethod>) => {
                      const originalDataPointUpdate = { ...originalDataPoint, dataSourceMethods: values }
                      updateOriginalDataPoint(originalDataPointUpdate)
                    }}
                  />
                </td>
                {displayReviewIndicator && (
                  <td className="fra-table__review-cell no-print">
                    <ReviewIndicator
                      title={i18n.t('nationalDataPoint.methodsUsed')}
                      subtitle={i18n.t('nationalDataPoint.dataSources')}
                      topicKey={`${originalDataPoint.id}-dataSourceMethods`}
                    />
                  </td>
                )}
              </tr>

              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.additionalComments')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  <VerticallyGrowingTextField
                    value={originalDataPoint.dataSourceAdditionalComments || ''}
                    onChange={(event) => {
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
                      title={i18n.t('nationalDataPoint.additionalComments')}
                      subtitle={i18n.t('nationalDataPoint.dataSources')}
                      topicKey={`${originalDataPoint.id}-dataSourceAdditionalComments`}
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
