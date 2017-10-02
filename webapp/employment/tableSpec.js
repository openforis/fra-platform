import React from 'react'
import R from 'ramda'

const inputRow = rowHeaderCell => [
  rowHeaderCell,
  ...R.times(() => ({type: 'integerInput'}), 8)
]

const rowHeading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <td className="fra-table__header-cell">{i18n.t(localizationKey)}</td>})

const rowSubHeading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <td className="fra-table__header-cell-sub">{i18n.t(localizationKey)}</td>})

const ofWhichFemaleHeading = i18n =>
  <th className="fra-table__header-cell-sub">
    {i18n.t('employment.ofWhichFemale')}
  </th>

export default i18n => ({
  name: 'employment',
  header: <thead>
    <tr>
      <th className="fra-table__header-cell" >{i18n.t('employment.categoryHeader')}</th>
      <th className="fra-table__header-cell-right">1990</th>
      {ofWhichFemaleHeading(i18n)}
      <th className="fra-table__header-cell-right">2000</th>
      {ofWhichFemaleHeading(i18n)}
      <th className="fra-table__header-cell-right">2010</th>
      {ofWhichFemaleHeading(i18n)}
      <th className="fra-table__header-cell-right">2015</th>
      {ofWhichFemaleHeading(i18n)}
    </tr>
  </thead>,
  rows: [
    inputRow(rowHeading(i18n, 'employment.inForestryAndLogging')),
    inputRow(rowSubHeading(i18n, 'employment.ofWhichSilviculture')),
    inputRow(rowSubHeading(i18n, 'employment.ofWhichLogging')),
    inputRow(rowSubHeading(i18n, 'employment.ofWhichGathering')),
    inputRow(rowSubHeading(i18n, 'employment.ofWhichSupport'))
  ],
  valueSlice: {
    columnStart: 1
  }
})
