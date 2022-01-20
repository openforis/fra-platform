import React from 'react'

import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'
import MultiSelect from '@client/components/MultiSelect'
// import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useTranslation } from 'react-i18next'
// import { useCountryIso } from '@client/hooks'
import { useOriginalDataPoint } from '@client/store/data/originalDataPoint'
import { ODPDataSourceMethod } from '@meta/assessment/originalDataPoint'

type Props = {
  canEditData: boolean
}

const DataSources: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()

  const i18n = useTranslation()
  // const countryIso = useCountryIso()
  const [printView] = [false] // TODO: usePrintView()
  const displayReviewIndicator = originalDataPoint.odpId && !printView && canEditData

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
                    {originalDataPoint.year}
                  </th>
                )}
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.references')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  <VerticallyGrowingTextField
                    value={originalDataPoint.dataSourceReferences || ''}
                    // onChange={(event) => {
                    // const odpUpdate = { ...originalDataPoint, dataSourceReferences: event.target.value }
                    // dispatch(OriginalDataPointActions.updateODP({ odp: odpUpdate }))
                    // }}
                    disabled={printView || !canEditData}
                  />
                </td>
                <td className="fra-table__row-anchor-cell">
                  {displayReviewIndicator ? (
                    <div className="odp__review-indicator-row-anchor">
                      {/* <ReviewIndicator */}
                      {/*  section="odp" */}
                      {/*  title={i18n.t('nationalDataPoint.dataSources')} */}
                      {/*  target={[originalDataPoint.odpId, 'dataSourceReferences']} */}
                      {/*  countryIso={countryIso} */}
                      {/* /> */}
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
                    values={originalDataPoint.dataSourceMethods}
                    options={Object.values(ODPDataSourceMethod)}
                    // onChange={(values: Array<ODPDataSourceMethod>) => {
                    // const odpUpdate = { ...originalDataPoint, dataSourceMethods: values }
                    // dispatch(OriginalDataPointActions.updateODP({ odp: odpUpdate }))
                    // }}
                  />
                </td>
                <td className="fra-table__row-anchor-cell">
                  {displayReviewIndicator ? (
                    <div className="odp__review-indicator-row-anchor">
                      {/* <ReviewIndicator */}
                      {/*  section="odp" */}
                      {/*  title={i18n.t('nationalDataPoint.dataSources')} */}
                      {/*  target={[originalDataPoint.odpId, 'dataSourceMethods']} */}
                      {/*  countryIso={countryIso} */}
                      {/* /> */}
                    </div>
                  ) : null}
                </td>
              </tr>

              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.additionalComments')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  <VerticallyGrowingTextField
                    value={originalDataPoint.dataSourceAdditionalComments || ''}
                    // onChange={(event) => {
                    // const odpUpdate = { ...originalDataPoint, dataSourceAdditionalComments: event.target.value }
                    // dispatch(OriginalDataPointActions.updateODP({ odp: odpUpdate }))
                    // }}
                    disabled={printView || !canEditData}
                  />
                </td>
                <td className="fra-table__row-anchor-cell">
                  {displayReviewIndicator ? (
                    <div className="odp__review-indicator-row-anchor">
                      {/* <ReviewIndicator */}
                      {/*  section="odp" */}
                      {/*  title={i18n.t('nationalDataPoint.dataSources')} */}
                      {/*  target={[originalDataPoint.odpId, 'dataSourceAdditionalComments']} */}
                      {/*  countryIso={countryIso} */}
                      {/* /> */}
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
