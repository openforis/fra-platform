import React from 'react'

import ResponsibleAgency from './responsibleAgency'
import ReviewIndicator from '@webapp/loggedin/review/reviewIndicator'

import { div, mul } from '@common/bignumberUtils'
import { formatDecimal } from '@webapp/utils/numberFormat'
import * as R from 'ramda'

import { getForestArea } from './indicators'

const Indicator = ({i18n, countryIso, countryConfig, data, years, disabled}) => {

  const area2015 = R.path(['faoStat', 2015, 'area'], countryConfig)
  const getValueByYear = year => mul(div(getForestArea(data, year), area2015), 100)

  return <div className="fra-table__container">
    <div className="fra-table__scroll-wrapper">
      <table className="fra-table">
        <thead>
          <tr>
            <th rowSpan="2" className="fra-table__header-cell-left">{i18n.t('sustainableDevelopment.indicator')}</th>
            <th colSpan={years.length} className="fra-table__header-cell">{i18n.t('sustainableDevelopment.percent')}</th>
          </tr>
          <tr>
            {
              R.map(year =>
                <th key={`${year}h`} className="fra-table__header-cell">{year}</th>
              )(years)
            }
            </tr>
        </thead>
        <tbody>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('sustainableDevelopment.forestAreaProportionLandArea2015')}
            </th>
            {
              R.map(year =>
                <td key={`${year}v`} className="fra-table__calculated-cell">
                  {formatDecimal(getValueByYear(year))}
                </td>
              )(years)
            }
            <td className="fra-table__row-anchor-cell">
              <div className="fra-table__review-indicator-anchor">
                {
                  disabled
                    ? null
                    : <ReviewIndicator section={'sustainableDevelopment'}
                                       title={i18n.t('sustainableDevelopment.forestAreaProportionLandArea2015')}
                                       target={['indicator15.1.1']}
                                       countryIso={countryIso}/>
                }
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ResponsibleAgency
      i18n={i18n}
      countryIso={countryIso}
      tableSpecName="sustainableDevelopmentAgencyIndicator"
      disabled={disabled}/>
  </div>
}

export default Indicator
