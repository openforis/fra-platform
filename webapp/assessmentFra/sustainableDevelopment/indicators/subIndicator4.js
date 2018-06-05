import React from 'react'

import ResponsibleAgency from './responsibleAgency'
import ReviewIndicator from '../../../review/reviewIndicator'

import { formatDecimal } from '../../../utils/numberFormat'
import * as R from 'ramda'

const SubIndicator4 = ({i18n, countryIso, years, countryConfig, disabled}) => {

  const indicatorYears = R.reject(y => y === '1990', years)

  const getCertifiedArea = year => R.path(['certifiedAreas', year])(countryConfig)

  return <div className="fra-table__container">
    <div className="fra-table__scroll-wrapper">
      <table className="fra-table">
        <thead>
        <tr>
          <th rowSpan="2" className="fra-table__header-cell-left">
            {i18n.t('sustainableDevelopment.subIndicator', {no: 4})}
          </th>
          <th colSpan={years.length} className="fra-table__header-cell">
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
            indicatorYears.map(year =>
              <td key={`${year}h`} className="fra-table__calculated-cell">
                {formatDecimal(getCertifiedArea(year))}
              </td>
            )
          }
          <td className="fra-table__row-anchor-cell">
            <div className="fra-table__review-indicator-anchor">
              {
                disabled
                  ? null
                  : <ReviewIndicator
                    section={'sustainableDevelopment'}
                    title={i18n.t('sustainableDevelopment.forestAreaVerifiedForestManagement')}
                    target={['subIndicator4']}
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
      tableSpecName="sustainableDevelopmentAgencySubIndicator4"
      disabled={disabled}/>

  </div>
}

export default SubIndicator4
