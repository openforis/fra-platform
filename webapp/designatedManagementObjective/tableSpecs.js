import React from 'react'
import R from 'ramda'
import { totalSumFormatted } from '../traditionalTable/aggregate'

const createDmoInputRow = (rowHeader) => [
  {type: 'readOnly', jsx: <th key="protection" className="fra-table__category-cell">{rowHeader}</th>},
  ...(R.times(() => ({type: 'decimalInput'}), 5))
]

const totalForestAreaCell = (column) => (props) =>
  <td key="" className="fra-table__calculated-cell">
    {totalSumFormatted(props.tableData, column, R.range(0, 7))}
  </td>

const thead = i18n =>
  <thead>
    <tr>
      <th className="fra-table__header-cell" rowSpan="2">{i18n.t('designatedManagementObjective.categoryHeader')}</th>
      <th className="fra-table__header-cell-middle" colSpan="5">{i18n.t('designatedManagementObjective.areaUnitLabel')}</th>
    </tr>
    <tr>
      <th className="fra-table__header-cell-right">1990</th>
      <th className="fra-table__header-cell-right">2000</th>
      <th className="fra-table__header-cell-right">2010</th>
      <th className="fra-table__header-cell-right">2015</th>
      <th className="fra-table__header-cell-right">2020</th>
    </tr>
  </thead>

export const primaryDesignatedManagementObjectiveTableSpec = i18n => ({
  name: 'primaryDesignatedManagementObjective',
  header: thead(i18n),
  rows: [
    createDmoInputRow(i18n.t('designatedManagementObjective.production')),
    createDmoInputRow(i18n.t('designatedManagementObjective.soilWaterProtection')),
    createDmoInputRow(i18n.t('designatedManagementObjective.biodiversityConservation')),
    createDmoInputRow(i18n.t('designatedManagementObjective.socialServices')),
    createDmoInputRow(i18n.t('designatedManagementObjective.multipleUse')),
    createDmoInputRow(i18n.t('designatedManagementObjective.other')),
    createDmoInputRow(i18n.t('designatedManagementObjective.unknown')),
    [{type: 'readOnly',
      jsx:
        <th key="total_forest_area" className="fra-table__header-cell">
          {i18n.t('designatedManagementObjective.totalForestArea')}
        </th>
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

export const totalAreaWithDesignatedManagementObjectiveTableSpec = i18n => ({
  name: 'totalAreaWithDesignatedManagementObjective',
  header: thead(i18n),
  rows: [
    createDmoInputRow(i18n.t('designatedManagementObjective.production')),
    createDmoInputRow(i18n.t('designatedManagementObjective.soilWaterProtection')),
    createDmoInputRow(i18n.t('designatedManagementObjective.biodiversityConservation')),
    createDmoInputRow(i18n.t('designatedManagementObjective.socialServices')),
    createDmoInputRow(i18n.t('designatedManagementObjective.other'))
  ],
  valueSlice: {columnStart: 1}
})
