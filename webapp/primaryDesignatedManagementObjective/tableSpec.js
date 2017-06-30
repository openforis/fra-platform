import React from 'react'
import R from 'ramda'

const createPdmoInputRow = (rowHeader) => [
  {type: 'readOnly', jsx: <td key="protection" className="fra-table__header-cell">{rowHeader}</td>},
  ...(R.times(() => ({type: 'integerInput'}), 5))
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
  <td key="" className="fra-table__text-readonly-cell-align-right">
    {totalForestArea(props.tableData, column)}
  </td>

export default {
  name: 'primaryDesignatedManagementObjective',
  header: <thead>
  <tr>
    <td className="fra-table__header-cell"/>
    <td className="fra-table__header-cell-align-right">1990</td>
    <td className="fra-table__header-cell-align-right">2000</td>
    <td className="fra-table__header-cell-align-right">2010</td>
    <td className="fra-table__header-cell-align-right">2015</td>
    <td className="fra-table__header-cell-align-right">2020</td>
  </tr>
  </thead>,
  rows: [
    createPdmoInputRow('Production'),
    createPdmoInputRow('Protection of soil and water'),
    createPdmoInputRow('Conservation of biodiversity'),
    createPdmoInputRow('Social Services'),
    createPdmoInputRow('Multiple use'),
    createPdmoInputRow('Other'),
    createPdmoInputRow('No/unknown'),
    [{type: 'readOnly', jsx: <td key="" className="fra-table__header-cell">Total forest area</td>},
     {type: 'custom', render: totalForestAreaCell(1)},
     {type: 'custom', render: totalForestAreaCell(2)},
     {type: 'custom', render: totalForestAreaCell(3)},
     {type: 'custom', render: totalForestAreaCell(4)},
     {type: 'custom', render: totalForestAreaCell(5)}],

  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
}
