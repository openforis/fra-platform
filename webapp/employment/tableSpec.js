import React from 'react'
import R from 'ramda'
import { add } from '../../common/bignumberUtils'

const sumOfGenders = (tableData, rowIdx, yearIdx) => {
  const female = tableData[rowIdx][yearIdx * 3 + 2]
  const male = tableData[rowIdx][yearIdx * 3 + 3]
  if (R.isNil(female) && R.isNil(male))
    return null
  else if (R.isNil(female))
    return male
  else if (R.isNil(male))
    return female
  else
    return add(female, male).toFixed(0)
}

const yearFields = rowIdx => yearIdx => [
  {
    type: 'custom',
    render: props =>
      <td className="fra-table__aggregate-cell">{sumOfGenders(props.tableData, rowIdx, yearIdx)}</td>
  },
  {type: 'integerInput'},
  {type: 'integerInput'}
]

const inputRow = (rowIdx, rowHeaderCell) => [
  rowHeaderCell,
  ...R.flatten(R.map(yearFields(rowIdx), R.range(0, 4)))
]

const rowHeading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <td className="fra-table__header-cell">{i18n.t(localizationKey)}</td>})

const rowSubHeading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <td className="fra-table__header-cell-sub">{i18n.t(localizationKey)}</td>})

const yearSubHeadings = i18n =>
  [
    <th key="total" className="fra-table__header-cell-right">Total</th>,
    <th key="female" className="fra-table__header-cell-right">Female</th>,
    <th key="male" className="fra-table__header-cell-right">Male</th>
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
    inputRow(0, rowHeading(i18n, 'employment.inForestryAndLogging')),
    inputRow(1, rowSubHeading(i18n, 'employment.ofWhichSilviculture')),
    inputRow(2, rowSubHeading(i18n, 'employment.ofWhichLogging')),
    inputRow(3, rowSubHeading(i18n, 'employment.ofWhichGathering')),
    inputRow(4, rowSubHeading(i18n, 'employment.ofWhichSupport'))
  ],
  valueSlice: {
    columnStart: 1
  }
})
