import React from 'react'

import ResponsibleAgency from './responsibleAgency'
import ReviewIndicator from '../../../review/reviewIndicator'

import { formatDecimal } from '../../../utils/numberFormat'
import * as R from 'ramda'

const Indicator15_2_1_4 = ({i18n, countryIso, data, years, countryConfig}) => {

  const indicatorYears = R.reject(y => y === '1990', years)

  const getCertifiedArea = year => R.path(['certifiedAreas',year])(countryConfig)

  return <div className="fra-table__container fra-sustainable-dev-sub-indicator-table">
    <div className="fra-table__scroll-wrapper">
      <table className="fra-table">
        <thead>
        <tr>
          <th rowSpan="2" className="fra-table__header-cell-left">
            {i18n.t('sustainableDevelopment.subIndicator', {no: 4})}
          </th>
          <th colSpan="8" className="fra-table__header-cell">
            {i18n.t('sustainableDevelopment.forestArea1000Ha')}
          </th>
        </tr>
        <tr>
          {
            indicatorYears.map(year =>
              <th key={`${year}h`} className="fra-table__header-cell">
                {year}
              </th>
            )
          }
        </tr>
        </thead>
        <tbody>
        <tr>
          <th className="fra-table__category-cell">
            {i18n.t('sustainableDevelopment.forestAreaVerifiedForestManagement')}
          </th>
          {
            indicatorYears.map((year, i) =>
              <td key={`${year}h`} className="fra-table__calculated-cell">
                {formatDecimal(getCertifiedArea(year))}
              </td>
            )
          }
          <td className="fra-table__row-anchor-cell">
            <div className="fra-table__review-indicator-anchor">
              <ReviewIndicator
                section={'sustainableDevelopment'}
                title={i18n.t('sustainableDevelopment.forestAreaVerifiedForestManagement')}
                target={['indicator15.2.1.4']}
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
      tableSpecName="sustainableDevelopmentAgencyIndicator15_2_1_4"/>

  </div>
}

export default Indicator15_2_1_4
