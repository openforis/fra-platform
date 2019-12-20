import React from 'react'

import ResponsibleAgency from './responsibleAgency'
import ReviewIndicator from '@webapp/loggedin/review/reviewIndicator'

import { div, mul, sub } from '@common/bignumberUtils'
import { formatDecimal } from '@webapp/utils/numberFormat'
import * as R from 'ramda'

import { getForestArea } from './indicators'

const SubIndicator1 = ({i18n, countryIso, data, years, disabled}) => {

  const getValue1YearDiff = (year1, year2) => {
    const forest1 = getForestArea(data, year1)
    const forest2 = getForestArea(data, year2)
    return mul(div(sub(forest2, forest1), forest2), 100)
  }

  const getValueGt2yearsDiff = (year1, year2, p) => {
    const forest1 = getForestArea(data, year1)
    const forest2 = getForestArea(data, year2)
    const divided = div(forest2, forest1)
    if (R.isNil(divided) || R.isNil(p)) return null
    return mul(sub(Math.pow(divided, p), 1), 100)
  }

  const getValue5yearsDiff = (year1, year2) => getValueGt2yearsDiff(year1, year2, 0.2)

  const getValue10yearsDiff = (year1, year2) => getValueGt2yearsDiff(year1, year2, 0.1)

  const getValue = (year1, year2) => {
    switch (sub(year2, year1).toNumber()) {
      case 10:
        return getValue10yearsDiff(year1, year2)
      case 5:
        return getValue5yearsDiff(year1, year2)
      case 1:
        return getValue1YearDiff(year1, year2)
    }
  }

  return <div className="fra-table__container">
    <div className="fra-table__scroll-wrapper">
      <table className="fra-table">
        <thead>
        <tr>
          <th rowSpan="2" className="fra-table__header-cell-left">
            {i18n.t('sustainableDevelopment.subIndicator', {no: 1})}
          </th>
          <th colSpan={years.length - 1} className="fra-table__header-cell">
            {i18n.t('sustainableDevelopment.percent')}
          </th>
        </tr>
        <tr>
          {
            years.map((year, i) =>
              i <= years.length - 2
                ? <th key={`${year}h`} className="fra-table__header-cell">{`${year}-${years[i + 1]}`}</th>
                : null
            )
          }
        </tr>
        </thead>
        <tbody>
        <tr>
          <th className="fra-table__category-cell">
            {i18n.t('sustainableDevelopment.forestAreaAnnualNetChangeRate')}
          </th>
          {
            years.map((year, i) =>
              i <= years.length - 2
                ? <td key={`${year}h`}
                      className="fra-table__calculated-cell">{formatDecimal(getValue(year, years[i + 1]))}</td>
                : null
            )
          }
          <td className="fra-table__row-anchor-cell">
            <div className="fra-table__review-indicator-anchor">
              {
                disabled
                  ? null
                  : <ReviewIndicator section={'sustainableDevelopment'}
                                     title={i18n.t('sustainableDevelopment.forestAreaAnnualNetChangeRate')}
                                     target={['subIndicator1']}
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
      tableSpecName="sustainableDevelopmentAgencySubIndicator1"
      disabled={disabled}/>

  </div>
}

export default SubIndicator1
