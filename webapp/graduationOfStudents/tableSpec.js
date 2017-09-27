import React from 'react'
import R from 'ramda'

const yearRange = R.range(2000, 2018)

const inputRow = rowHeaderCell => [
  rowHeaderCell,
  ...R.map(() => ({type: 'integerInput'}), yearRange)
]

const heading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <td className="fra-table__header-cell">{i18n.t(localizationKey)}</td>})

const subHeading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <td className="fra-table__header-cell-sub">{i18n.t(localizationKey)}</td>})

export default i18n => ({
  name: 'graduationOfStudents',
  header: <thead>
    <tr>
      <th className="fra-table__header-cell" rowSpan="2">{i18n.t('graduationOfStudents.fra2020Categories')}</th>
      <th className="fra-table__header-cell" colSpan={yearRange.length}>{i18n.t('graduationOfStudents.numberOfStudents')}</th>
    </tr>
    <tr>
      {
        R.map(year => <th className="fra-table__header-cell">{year}</th>, yearRange)
      }
    </tr>
  </thead>,
  rows: [
    inputRow(heading(i18n, 'graduationOfStudents.doctoralDegree')),
    inputRow(subHeading(i18n, 'graduationOfStudents.ofWhichFemale')),
    inputRow(heading(i18n, 'graduationOfStudents.mastersDegree')),
    inputRow(subHeading(i18n, 'graduationOfStudents.ofWhichFemale')),
    inputRow(heading(i18n, 'graduationOfStudents.bachelorsDegree')),
    inputRow(subHeading(i18n, 'graduationOfStudents.ofWhichFemale')),
    inputRow(heading(i18n, 'graduationOfStudents.technicianCertificate')),
    inputRow(subHeading(i18n, 'graduationOfStudents.ofWhichFemale')),
  ],
  valueSlice: {
    columnStart: 1
  }
})
