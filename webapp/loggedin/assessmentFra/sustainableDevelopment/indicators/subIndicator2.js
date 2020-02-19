import React from 'react'

import ResponsibleAgency from './responsibleAgency'
import ReviewIndicator from '@webapp/loggedin/review/reviewIndicator'

import * as R from 'ramda'
import { formatDecimal } from '@webapp/utils/numberFormat'

import ButtonTableExport from '@webapp/components/buttonTableExport'

const SubIndicator2 = ({i18n, countryIso, data, years, disabled}) => {
  const tableRef = React.useRef(null)

  const getBiomassStock = year => R.path(['biomassStock', year], data)

  return <div className="fra-table__container">
    <div className="fra-table__scroll-wrapper">
      <ButtonTableExport
        tableRef={tableRef}
      />
      <table ref={tableRef} className="fra-table">
        <thead>
        <tr>
          <th rowSpan="2" className="fra-table__header-cell-left">
            {i18n.t('sustainableDevelopment.subIndicator', {no: 2})}
          </th>
          <th colSpan={years.length} className="fra-table__header-cell">
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
            years.map(year =>
              <td key={`${year}h`} className="fra-table__calculated-cell">
                {formatDecimal(getBiomassStock(year))}
              </td>
            )
          }
          <td className="fra-table__row-anchor-cell">
            <div className="fra-table__review-indicator-anchor">
              {
                disabled
                  ? null
                  : <ReviewIndicator section={'sustainableDevelopment'}
                                     title={i18n.t('sustainableDevelopment.aboveGroundBiomassStockForests')}
                                     target={['subIndicator2']}
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
      tableSpecName="sustainableDevelopmentAgencySubIndicator2"
      disabled={disabled}/>

  </div>
}

export default SubIndicator2
