import React from 'react'

import ResponsibleAgency from './responsibleAgency'
import ReviewIndicator from '../../../review/reviewIndicator'

import { div, mul, sum } from '../../../../common/bignumberUtils'
import { formatDecimal } from '../../../utils/numberFormat'
import * as R from 'ramda'

import { getDataPoint, getForestArea } from './indicators'

const Indicator = ({i18n, countryIso, data, years}) => {

  const area2015 = R.pipe(
    R.partial(getDataPoint, [data]),
    dataPoint => sum([dataPoint.forestArea, dataPoint.otherWoodedLand, dataPoint.otherLand])
  )(2015)

  const getValueByYear = year => R.pipe(
    R.partial(getForestArea, [data]),
    forestArea => div(forestArea, area2015),
    res => R.isNil(res) ? null : mul(res, 100)
  )(year)

  return <div className="fra-sustainable-dev-indicator-15-1-1">
    <div className="fra-view__section-header">
      <h3 className="subhead">{i18n.t('sustainableDevelopment.indicator1')}</h3>
    </div>
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table">
          <thead>
          <tr>
            <th rowSpan="2" className="fra-table__header-cell-left">{i18n.t('sustainableDevelopment.indicator')}</th>
            <th colSpan="9" className="fra-table__header-cell">{i18n.t('sustainableDevelopment.percent')}</th>
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
                <td key={`${year}v`} className="fra-table__calculated-cell">{formatDecimal(getValueByYear(year))}</td>
              )(years)
            }
            <td className="fra-table__row-anchor-cell">
              <div className="fra-table__review-indicator-anchor">
                <ReviewIndicator
                  section={'sustainableDevelopment'}
                  title={i18n.t('sustainableDevelopment.forestAreaProportionLandArea2015')}
                  target={['indicator15.1.1']}
                  countryIso={countryIso}/>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <ResponsibleAgency
        i18n={i18n}
        countryIso={countryIso}
        tableSpecName="sustainableDevelopmentAgencyIndicator"/>
    </div>


  </div>
}

export default Indicator
