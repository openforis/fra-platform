import React from 'react'
import { useDispatch } from 'react-redux'
import * as R from 'ramda'

import { ODPDataSourceMethod } from '@core/odp'
import VerticallyGrowingTextField from '@webapp/components/verticallyGrowingTextField'
import MultiSelect from '@webapp/components/multiSelect'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useCountryIso, useI18n, usePrintView } from '@webapp/components/hooks'
import { saveDraft } from '../../actions'

type Props = {
  canEditData: boolean
  odp: any
}
const DataSources = (props: Props) => {
  const { odp, canEditData } = props
  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const [printView] = usePrintView()
  const displayReviewIndicator = odp.odpId && !printView && canEditData

  console.log(Object.values(ODPDataSourceMethod))

  return (
    <div className="odp__section">
      {!printView && <h3 className="subhead">{i18n.t('nationalDataPoint.dataSources')}</h3>}
      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper odp__data-source-table-wrapper">
          <table className="fra-table">
            <tbody>
              <tr>
                {printView && (
                  <th className="fra-table__header-cell odp__year-column" rowSpan={3}>
                    {odp.year}
                  </th>
                )}
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.references')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  <VerticallyGrowingTextField
                    value={odp.dataSourceReferences || ''}
                    onChange={(event: any) => {
                      dispatch(saveDraft(countryIso, R.assoc('dataSourceReferences', event.target.value, odp)))
                    }}
                    disabled={printView || !canEditData}
                  />
                </td>
                <td className="fra-table__row-anchor-cell">
                  {displayReviewIndicator ? (
                    <div className="odp__review-indicator-row-anchor">
                      <ReviewIndicator
                        section="odp"
                        title={i18n.t('nationalDataPoint.dataSources')}
                        target={[odp.odpId, 'dataSourceReferences']}
                        countryIso={countryIso}
                      />
                    </div>
                  ) : null}
                </td>
              </tr>

              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.methodsUsed')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  <MultiSelect
                    disabled={printView || !canEditData}
                    i18n={i18n}
                    localizationPrefix="nationalDataPoint.dataSourceMethodsOptions"
                    values={odp.dataSourceMethods}
                    options={Object.values(ODPDataSourceMethod)}
                    onChange={(values: any) => {
                      dispatch(saveDraft(countryIso, R.assoc('dataSourceMethods', values, odp)))
                    }}
                  />
                </td>
                <td className="fra-table__row-anchor-cell">
                  {displayReviewIndicator ? (
                    <div className="odp__review-indicator-row-anchor">
                      <ReviewIndicator
                        section="odp"
                        title={i18n.t('nationalDataPoint.dataSources')}
                        target={[odp.odpId, 'dataSourceMethods']}
                        countryIso={countryIso}
                      />
                    </div>
                  ) : null}
                </td>
              </tr>

              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.additionalComments')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  <VerticallyGrowingTextField
                    value={odp.dataSourceAdditionalComments || ''}
                    onChange={(event: any) => {
                      dispatch(saveDraft(countryIso, R.assoc('dataSourceAdditionalComments', event.target.value, odp)))
                    }}
                    disabled={printView || !canEditData}
                  />
                </td>
                <td className="fra-table__row-anchor-cell">
                  {displayReviewIndicator ? (
                    <div className="odp__review-indicator-row-anchor">
                      <ReviewIndicator
                        section="odp"
                        title={i18n.t('nationalDataPoint.dataSources')}
                        target={[odp.odpId, 'dataSourceAdditionalComments']}
                        countryIso={countryIso}
                      />
                    </div>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default DataSources
