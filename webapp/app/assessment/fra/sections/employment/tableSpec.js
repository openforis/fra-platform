import React from 'react'
import * as R from 'ramda'

import { subCategoryValidator } from '@webapp/app/assessment/components/traditionalTable/validators'

export const tableProps = {
  employment: {
    name: 'employment',
    years: [1990, 2000, 2010, 2015]
  },
  employmentPrint1: {
    name: 'employmentPrint1',
    years: [1990, 2000]
  },
  employmentPrint2: {
    name: 'employmentPrint2',
    years: [2010, 2015]
  }
}

const genderOfWhichValitor = subCategoryValidator(0, R.range(1, 5))

const yearFields = (validator) => () => [
  { type: 'decimalInput', validator: validator },
  { type: 'decimalInput', validator: validator },
  { type: 'decimalInput', validator: validator }
]

const rowHeading = (i18n, localizationKey) =>
  ({ type: 'readOnly', jsx: <th className="fra-table__category-cell">{i18n.t(localizationKey)}</th> })

const rowSubHeading = (i18n, localizationKey) =>
  ({ type: 'readOnly', jsx: <th className="fra-table__subcategory-cell">{i18n.t(localizationKey)}</th> })

export default (i18n, tableProp) => {

  const { name, years } = tableProp

  const inputRow = (rowHeaderCell, validator) => [
    rowHeaderCell,
    ...R.flatten(R.map(yearFields(validator), years))
  ]

  return {
    name,
    header: <thead>
    <tr>
      <th className="fra-table__header-cell-left" rowSpan="3">{i18n.t('employment.categoryHeader')}</th>
      <th className="fra-table__header-cell" colSpan={years.length * 3}>{i18n.t('employment.unitHeader')}</th>
    </tr>
    <tr>
      {
        years.map(year =>
          <th key={year} colSpan="3" className="fra-table__header-cell">{year}</th>
        )
      }
    </tr>
    <tr>
      {
        years.map(() =>
          [
            <th key="total" className="fra-table__header-cell">{i18n.t('employment.total')}</th>,
            <th key="female" className="fra-table__header-cell"
                style={{ fontWeight: 400 }}>{i18n.t('employment.female')}</th>,
            <th key="male" className="fra-table__header-cell"
                style={{ fontWeight: 400 }}>{i18n.t('employment.male')}</th>
          ]
        )
      }
    </tr>
    </thead>,
    rows: [
      inputRow(rowHeading(i18n, 'employment.inForestry')),
      inputRow(rowSubHeading(i18n, 'employment.ofWhichSilviculture'), genderOfWhichValitor),
      inputRow(rowSubHeading(i18n, 'employment.ofWhichLogging'), genderOfWhichValitor),
      inputRow(rowSubHeading(i18n, 'employment.ofWhichGathering'), genderOfWhichValitor),
      inputRow(rowSubHeading(i18n, 'employment.ofWhichSupport'), genderOfWhichValitor)
    ],
    valueSlice: {
      columnStart: 1
    }
  }
}
