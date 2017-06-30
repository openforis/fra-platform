import React from 'react'
import R from 'ramda'

const createPdmoInputRow = (rowHeader) => [
  {type: 'readOnly', jsx: <td key="protection" className="fra-table__header-cell">{rowHeader}</td>},
  ...(R.times(() => ({type: 'integerInput'}), 5))
]

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
    createPdmoInputRow('No/unknown')
  ],
  valueSlice: {
    columnStart: 1
  }
}
