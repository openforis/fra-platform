import React from 'react'
import R from 'ramda'

const years = [1990, 2000, 2010, 2015]

const yearFields = (rowIdx, validator) => yearIdx => [
  {type: 'integerInput', validator: validator},
  {type: 'integerInput', validator: validator},
  {type: 'integerInput', validator: validator}
]

const inputRow = (rowIdx, rowHeaderCell, validator) => [
  rowHeaderCell,
  ...R.flatten(R.map(yearFields(rowIdx, validator), years))
]

const inputRowHeading = (i18n, localizationKey) =>
  ({type: 'readOnly', jsx: <th className="fra-table__category-cell">{i18n.t(localizationKey)}</th>})

export default i18n => ({
  name: 'graduationOfStudents',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left" rowSpan="3">{i18n.t('graduationOfStudents.fra2020Categories')}</th>
    <th className="fra-table__header-cell" colSpan={years.length * 3}>{i18n.t('graduationOfStudents.numberOfStudents')}</th>
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
          <th key="total" className="fra-table__header-cell">{i18n.t('graduationOfStudents.total')}</th>,
          <th key="female" className="fra-table__category-cell-right">{i18n.t('graduationOfStudents.female')}</th>,
          <th key="male" className="fra-table__category-cell-right">{i18n.t('graduationOfStudents.male')}</th>
        ]
      , years)
    }
  </tr>
  </thead>,
  rows: [
    inputRow(0, inputRowHeading(i18n, 'graduationOfStudents.doctoralDegree')),
    inputRow(1, inputRowHeading(i18n, 'graduationOfStudents.mastersDegree')),
    inputRow(2, inputRowHeading(i18n, 'graduationOfStudents.bachelorsDegree')),
    inputRow(3, inputRowHeading(i18n, 'graduationOfStudents.technicianCertificate')),
  ],
  valueSlice: {
    columnStart: 1
  }
})
