import React from 'react'

import ResponsibleAgency from './responsibleAgency'
import ReviewIndicator from '../../../review/reviewIndicator'

import * as R from 'ramda'
import { formatDecimal } from '../../../utils/numberFormat'

const Indicator15_2_1_1 = ({i18n, countryIso, data, years}) => {

  const getBiomassStock = col => R.pipe(
    R.defaultTo([[]]),
    data => data[0][col]
  )(data.biomassStock)

  return <div className="fra-table__container fra-sustainable-dev-sub-indicator-table">
    <div className="fra-table__scroll-wrapper">
      <table className="fra-table">
        <thead>
        <tr>
          <th rowSpan="2" className="fra-table__header-cell-left">
            {i18n.t('sustainableDevelopment.subIndicator', {no: 2})}
          </th>
          <th colSpan="9" className="fra-table__header-cell">
            {i18n.t('biomassStock.tableHeader')}
          </th>
        </tr>
        <tr>
          {
            years.map((year, i) =>
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
            {i18n.t('sustainableDevelopment.aboveGroundBiomassStockForests')}
          </th>
          {
            years.map((year, i) =>
              <td key={`${year}h`} className="fra-table__calculated-cell">
                {formatDecimal(getBiomassStock(i))}
              </td>
            )
          }
          <td className="fra-table__row-anchor-cell">
            <div className="fra-table__review-indicator-anchor">
              <ReviewIndicator
                section={'sustainableDevelopment'}
                title={i18n.t('sustainableDevelopment.aboveGroundBiomassStockForests')}
                target={['indicator15.2.1.2']}
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
      tableSpecName="sustainableDevelopmentAgencyIndicator15_2_1_2"/>

  </div>
}

export default Indicator15_2_1_1
