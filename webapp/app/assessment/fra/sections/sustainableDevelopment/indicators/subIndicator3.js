import React from 'react'
import * as R from 'ramda'

import ResponsibleAgency from './responsibleAgency'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'

import { div, mul } from '@common/bignumberUtils'
import { formatDecimal } from '@common/numberFormat'

import { getForestArea } from './indicators'

import ButtonTableExport from '@webapp/components/buttonTableExport'

const SubIndicator3 = ({i18n, countryIso, data, years, disabled}) => {
  const tableRef = React.useRef(null)

  const getValue = (year, field) => {
    const val = R.path(['forestAreaWithinProtectedAreas', field, year], data)
    return mul(div(val, getForestArea(data, 2015)), 100)
  }

  const getValueProtectedAreas = year => getValue(year, 'forestAreaWithinProtectedAreas')

  return <div className="fra-table__container">
    <div className="fra-table__scroll-wrapper">
      <ButtonTableExport
        tableRef={tableRef}
      />
      <table ref={tableRef} className="fra-table">

        <thead>
        <tr>
          <th rowSpan="2" className="fra-table__header-cell-left">
            {i18n.t('sustainableDevelopment.subIndicator', {no: 3})}
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
            {i18n.t('sustainableDevelopment.proportionForestAreaLegallyEstablishedProtectedAreas')}
          </th>
          {
            years.map((year, i) =>
              <td key={`${year}h`} className="fra-table__calculated-cell">
                {formatDecimal(getValueProtectedAreas(year))}
              </td>
            )
          }
          <td className="fra-table__row-anchor-cell">
            <div className="fra-table__review-indicator-anchor">
              {
                disabled
                  ? null
                  : <ReviewIndicator section={'sustainableDevelopment'}
                                     title={i18n.t('sustainableDevelopment.proportionForestAreaLegallyEstablishedProtectedAreas')}
                                     target={['proportionForestAreaLegallyEstablishedProtectedAreas']}
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
      tableSpecName="sustainableDevelopmentAgencySubIndicator3"
      disabled={disabled}/>

  </div>
}

export default SubIndicator3
