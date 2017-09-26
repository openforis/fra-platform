import React from 'react'
import R from 'ramda'

const createPdmoInputRow = (rowHeader) => [
  {type: 'readOnly', jsx: <td key="protection" className="fra-table__header-cell">{rowHeader}</td>},
  ...(R.times(() => ({type: 'decimalInput'}), 5))
]

const totalForestArea = (tableData, columnIdx) =>
  R.reduce((sum, rowIdx) => {
      const value = tableData[rowIdx][columnIdx]
      if (!R.isNil(value))
        return sum + value
      else
        return sum
    },
    0,
    R.range(0, 7)
  )

const totalForestAreaCell = (column) => (props) =>
  <td key="" className="fra-table__aggregate-cell">
    {totalForestArea(props.tableData, column)}
  </td>

export default i18n => ({
  name: 'primaryDesignatedManagementObjective',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('primaryDesignatedManagementObjective.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="5">{i18n.t('primaryDesignatedManagementObjective.areaUnitLabel')}</th>
  </tr>
  <tr>
    <td className="fra-table__header-cell-right">1990</td>
    <td className="fra-table__header-cell-right">2000</td>
    <td className="fra-table__header-cell-right">2010</td>
    <td className="fra-table__header-cell-right">2015</td>
    <td className="fra-table__header-cell-right">2020</td>
  </tr>
  </thead>,
  rows: [
    createPdmoInputRow(i18n.t('primaryDesignatedManagementObjective.production')),
    createPdmoInputRow(i18n.t('primaryDesignatedManagementObjective.soilWaterProtection')),
    createPdmoInputRow(i18n.t('primaryDesignatedManagementObjective.biodiversityConservation')),
    createPdmoInputRow(i18n.t('primaryDesignatedManagementObjective.socialServices')),
    createPdmoInputRow(i18n.t('primaryDesignatedManagementObjective.multipleUse')),
    createPdmoInputRow(i18n.t('primaryDesignatedManagementObjective.other')),
    createPdmoInputRow(i18n.t('primaryDesignatedManagementObjective.unknown')),
    [{type: 'readOnly',
      jsx: <td key=""
               className="fra-table__header-cell">{i18n.t('primaryDesignatedManagementObjective.totalForestArea')}</td>
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
