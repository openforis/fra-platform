import React from 'react'
import * as R from 'ramda'
import {
  subCategoryValidator,
  forestAreaLessThanOrEqualToExtentOfForestValidator
} from '@webapp/traditionalTable/validators'
import defaultYears from '@server/eof/defaultYears'

const mapIndexed = R.addIndex(R.map)

export default (i18n, extentOfForest) => {
  const inputColumns = R.map(
    year => ({
      type: 'decimalInput',
      validator: forestAreaLessThanOrEqualToExtentOfForestValidator(year, extentOfForest)
    }),
    defaultYears
  )
  return {
    name: 'forestAreaWithinProtectedAreas',
    header: <thead>
    <tr>
      <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('forestAreaWithinProtectedAreas.categoryHeader')}</th>
      <th className="fra-table__header-cell" colSpan={defaultYears.length}>{i18n.t('forestAreaWithinProtectedAreas.areaUnitLabel')}</th>
    </tr>
    <tr>
      {
        R.map(year => <th key={year} className="fra-table__header-cell">{year}</th>, defaultYears)
      }
    </tr>
    </thead>,
    rows: [
      [{
        type: 'readOnly',
        jsx: <th className="fra-table__category-cell">
          {i18n.t('forestAreaWithinProtectedAreas.header')}
        </th>
      },
        ...inputColumns
      ],
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__category-cell">{i18n.t('forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan')}</th>
        },
        ...inputColumns
      ],
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__subcategory-cell">{i18n.t('forestAreaWithinProtectedAreas.ofWhichInProtectedAreas')}</th>
        },
        ...R.times(() => ({type: 'decimalInput', validator: subCategoryValidator(1, [2])}), 9)
      ]
    ],
    valueSlice: {
      columnStart: 1,
    }
  }
}
