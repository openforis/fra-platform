import React from 'react'
import R from 'ramda'
import { totalSumFormatted } from '../traditionalTable/aggregate'
import { ofWhichValidator } from '../traditionalTable/validators'

const createInputRow = (rowHeader, cname = 'fra-table__category-cell', validator) => [
  {type: 'readOnly', jsx: <th key="protection" className={`${cname}`}>{rowHeader}</th>},
  ...(R.times(() => ({
    type: 'decimalInput',
    validator: validator
  }), 5))
]

const totalForestAreaCell = (column) => (props) =>
  <td key="" className="fra-table__calculated-cell">
    {totalSumFormatted(props.tableData, column, [0,4,5])}
  </td>

const privateOwnershipValidator = ofWhichValidator(0, R.range(1, 4))

export default i18n => ({
  name: 'forestOwnership',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('forestOwnership.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="5">{i18n.t('forestOwnership.areaUnitLabel')}</th>
  </tr>
  <tr>
    <th className="fra-table__header-cell-right">1990</th>
    <th className="fra-table__header-cell-right">2000</th>
    <th className="fra-table__header-cell-right">2010</th>
    <th className="fra-table__header-cell-right">2015</th>
    <th className="fra-table__header-cell-right">2020</th>
  </tr>
  </thead>,
  rows: [
    createInputRow(i18n.t('forestOwnership.privateOwnership')),
    createInputRow(i18n.t('forestOwnership.ofWhichIndividuals'), 'fra-table__subcategory-cell', privateOwnershipValidator),
    createInputRow(i18n.t('forestOwnership.ofWhichPrivateBusinesses'), 'fra-table__subcategory-cell', privateOwnershipValidator),
    createInputRow(i18n.t('forestOwnership.ofWhichCommunities'), 'fra-table__subcategory-cell', privateOwnershipValidator),
    createInputRow(i18n.t('forestOwnership.publicOwnership')),
    createInputRow(i18n.t('forestOwnership.otherOrUnknown')),
    [{type: 'readOnly',
      jsx: <th key="total_forest_area" className="fra-table__header-cell">{i18n.t('forestOwnership.totalForestArea')}</th>
    },
      {type: 'custom', render: totalForestAreaCell(1)},
      {type: 'custom', render: totalForestAreaCell(2)},
      {type: 'custom', render: totalForestAreaCell(3)},
      {type: 'custom', render: totalForestAreaCell(4)},
      {type: 'custom', render: totalForestAreaCell(5)}]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
})
