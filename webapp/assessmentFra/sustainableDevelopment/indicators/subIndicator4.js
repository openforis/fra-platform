import React from 'react'

import ResponsibleAgency from './responsibleAgency'
import ReviewIndicator from '../../../review/reviewIndicator'

import { div, mul, min } from '../../../../common/bignumberUtils'
import { formatDecimal } from '../../../utils/numberFormat'
import * as R from 'ramda'

import { getForestArea } from './indicators'

const SubIndicator4 = ({ i18n, countryIso, data, years, disabled }) => {

  const getValue = (year, field) => {
    const val = R.path(['forestAreaWithinProtectedAreas', field, year], data)
    const valuePercent = mul(div(val, getForestArea(data, 2015)), 100)
    const value = min([valuePercent, 100])
    return isNaN(value) ? null : value
  }

  const getValueForestManagement = year => getValue(year, 'forestAreaWithLongTermManagementPlan')

  return <div className="fra-table__container">
    <div className="fra-table__scroll-wrapper">
      <table className="fra-table">

        <thead>
        <tr>
          <th rowSpan="2" className="fra-table__header-cell-left">
            {i18n.t('sustainableDevelopment.subIndicator', { no: 4 })}
          </th>
          <th colSpan={years.length} className="fra-table__header-cell">
            {i18n.t('sustainableDevelopment.percent2015ForestAreaBaseline')}
          </th>
        </tr>
        <tr>
          {
            years.map(year =>
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
            {i18n.t('sustainableDevelopment.proportionForestAreaLongTermForestManagement')}
          </th>
          {
            years.map((year, i) =>
              <td key={`${year}h`} className="fra-table__calculated-cell">
                {formatDecimal(getValueForestManagement(year, i))}
              </td>
            )
          }
          <td className="fra-table__row-anchor-cell">
            <div className="fra-table__review-indicator-anchor">
              {
                disabled
                  ? null
                  : <ReviewIndicator section={'sustainableDevelopment'}
                                     title={i18n.t('sustainableDevelopment.proportionForestAreaLongTermForestManagement')}
                                     target={['proportionForestAreaLongTermForestManagement']}
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
