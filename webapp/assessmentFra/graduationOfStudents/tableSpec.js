import React from 'react'
import R from 'ramda'
import { subCategoryValidator } from '../../traditionalTable/validators'

const yearRange = R.range(2000, 2018)

const inputRow = (rowHeaderCell, validator) => [
  rowHeaderCell,
  ...R.map(() => ({type: 'integerInput', validator: validator}), yearRange)
]

const heading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <th className="fra-table__category-cell">{i18n.t(localizationKey)}</th>})

const subHeading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <th className="fra-table__subcategory-cell">{i18n.t(localizationKey)}</th>})

export default i18n => ({
  name: 'graduationOfStudents',
  header: <thead>
    <tr>
      <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('graduationOfStudents.fra2020Categories')}</th>
      <th className="fra-table__header-cell-left" colSpan={yearRange.length}>{i18n.t('graduationOfStudents.numberOfStudents')}</th>
    </tr>
    <tr>
      {
        R.map(year => <th key={year} className="fra-table__header-cell-left">{year}</th>, yearRange)
      }
    </tr>
  </thead>,
  rows: [
    inputRow(heading(i18n, 'graduationOfStudents.doctoralDegree')),
    inputRow(subHeading(i18n, 'graduationOfStudents.ofWhichFemale'), subCategoryValidator(0, [1])),
    inputRow(heading(i18n, 'graduationOfStudents.mastersDegree')),
    inputRow(subHeading(i18n, 'graduationOfStudents.ofWhichFemale'), subCategoryValidator(2, [3])),
    inputRow(heading(i18n, 'graduationOfStudents.bachelorsDegree')),
    inputRow(subHeading(i18n, 'graduationOfStudents.ofWhichFemale'), subCategoryValidator(4, [5])),
    inputRow(heading(i18n, 'graduationOfStudents.technicianCertificate')),
    inputRow(subHeading(i18n, 'graduationOfStudents.ofWhichFemale'), subCategoryValidator(6, [7])),
  ],
  valueSlice: {
    columnStart: 1
  }
})
