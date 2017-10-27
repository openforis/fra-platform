import React from 'react'
import R from 'ramda'
import { subCategoryValidator } from '../traditionalTable/validators'

const inputColumns = R.times(() => ({type: 'decimalInput'}), 9)

export default i18n => ({
  name: 'forestAreaWithinProtectedAreas',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('forestAreaWithinProtectedAreas.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="9">{i18n.t('forestAreaWithinProtectedAreas.areaUnitLabel')}</th>
  </tr>
  <tr>
    <th className="fra-table__header-cell-right">1990</th>
    <th className="fra-table__header-cell-right">2000</th>
    <th className="fra-table__header-cell-right">2010</th>
    <th className="fra-table__header-cell-right">2015</th>
    <th className="fra-table__header-cell-right">2016</th>
    <th className="fra-table__header-cell-right">2017</th>
    <th className="fra-table__header-cell-right">2018</th>
    <th className="fra-table__header-cell-right">2019</th>
    <th className="fra-table__header-cell-right">2020</th>
  </tr>
  </thead>,
  rows: [
    [{
      type: 'readOnly',
      jsx: <th key="expansion" className="fra-table__category-cell">
        {i18n.t('forestAreaWithinProtectedAreas.header')}
      </th>
    },
      ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="" className="fra-table__category-cell">{i18n.t('forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan')}</th>
      },
      ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="" className="fra-table__subcategory-cell">{i18n.t('forestAreaWithinProtectedAreas.ofWhichInProtectedAreas')}</th>
      },
      ...R.times(() => ({type: 'decimalInput', validator: subCategoryValidator(1, [2])}), 9)
    ]
  ],
  valueSlice: {
    columnStart: 1,
  }
})
