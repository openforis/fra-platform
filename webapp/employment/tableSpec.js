import React from 'react'
import R from 'ramda'
import { sum } from '../../common/bignumberUtils'
import { formatInteger } from '../utils/numberFormat'
import { ofWhichValidator } from '../traditionalTable/validators'

const sumOfGenders = (tableData, rowIdx, yearIdx) => {
  const female = tableData[rowIdx][yearIdx * 3 + 2]
  const male = tableData[rowIdx][yearIdx * 3 + 3]

  return R.pipe(
    sum,
    formatInteger
  )([female, male])
}

const genderOfWhichValitor = ofWhichValidator(0, R.range(1, 5))

const yearFields = (rowIdx, validator) => yearIdx => [
  {
    type: 'custom',
    render: props =>
      <td className="fra-table__aggregate-cell">{sumOfGenders(props.tableData, rowIdx, yearIdx)}</td>
  },
  {type: 'integerInput', validator: validator},
  {type: 'integerInput', validator: validator}
]

const inputRow = (rowIdx, rowHeaderCell, validator) => [
  rowHeaderCell,
  ...R.flatten(R.map(yearFields(rowIdx, validator), R.range(0, 4)))
]

const rowHeading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <td className="fra-table__header-cell">{i18n.t(localizationKey)}</td>})

const rowSubHeading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <td className="fra-table__header-cell-sub">{i18n.t(localizationKey)}</td>})

const yearSubHeadings = i18n =>
  [
    <th key="total" className="fra-table__header-cell-right">Total</th>,
    <th key="female" className="fra-table__header-cell-sub-right">Female</th>,
    <th key="male" className="fra-table__header-cell-sub-right">Male</th>
  ]

export default i18n => ({
  name: 'employment',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="3">{i18n.t('employment.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="12">{i18n.t('employment.unitHeader')}</th>
  </tr>
  <tr>
    <th colSpan="3" className="fra-table__header-cell-middle">1990</th>
    <th colSpan="3" className="fra-table__header-cell-middle">2000</th>
    <th colSpan="3" className="fra-table__header-cell-middle">2010</th>
    <th colSpan="3" className="fra-table__header-cell-middle">2015</th>
  </tr>
  <tr>
    {yearSubHeadings(i18n)}
    {yearSubHeadings(i18n)}
    {yearSubHeadings(i18n)}
    {yearSubHeadings(i18n)}
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
