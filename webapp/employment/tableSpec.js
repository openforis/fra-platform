import React from 'react'
import R from 'ramda'

const inputRow = rowHeaderCell => [
  rowHeaderCell,
  ...R.map(() => ({type: 'integerInput'}), yearRange)
]

const heading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <td className="fra-table__header-cell">{i18n.t(localizationKey)}</td>})

const subHeading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <td className="fra-table__header-cell-sub">{i18n.t(localizationKey)}</td>})

export default i18n => ({
  name: 'employment',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('employment.categoryHeader')}</th>
    <th className="fra-table__header-cell" colSpan={yearRange.length}>{i18n.t('employment.numberOfStudents')}</th>
  </tr>
  <tr>
    {
      R.map(year => <th key={year} className="fra-table__header-cell">{year}</th>, yearRange)
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
