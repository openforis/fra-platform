import React from 'react'
import * as R from 'ramda'

import { formatDecimal } from '@webapp/utils/numberFormat'
import { div, add, } from '@common/bignumberUtils'

const ForestGSBiomassCarbon = (props) => {

  const {
    i18n, years,
    biomassStock,
    growingStock,
    carbonStock,
  } = props

  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">

        <table className="fra-table">

          <thead>
          <tr>
            <th className="fra-table__header-cell">{i18n.t('landing.contentCheck.forestGSBiomassCarbon')}</th>
            {
              years.map((year, i) =>
                <th key={`${year}h`} className="fra-table__header-cell">{year}</th>
              )
            }
          </tr>
          </thead>

          <tbody>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.gs')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(R.path(['avgTable', year, 'forest'], growingStock))}
                  </div>
                </td>
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.agb')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(R.path(['tableData', 0, i + 1], biomassStock))}
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.bgb')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(R.path(['tableData', 1, i + 1], biomassStock))}
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.deadwood')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(R.path(['tableData', 2, i + 1], biomassStock))}
                  </div>
                </td>
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.carbonAgb')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(R.path(['tableData', 0, i + 1], carbonStock))}
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.carbonBgb')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(R.path(['tableData', 1, i + 1], carbonStock))}
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.carbonDeadwood')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(R.path(['tableData', 2, i + 1], carbonStock))}
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.carbonLitter')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(R.path(['tableData', 3, i + 1], carbonStock))}
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.carbonSoil')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(R.path(['tableData', 4, i + 1], carbonStock))}
                  </div>
                </td>
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.ratioAgb')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(
                      div(
                        R.path(['tableData', 0, i + 1], biomassStock),
                        R.path(['avgTable', year, 'forest'], growingStock)
                      )
                    )}
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.rootShootRatio')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(
                      div(
                        R.path(['tableData', 1, i + 1], biomassStock),
                        R.path(['tableData', 0, i + 1], biomassStock)
                      )
                    )}
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.ratioDeadwood')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(
                      div(
                        R.path(['tableData', 2, i + 1], biomassStock),
                        add(
                          R.path(['tableData', 0, i + 1], biomassStock),
                          R.path(['tableData', 1, i + 1], biomassStock)
                        )
                      )
                    )}
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.ratioCarbonAgb')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(
                      div(
                        R.path(['tableData', 0, i + 1], carbonStock),
                        R.path(['tableData', 0, i + 1], biomassStock)
                      )
                    )}
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.ratioCarbonBgb')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(
                      div(
                        R.path(['tableData', 1, i + 1], carbonStock),
                        R.path(['tableData', 1, i + 1], biomassStock)
                      )
                    )}
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.ratioCarbonDeadwood')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(
                      div(
                        R.path(['tableData', 2, i + 1], carbonStock),
                        R.path(['tableData', 2, i + 1], biomassStock)
                      )
                    )}
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

export default ForestGSBiomassCarbon
