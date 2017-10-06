import React from 'react'
import R from 'ramda'
import { ofWhichValidator } from '../traditionalTable/validators'

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
      jsx: <td key="expansion" className="fra-table__header-cell">
        {i18n.t('forestAreaWithinProtectedAreas.forestAreaWithinProtectedAreas')}
      </td>
    },
      ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <td key="" className="fra-table__header-cell">{i18n.t('forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan')}</td>
      },
      ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <td key="" className="fra-table__header-cell-sub">{i18n.t('forestAreaWithinProtectedAreas.ofWhichInProtectedAreas')}</td>
      },
      ...R.times(() => ({type: 'decimalInput', validator: ofWhichValidator(1, [2])}), 9)
    ]
  ],
  valueSlice: {
    columnStart: 1,
  }
})
