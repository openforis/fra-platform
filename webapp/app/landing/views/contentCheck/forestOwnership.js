import React from 'react'
import * as R from 'ramda'

import { formatDecimal } from '@common/numberFormat'
import { sub } from '@common/bignumberUtils'
import { getForestAreaForYear } from '@common/extentOfForestHelper'

const ForestOwnership = (props) => {
  const {
    years, countryIso, i18n,
    extentOfForest, forestOwnership
  } = props

  const tableYears = years.filter(y => y % 5 === 0 && y <= 2015)

  const getOtherValue = i => {
    const year = tableYears[i]

    const getValue = (row, col) => R.pipe(
      R.path(['tableData', row, col]),
      R.defaultTo(0)
    )(forestOwnership)

    const rows = [0, 4]
    const value = R.reduce(
      (value, row) => sub(value, getValue(row, i + 1)),
      getForestAreaForYear(extentOfForest, year),
      rows
    )

    return value
  }

  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">

        <table className="fra-table">

          <thead>
          <tr>
            <th className="fra-table__header-cell">{i18n.t('landing.contentCheck.forestOwnership')}</th>
            {
              tableYears.map((year, i) =>
                <th key={i} className="fra-table__header-cell">{year}</th>
              )
            }
          </tr>
          </thead>

          <tbody>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('forestOwnership.privateOwnership')}
            </th>
            {
              tableYears.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(
                      R.path(['tableData', 0, i + 1], forestOwnership)
                    )}
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('forestOwnership.publicOwnership')}
            </th>
            {
              tableYears.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(
                      R.path(['tableData', 4, i + 1], forestOwnership)
                    )}
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('forestOwnership.otherOrUnknown')}
            </th>
            {
              tableYears.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(getOtherValue(i))}
                  </div>
                </td>
              )
            }
          </tr>
          </tbody>

        </table>

      </div>
    </div>
  )
}

export default ForestOwnership
