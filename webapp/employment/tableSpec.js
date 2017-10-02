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

export default i18n => ({
  name: 'employment',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" >{i18n.t('employment.categoryHeader')}</th>
    {
      R.addIndex(R.map)(
        (text, idx) => <td key={idx} className="fra-table__header-cell-right">{text}</td>,
        //year => <th key={year} className="fra-table__header-cell">{year}</th>,
        [
          "1990",
          i18n.t('employment.ofWhichFemale'),
          "2000",
          i18n.t('employment.ofWhichFemale'),
          "2010",
          i18n.t('employment.ofWhichFemale'),
          "2015",
          i18n.t('employment.ofWhichFemale')
         ]
      )
    }
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
