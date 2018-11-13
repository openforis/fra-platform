import React from 'react'
import * as R from 'ramda'

import { formatDecimal } from '../../../utils/numberFormat'
import { div, mul, sub } from '../../../../common/bignumberUtils'

const PeriodicChangeRate = (props) => {
  const {
    i18n, years, getFraValue,
    extentOfForest,
    forestCharacteristics
  } = props

  const getNetChange = (variable, i) => {
    const year = years[i]
    const yearNext = years[i + 1]

    return div(
      sub(
        getFraValue(variable, yearNext),
        getFraValue(variable, year),
      ),
      (yearNext - year)
    )
  }

  const getNetChangeRate = (variable, i) => {
    const year = years[i]
    const yearNext = years[i + 1]

    return (
      mul(
        sub(
          Math.pow(
            div(
              getFraValue(variable, yearNext),
              getFraValue(variable, year),
            ),
            div(
              1,
              (yearNext - year)
            )
          ),
          1),
        100)
    )
  }

  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">

        <table className="fra-table">

          <thead>
          <tr>
            <th className="fra-table__header-cell">{i18n.t('landing.contentCheck.periodicChangeRate')}</th>
            {
              years.map((year, i) =>
                i <= years.length - 2
                  ? <th key={i} className="fra-table__header-cell">{`${year}-${years[i + 1]}`}</th>
                  : null
              )
            }
          </tr>
          </thead>

          <tbody>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.forestAreaNetChange')}
            </th>
            {
              years.map((year, i) =>
                i <= years.length - 2 ?
                  <td key={i} className="fra-table__cell">
                    <div className="number-input__readonly-view">
                      {formatDecimal(
                        getNetChange('forestArea', i)
                      )}
                    </div>
                  </td>
                  : null
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.forestAreaNetChangeRate')}
            </th>
            {
              years.map((year, i) =>
                i <= years.length - 2 ?
                  <td key={i} className="fra-table__cell">
                    <div className="number-input__readonly-view">
                      {formatDecimal(
                        getNetChangeRate('forestArea', i)
                      )}
                    </div>
                  </td>
                  : null
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.owlNetChange')}
            </th>
            {
              years.map((year, i) =>
                i <= years.length - 2 ?
                  <td key={i} className="fra-table__cell">
                    <div className="number-input__readonly-view">
                      {formatDecimal(
                        getNetChange('otherWoodedLand', i)
                      )}
                    </div>
                  </td>
                  : null
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.owlNetChangeRate')}
            </th>
            {
              years.map((year, i) =>
                i <= years.length - 2 ?
                  <td key={i} className="fra-table__cell">
                    <div className="number-input__readonly-view">
                      {formatDecimal(
                        getNetChangeRate('otherWoodedLand', i)
                      )}
                    </div>
                  </td>
                  : null
              )
            }
          </tr>

          </tbody>
        </table>

      </div>
    </div>
  )
}

export default PeriodicChangeRate
