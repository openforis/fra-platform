import React from 'react'
import * as R from 'ramda'

import { formatDecimal } from '@common/numberFormat'
import { div, mul, sub, sum } from '@common/bignumberUtils'

const PeriodicChangeRate = (props) => {
  const {
    i18n, years,
    getFraValue, tableData5YearsMapping,
    extentOfForest,
    forestCharacteristics,
    specificForestCategories,
  } = props

  const getNetChange = (valueA, valueB, yearA, yearB) =>
    valueA && valueB ?
      div(
        sub(valueB, valueA),
        yearB - yearA
      )
      : null

  const getNetChangeRate = (valueA, valueB, yearA, yearB) =>
    valueA && valueB && Number(valueA) > 0 && Number(valueB) > 0 ?
      mul(
        sub(
          Math.pow(
            div(valueB, valueA,),
            div(1, yearB - yearA)
          ),
          1
        ),
        100
      )
      : null

  const getValue = (variable, year, source) => {
    if (variable === 'plantedForest') {
      const plantedForest = sum([
        getFraValue('plantationForestArea', year, source),
        getFraValue('otherPlantedForestArea', year, source)
      ])
      return plantedForest
    }
    return getFraValue(variable, year, source)
  }

  const getNetChangeFRA = (variable, i, source = extentOfForest) => {
    const yearA = years[i]
    const yearB = years[i + 1]

    const valueA = getValue(variable, yearA, source)
    const valueB = getValue(variable, yearB, source)
    return getNetChange(valueA, valueB, yearA, yearB)
  }

  const getNetChangeRateFRA = (variable, i, source = extentOfForest) => {
    const yearA = years[i]
    const yearB = years[i + 1]

    const valueA = getValue(variable, yearA, source)
    const valueB = getValue(variable, yearB, source)
    return getNetChangeRate(valueA, valueB, yearA, yearB)
  }

  const getNetChangePrimaryForest = (i) => {
    const yearA = years[i]
    const yearB = years[i + 1]

    if (yearA % 5 === 0 && yearB % 5 === 0) {

      const valueA = R.path(['tableData', 3, tableData5YearsMapping[yearA]])(specificForestCategories)
      const valueB = R.path(['tableData', 3, tableData5YearsMapping[yearB]])(specificForestCategories)
      return getNetChange(valueA, valueB, yearA, yearB)
    }
    return null
  }

  const getNetChangeRatePrimaryForest = (i) => {
    const yearA = years[i]
    const yearB = years[i + 1]

    if (yearA % 5 === 0 && yearB % 5 === 0) {

      const valueA = R.path(['tableData', 3, tableData5YearsMapping[yearA]])(specificForestCategories)
      const valueB = R.path(['tableData', 3, tableData5YearsMapping[yearB]])(specificForestCategories)
      return getNetChangeRate(valueA, valueB, yearA, yearB)
    }
    return null
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
                        getNetChangeFRA('forestArea', i)
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
                        getNetChangeRateFRA('forestArea', i)
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
                        getNetChangeFRA('otherWoodedLand', i)
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
                        getNetChangeRateFRA('otherWoodedLand', i)
                      )}
                    </div>
                  </td>
                  : null
              )
            }
          </tr>


          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.primaryForestNetChange')}
            </th>
            {
              years.map((year, i) =>
                i <= years.length - 2 ?
                  <td key={i} className="fra-table__cell">
                    <div className="number-input__readonly-view">
                      {formatDecimal(
                        getNetChangePrimaryForest(i)
                      )}
                    </div>
                  </td>
                  : null
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.primaryForestNetChangeRate')}
            </th>
            {
              years.map((year, i) =>
                i <= years.length - 2 ?
                  <td key={i} className="fra-table__cell">
                    <div className="number-input__readonly-view">
                      {formatDecimal(
                        getNetChangeRatePrimaryForest(i)
                      )}
                    </div>
                  </td>
                  : null
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.naturallyRegeneratingForestNetChange')}
            </th>
            {
              years.map((year, i) =>
                i <= years.length - 2 ?
                  <td key={i} className="fra-table__cell">
                    <div className="number-input__readonly-view">
                      {formatDecimal(
                        getNetChangeFRA('naturalForestArea', i, forestCharacteristics)
                      )}
                    </div>
                  </td>
                  : null
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.naturallyRegeneratingForestNetChangeRate')}
            </th>
            {
              years.map((year, i) =>
                i <= years.length - 2 ?
                  <td key={i} className="fra-table__cell">
                    <div className="number-input__readonly-view">
                      {formatDecimal(
                        getNetChangeRateFRA('naturalForestArea', i, forestCharacteristics)
                      )}
                    </div>
                  </td>
                  : null
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.plantedForestNetChange')}
            </th>
            {
              years.map((year, i) =>
                i <= years.length - 2 ?
                  <td key={i} className="fra-table__cell">
                    <div className="number-input__readonly-view">
                      {formatDecimal(
                        getNetChangeFRA('plantedForest', i, forestCharacteristics)
                      )}
                    </div>
                  </td>
                  : null
              )
            }
          </tr>

          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('landing.contentCheck.plantedForestNetChangeRate')}
            </th>
            {
              years.map((year, i) =>
                i <= years.length - 2 ?
                  <td key={i} className="fra-table__cell">
                    <div className="number-input__readonly-view">
                      {formatDecimal(
                        getNetChangeRateFRA('plantedForest', i, forestCharacteristics)
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
