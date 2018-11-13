import React from 'react'
import * as R from 'ramda'

import { formatDecimal } from '../../../utils/numberFormat'
import { div, mul } from '../../../../common/bignumberUtils'

const Extent = (props) => {

  const {
    i18n, years, getFraValue,
    extentOfForest,
    specificForestCategories,
    forestAreaWithinProtectedAreas,
    certifiedAreas,
  } = props

  const specificForestCategoriesYears = {1990: 1, 2000: 2, 2010: 3, 2015: 4, 2020: 5}

  const getForestAreaWithinProtectedAreasPerc = (row, col, year) => {
    const forestArea = getFraValue('forestArea', year)
    const value = R.path(['tableData', row, col])(forestAreaWithinProtectedAreas)
    return mul(
      div(value, forestArea),
      100
    )
  }

  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">

        <table className="fra-table">

          <thead>
          <tr>
            <th className="fra-table__header-cell">{i18n.t('landing.contentCheck.extent')}</th>
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
              {i18n.t('landing.contentCheck.forest')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(getFraValue('forestArea', year))}
                  </div>
                </td>
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.owl')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {formatDecimal(getFraValue('otherWoodedLand', year))}
                  </div>
                </td>
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.primaryForest')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {
                      formatDecimal(
                        mul(
                          div(
                            R.path(['tableData', 3, specificForestCategoriesYears[year]])(specificForestCategories),
                            getFraValue('forestArea', year)
                          ),
                          100
                        )
                      )
                    }
                  </div>
                </td>
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.forestProtectedArea')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {
                      formatDecimal(
                        getForestAreaWithinProtectedAreasPerc(0, i + 1, year)
                      )
                    }
                  </div>
                </td>
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.forestMgmtPlan')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {
                      formatDecimal(
                        getForestAreaWithinProtectedAreasPerc(1, i + 1, year)
                      )
                    }
                  </div>
                </td>
              )
            }
          </tr>


          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.certifiedForestArea')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {
                      formatDecimal(
                        R.prop(year, certifiedAreas)
                      )
                    }
                  </div>
                </td>
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('specificForestCategories.bamboo')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {
                      formatDecimal(
                        R.path(['tableData', 0, specificForestCategoriesYears[year]])(specificForestCategories)
                      )
                    }
                  </div>
                </td>
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('specificForestCategories.mangroves')}
            </th>
            {
              years.map((year, i) =>
                <td key={i} className="fra-table__cell">
                  <div className="number-input__readonly-view">
                    {
                      formatDecimal(
                        R.path(['tableData', 1, specificForestCategoriesYears[year]])(specificForestCategories)
                      )
                    }
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

export default Extent
