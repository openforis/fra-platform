import React from 'react'
import R from 'ramda'

const inputRow = rowHeaderCell => [
  rowHeaderCell,
  ...R.times(() => ({type: 'integerInput'}), 4)
]

const heading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <td className="fra-table__header-cell">{i18n.t(localizationKey)}</td>})

const subHeading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <td className="fra-table__header-cell-sub">{i18n.t(localizationKey)}</td>})

export default i18n => ({
  name: 'employment',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" >{i18n.t('employment.categoryHeader')}</th>
    {
      R.map(year => <th key={year} className="fra-table__header-cell">{year}</th>, [1990, 2000, 2010, 2015])
    }
  </tr>
  </thead>,
  rows: [
    inputRow(heading(i18n, 'employment.inForestryAndLogging')),
    inputRow(subHeading(i18n, 'employment.ofWhichFemale')),
    inputRow(subHeading(i18n, 'employment.ofWhichMale'))
  ],
  valueSlice: {
    columnStart: 1
  }
})
