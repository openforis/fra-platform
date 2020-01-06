import React from 'react'
import * as R from 'ramda'

import { formatDecimal } from '@webapp/utils/numberFormat'

const Disturbances = (props) => {

  const {
    i18n,
    disturbances,
    areaAffectedByFire
  } = props

  const years = R.range(2000, 2018)

  const disturbancesRows = [
    'insects', 'diseases', 'severeWeatherEvents', 'other'
  ]

  const areaAffectedByFireRows = [
    'totalLandAreaAffectedByFire'
  ]

  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">

        <table className="fra-table">

          <thead>
          <tr>
            <th className="fra-table__header-cell">{i18n.t('landing.contentCheck.disturbances')}</th>
            {
              years.map((year, i) =>
                <th key={i} className="fra-table__header-cell">{year}</th>
              )
            }
          </tr>
          </thead>

          <tbody>

          {
            disturbancesRows.map((row, r) =>
              <tr key={r}>
                <th className="fra-table__category-cell">
                  {i18n.t(`disturbances.${row}`)}
                </th>
                {
                  years.map((year, i) =>
                    <td key={i} className="fra-table__cell">
                      <div className="number-input__readonly-view">
                        {formatDecimal(
                          R.path(['tableData', r, i + 1], disturbances)
                        )}
                      </div>
                    </td>
                  )
                }
              </tr>
            )
          }


          {
            areaAffectedByFireRows.map((row, r) =>
              <tr key={r}>
                <th className="fra-table__category-cell">
                  {i18n.t(`areaAffectedByFire.${row}`)}
                </th>
                {
                  years.map((year, i) =>
                    <td key={i} className="fra-table__cell">
                      <div className="number-input__readonly-view">
                        {formatDecimal(
                          R.path(['tableData', r, i + 1], areaAffectedByFire)
                        )}
                      </div>
                    </td>
                  )
                }
              </tr>
            )
          }

          </tbody>

        </table>

      </div>
    </div>
  )

}

export default Disturbances
