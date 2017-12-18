import React from 'react'

import ResponsibleAgency from './responsibleAgency'
import ReviewIndicator from '../../../review/reviewIndicator'

import { div, eq, mul, sub } from '../../../../common/bignumberUtils'
import { formatDecimal } from '../../../utils/numberFormat'
import * as R from 'ramda'

const Indicator15_2_1_1 = ({i18n, countryIso, data, years}) => {

  const getForestArea = year => R.pipe(
    R.find(v => eq(v.year, year) && R.propEq('type', 'odp', v)),
    o => R.isNil(o)
      ? R.find(v => eq(v.year, year) && R.propEq('type', 'fra', v), data.extentOfForest)
      : o,
    R.prop('forestArea')
  )(data.extentOfForest)

  const getValue1YearDiff = (year1, year2) => {
    const forest1 = getForestArea(year1)
    const forest2 = getForestArea(year2)

    return R.pipe(
      () => sub(forest2, forest1),
      v => R.isNil(v) ? null : div(v, forest2),
      v => R.isNil(v) ? null : mul(v, 100),
    )()
  }

  const getValueGt2yearsDiff = (year1, year2, p) => {
    const forest1 = getForestArea(year1)
    const forest2 = getForestArea(year2)

    return R.pipe(
      () => div(forest2, forest1),
      v => R.isNil(v) ? null : Math.pow(v, p),
      v => R.isNil(v) ? null : sub(v, 1),
      v => R.isNil(v) ? null : mul(v, 100)
    )()
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
          <th colSpan="8" className="fra-table__header-cell">
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
            {i18n.t('sustainableDevelopment.forestAreaProportionLandArea2015')}
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
              <ReviewIndicator
                section={'sustainableDevelopment'}
                title={i18n.t('sustainableDevelopment.forestAreaAnnualNetChangeRate')}
                target={['indicator15.2.1.1']}
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
      tableSpecName="sustainableDevelopmentAgencyIndicator15_2_1_1"/>

  </div>
}

export default Indicator15_2_1_1
