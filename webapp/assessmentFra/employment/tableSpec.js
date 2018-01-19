import React from 'react'
import R from 'ramda'
import { sum } from '../../../common/bignumberUtils'
import { formatInteger } from '../../utils/numberFormat'
import { subCategoryValidator } from '../../traditionalTable/validators'

const years = [1990, 2000, 2010, 2015]

const sumOfGenders = (tableData, rowIdx, yearIdx) => {
  const female = tableData[rowIdx][yearIdx * 3 + 2]
  const male = tableData[rowIdx][yearIdx * 3 + 3]

  return R.pipe(
    sum,
    formatInteger
  )([female, male])
}

const genderOfWhichValitor = subCategoryValidator(0, R.range(1, 5))

const yearFields = (rowIdx, validator) => yearIdx => [
  {type: 'integerInput', validator: validator},
  {type: 'integerInput', validator: validator},
  {type: 'integerInput', validator: validator}
]

const inputRow = (rowIdx, rowHeaderCell, validator) => [
  rowHeaderCell,
  ...R.flatten(R.map(yearFields(rowIdx, validator), years))
]

const rowHeading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <th className="fra-table__category-cell">{i18n.t(localizationKey)}</th>})

const rowSubHeading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <th className="fra-table__subcategory-cell">{i18n.t(localizationKey)}</th>})

export default i18n => ({
  name: 'employment',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left" rowSpan="3">{i18n.t('employment.categoryHeader')}</th>
    <th className="fra-table__header-cell" colSpan={years.length * 3}>{i18n.t('employment.unitHeader')}</th>
  </tr>
  <tr>
    {
      R.map(year=>
        <th key={year} colSpan="3" className="fra-table__header-cell">{year}</th>
      , years)
    }
  </tr>
  <tr>
    {
      R.map(year=>
        [
          <th key="total" className="fra-table__header-cell">{i18n.t('employment.total')}</th>,
          <th key="female" className="fra-table__category-cell-right">{i18n.t('employment.female')}</th>,
          <th key="male" className="fra-table__category-cell-right">{i18n.t('employment.male')}</th>
        ]
      , years)
    }
  </tr>
  </thead>,
  rows: [
    inputRow(0, rowHeading(i18n, 'employment.inForestry')),
    inputRow(1, rowSubHeading(i18n, 'employment.ofWhichSilviculture'), genderOfWhichValitor),
    inputRow(2, rowSubHeading(i18n, 'employment.ofWhichLogging'), genderOfWhichValitor),
    inputRow(3, rowSubHeading(i18n, 'employment.ofWhichGathering'), genderOfWhichValitor),
    inputRow(4, rowSubHeading(i18n, 'employment.ofWhichSupport'), genderOfWhichValitor)
  ],
  valueSlice: {
    columnStart: 1
  }
})
