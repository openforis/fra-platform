import React from 'react'

import ResponsibleAgency from './responsibleAgency'
import ReviewIndicator from '../../../review/reviewIndicator'

import { div, mul } from '../../../../common/bignumberUtils'
import { formatDecimal } from '../../../utils/numberFormat'
import * as R from 'ramda'

import { getForestArea } from './indicators'

const SubIndicator3 = ({i18n, countryIso, data, years}) => {

  const getValue = (year, field) => {
    const val = R.path(['forestAreaWithinProtectedAreas', field, year], data)
    return mul(div(val, getForestArea(data, year)), 100)
  }

  const getValueProtectedAreas = year => getValue(year, 'forestAreaWithinProtectedAreas')
  const getValueForestManagement = year => getValue(year, 'forestAreaWithLongTermManagementPlan')

  return <div className="fra-table__container fra-sustainable-dev-sub-indicator-table">
    <div className="fra-table__scroll-wrapper">
      <table className="fra-table">
        <thead>
        <tr>
          <th rowSpan="2" className="fra-table__header-cell-left">
            {i18n.t('sustainableDevelopment.subIndicator', {no: 3})}
          </th>
          <th colSpan="9" className="fra-table__header-cell">
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
            {i18n.t('sustainableDevelopment.proportionForestAreaLegallyEstablishedProtectedAreas')}
          </th>
          {
            years.map((year, i) =>
              <td key={`${year}h`} className="fra-table__calculated-cell">
                {formatDecimal(getValueProtectedAreas(year, i))}
              </td>
            )
          }
          <td className="fra-table__row-anchor-cell">
            <div className="fra-table__review-indicator-anchor">
              <ReviewIndicator
                section={'sustainableDevelopment'}
                title={i18n.t('sustainableDevelopment.proportionForestAreaLegallyEstablishedProtectedAreas')}
                target={['indicator15.2.1.3', 'proportionForestAreaLegallyEstablishedProtectedAreas']}
                countryIso={countryIso}/>
            </div>
          </td>
        </tr>

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
              <ReviewIndicator
                section={'sustainableDevelopment'}
                title={i18n.t('sustainableDevelopment.proportionForestAreaLongTermForestManagement')}
                target={['indicator15.2.1.3', 'proportionForestAreaLongTermForestManagement']}
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
      tableSpecName="sustainableDevelopmentAgencyIndicator15_2_1_3"/>

  </div>
}

export default SubIndicator3
